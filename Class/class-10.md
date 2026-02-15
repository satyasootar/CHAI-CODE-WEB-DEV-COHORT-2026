# JavaScript Comprehensive Notes – Arrays, Objects, Functions & More

This document consolidates the key concepts taught in the live session, including code examples and explanations. The topics cover arrays, array methods, objects, object methods, functions, higher-order functions, closures, and more.

---

## 1. Arrays

### 1.1 Creating Arrays

Arrays can be created using literal notation, the `Array` constructor, `Array.of`, and `Array.from`.

```javascript
// Array literal
const carriage1 = ["Veer", "Ayush", "Ravi"];

// Array constructor with length – creates sparse array (empty slots)
const threeEmptySeats = Array(3);
console.log(threeEmptySeats.length); // 3
console.log(threeEmptySeats); // [empty × 3]

// Array constructor with elements
const passenger = Array("Veer", "Ayush", "Ravi");

// Array.of – always creates an array with the given elements
const singlePassenger = Array.of(3);
console.log(singlePassenger); // [3]

// Array.from – creates array from an iterable or array-like object
const trainCode = Array.from("DUST");
console.log(trainCode); // ['D', 'U', 'S', 'T']
```

**Important:**  
`Array(3)` creates an array with 3 empty slots (sparse array). These slots are not the same as `undefined`; they are truly empty and behave differently in methods like `map` (which skips empty slots).  
`Array.of(3)` creates an array with one element: `3`.

### 1.2 Array Length and Truncation

The `length` property can be used to truncate or extend an array. Extending creates empty slots.

```javascript
const tempTrain = ["A", "B", "C", "D", "E"];
tempTrain.length = 3;
console.log(tempTrain); // ['A', 'B', 'C']

tempTrain.length = 5;
console.log(tempTrain); // ['A', 'B', 'C', empty × 2]
```

### 1.3 Mutating vs Non‑Mutating Methods

- **Mutating methods** change the original array.
  - `push`, `pop`, `shift`, `unshift`, `splice`
- **Non‑mutating methods** return a new array without modifying the original.
  - `concat`, `slice`, `flat`, `flatMap`, `toSorted` (newer)

#### Example: Mutating methods

```javascript
let arr = [1, 2, 3];
arr.push(4);        // [1,2,3,4]
arr.pop();          // [1,2,3]
arr.shift();        // [2,3]   (removes first)
arr.unshift(1);     // [1,2,3] (adds to beginning)
arr.splice(1, 1, 99); // [1,99,3] (replaces)
```

#### Example: Non‑mutating methods

```javascript
const a = [1, 2];
const b = [3, 4];
const combined = a.concat(b); // [1,2,3,4] (a unchanged)

const sliced = combined.slice(1, 3); // [2,3] (combined unchanged)

const nested = [1, [2, 3], [4, [5]]];
const flatOnce = nested.flat();        // [1,2,3,4,[5]]
const flatFully = nested.flat(2);      // [1,2,3,4,5]
```

### 1.4 Searching in Arrays

Common methods: `indexOf`, `includes`, `find`, `findIndex`.

```javascript
const items = ["apple", "banana", "mango"];
console.log(items.indexOf("banana"));   // 1
console.log(items.includes("grape"));   // false

// find returns the first element satisfying condition
const found = items.find(item => item.startsWith("b")); // "banana"

// findIndex returns the index
const idx = items.findIndex(item => item === "mango"); // 2
```

### 1.5 Checking if a Variable is an Array

```javascript
console.log(typeof []); // "object" – not helpful
console.log(Array.isArray([]));        // true
console.log(Array.isArray("Ravi"));    // false
```

### 1.6 Key Points to Remember

1. **Empty slots** (sparse arrays) can cause unexpected behaviour – avoid them.
2. Arrays are **zero‑based**.
3. Know which methods **mutate** the original array and which do not.
4. Use `Array.isArray()` to reliably check for arrays.
5. `includes` is great for simple existence checks.

---

## 2. Array Methods in Action (with the `orders` array)

We'll use the following dataset throughout:

```javascript
const orders = [
  { dish: "Pasta Carbonara", price: 14, spicy: false, qty: 2 },
  { dish: "Dragon Ramen", price: 12, spicy: true, qty: 1 },
  { dish: "Caesar Salad", price: 9, spicy: false, qty: 3 },
  { dish: "Inferno Wings", price: 11, spicy: true, qty: 2 },
  { dish: "Truffle Risotto", price: 18, spicy: false, qty: 1 },
];
```

### 2.1 `forEach`

Iterates over each element, executes a callback. It returns `undefined`.

```javascript
orders.forEach((order, index) => {
  console.log(`  #${index + 1} : ${order.qty}x ${order.dish}`);
});
// Output:
// #1 : 2x Pasta Carbonara
// #2 : 1x Dragon Ramen
// ...
```

**Important characteristics of `forEach`:**
- It does **not** wait for promises (asynchronous callbacks will run after loop finishes).
- It **cannot be broken** – no `break` or `continue`. Use a standard `for` loop if you need to stop early.
- It always returns `undefined`.

### 2.2 `map`

Creates a new array by applying a transformation to each element.

```javascript
const receiptLines = orders.map(o => `${o.dish}: $${o.price * o.qty}`);
console.log(receiptLines);
// ["Pasta Carbonara: $28", "Dragon Ramen: $12", ...]
```

### 2.3 `filter`

Returns a new array containing only the elements that satisfy the condition.

```javascript
const spicyOrders = orders.filter(o => o.spicy);
console.log(spicyOrders);
// [ { dish: "Dragon Ramen", ... }, { dish: "Inferno Wings", ... } ]
```

### 2.4 `reduce` – The Powerful One

`reduce` iterates and accumulates a single result. It takes a callback and an initial value.

#### Example 1: Total revenue

```javascript
const totalRevenue = orders.reduce((sum, order) => {
  return sum + order.qty * order.price;
}, 0);
console.log(totalRevenue); // 14*2 + 12*1 + 9*3 + 11*2 + 18*1 = 28+12+27+22+18 = 107
```

- `sum` is the accumulator, starting at `0`.
- After each iteration, the returned value becomes the new accumulator.

#### Example 2: Grouping dishes by spiciness

```javascript
const grouped = orders.reduce(
  (acc, order) => {
    const category = order.spicy ? "spicy" : "mild";
    acc[category].push(order.dish);
    return acc;
  },
  { spicy: [], mild: [] }
);
console.log(grouped);
// { spicy: ["Dragon Ramen", "Inferno Wings"], mild: ["Pasta Carbonara", "Caesar Salad", "Truffle Risotto"] }
```

**Key takeaway:** The accumulator can be any data type – number, array, object – depending on your use case.

### 2.5 Sorting

By default, `sort()` converts elements to strings and sorts lexicographically. This often leads to unexpected results with numbers.

```javascript
const ticketNumbers = [100, 25, 3, 42, 8];
const sortedWrong = ticketNumbers.sort();
console.log(sortedWrong); // [100, 25, 3, 42, 8] – because "100" < "25" as strings
```

To sort numerically, provide a compare function:

```javascript
const sortedCorrect = [...ticketNumbers].sort((a, b) => a - b);
console.log(sortedCorrect); // [3, 8, 25, 42, 100]
```

- `a - b` gives ascending order; `b - a` gives descending.
- Using the spread `[...ticketNumbers]` creates a copy, so the original array is not mutated (non‑mutating pattern).

**Newer method:** `toSorted()` (ES2023) returns a sorted copy without mutating.

```javascript
const sorted = ticketNumbers.toSorted((a, b) => a - b);
```

### 2.6 Chaining Methods

Methods like `filter`, `map`, `reduce`, `sort` can be chained to build data processing pipelines.

```javascript
const mildReport = kitchenOrders
  .filter(order => !order.spicy)           // keep only non‑spicy
  .map(order => ({                         // transform to new shape
    dish: order.dish,
    total: order.price * order.qty
  }))
  .toSorted((a, b) => a.total - b.total);  // sort by total

console.log(mildReport);
// [
//   { dish: "Caesar Salad", total: 27 },
//   { dish: "Pasta Carbonara", total: 28 },
//   { dish: "Truffle Risotto", total: 18 }
// ]
```

**Note:** `toSorted()` is used here to avoid mutating the intermediate array.

---

## 3. Objects

### 3.1 Object Basics

Objects store key‑value pairs. Properties can be added or deleted dynamically.

```javascript
const hero = {
  name: "Luna the Brave",
  class: "Mage",
  level: 12,
  health: 85,
  mana: 120,
  isAlive: true,
};

// Add a property
hero.weapon = "Fire";

// Delete a property
delete hero.level;
```

### 3.2 Accessing Properties: Dot vs Bracket

- **Dot notation** is cleaner but limited to valid identifier names.
- **Bracket notation** allows dynamic keys and keys with special characters.

```javascript
console.log(hero.name);    // dot
console.log(hero["class"]); // bracket

const key = "health";
console.log(hero[key]);     // dynamic – bracket needed
```

### 3.3 Checking for Properties

- `in` operator checks own **and inherited** properties.
- `hasOwnProperty` checks only the object's own properties.

```javascript
const ranger = {
  name: "Lakshya the swift",
  agility: 80,
  stealth: undefined,
};

console.log("name" in ranger);        // true
console.log("stealth" in ranger);      // true (property exists, value undefined)
console.log("toString" in ranger);     // true (inherited from Object)
console.log(ranger.hasOwnProperty("toString")); // false
```

### 3.4 Object Methods: `keys`, `values`, `entries`

These methods return arrays of an object's own enumerable properties.

```javascript
const artifact = {
  name: "Obsidian Crown",
  era: "Ancient",
  value: 50000,
  material: "volcanic glass",
};

const keys = Object.keys(artifact);
const values = Object.values(artifact);
const entries = Object.entries(artifact);

console.log(keys);   // ["name", "era", "value", "material"]
console.log(values); // ["Obsidian Crown", "Ancient", 50000, "volcanic glass"]
console.log(entries);
// [ ["name","Obsidian Crown"], ["era","Ancient"], ... ]
```

You can loop over entries:

```javascript
for (const [key, value] of Object.entries(artifact)) {
  console.log(`${key}: ${value}`);
}
```

### 3.5 `Object.fromEntries` – Reverse of `entries`

Converts an array of key‑value pairs into an object.

```javascript
const priceList = [
  ["Obsidian Crown", 50000],
  ["Ruby Pendant", 30000],
  ["Iron Shield", 5000],
];

const priceObject = Object.fromEntries(priceList);
console.log(priceObject);
// { "Obsidian Crown": 50000, "Ruby Pendant": 30000, "Iron Shield": 5000 }
```

### 3.6 Controlling Object Mutability

#### `Object.freeze`

Makes an object **immutable**: cannot add, delete, or change existing properties.

```javascript
const displayCase = {
  artifact: "Obsidian",
  location: "Hall A, Case 3",
  locked: true,
};

Object.freeze(displayCase);
delete displayCase.locked;      // fails silently (or throws in strict mode)
displayCase.newProp = "test";   // fails
displayCase.location = "new";   // fails
console.log(displayCase);       // unchanged
```

#### `Object.seal`

Prevents adding or deleting properties, but **allows modification** of existing ones.

```javascript
const catalogEntry = {
  id: "ART-001",
  description: "Ancient Crows",
  verified: true,
};

Object.seal(catalogEntry);
delete catalogEntry.id;         // fails
catalogEntry.newProp = "test";  // fails
catalogEntry.description = "Changed"; // works
```

### 3.7 Fine‑Grained Control with `Object.defineProperty`

You can define properties with specific **descriptors**: `writable`, `enumerable`, `configurable`.

```javascript
const secureArtifacts = { name: "Ruby Pendant" };

Object.defineProperty(secureArtifacts, "catalogId", {
  value: "SEC-999",
  writable: false,      // cannot change value
  enumerable: false,    // will not appear in loops or Object.keys
  configurable: false,  // cannot delete or redefine
});

console.log(secureArtifacts.catalogId); // "SEC-999"
secureArtifacts.catalogId = "HACKED";   // fails silently
console.log(secureArtifacts.catalogId); // still "SEC-999"
```

Because `enumerable: false`, the property does **not** show up in `Object.entries` or `for...in` loops.

```javascript
for (const [key, value] of Object.entries(secureArtifacts)) {
  console.log(`${key}: ${value}`);
}
// only "name: Ruby Pendant" appears – catalogId is hidden
```

To inspect property descriptors:

```javascript
const desc = Object.getOwnPropertyDescriptor(secureArtifacts, "name");
console.log(desc);
// { value: "Ruby Pendant", writable: true, enumerable: true, configurable: true }
```

---

## 4. Functions

### 4.1 Function Declaration vs Expression vs Arrow

```javascript
// Declaration – hoisted
console.log(brewPotion("Healing Herbs", 3)); // works
function brewPotion(ingredient, dose) {
  return `Brewing potion with ${ingredient} (x${dose})... Potion ready`;
}

// Expression – not hoisted
const mixElixir = function(ingredient) {
  return `Mixing elixir with ${ingredient}`;
};

// Arrow function – concise, no own `this`, no `arguments`
const distilEssence = (ingredient) => {
  return `Distilling essence with ${ingredient}`;
};

// Single parameter, single expression can be even shorter:
const double = x => x * 2;
```

### 4.2 The `arguments` Object

Inside a **regular** function, `arguments` is an array‑like object containing all passed arguments. It is **not** available in arrow functions.

```javascript
function oldBrewingLogs() {
  console.log("Type: ", typeof arguments);        // "object"
  console.log("Is Array: ", Array.isArray(arguments)); // false
  const argsArray = Array.from(arguments);        // convert to real array
  console.log(argsArray);
}

oldBrewingLogs("Sage", "Rosemary");
// Type: object
// Is Array: false
// ["Sage", "Rosemary"]
```

Arrow functions do not have their own `arguments`. If you try to use it, you'll get a ReferenceError (unless there's an `arguments` variable in an outer scope). Always use rest parameters (`...args`) in modern code.

```javascript
const arrowBrew = () => {
  console.log(arguments); // ReferenceError: arguments is not defined
};
```

### 4.3 Error Handling with `try...catch`

When code might throw an error (like accessing an undefined variable), wrap it in `try...catch` to prevent the program from crashing.

```javascript
try {
  console.log(arguments);
} catch (e) {
  console.log(e.message); // "arguments is not defined"
}
console.log("Program continues...");
```

### 4.4 Pure vs Impure Functions (Side Effects)

- **Pure function**: Same input always gives same output; no side effects (does not modify external state).
- **Impure function**: Relies on or modifies external state.

```javascript
let globalCount = 0;

function brewAndCount(name) {
  globalCount++;   // side effect – modifies global variable
  return `Brewing for ${name}`;
}
```

Side effects are sometimes necessary (e.g., updating a database), but they make code harder to reason about.

### 4.5 Higher‑Order Functions (HOF)

A function that either **takes a function as an argument** or **returns a function** (or both).

Examples you've already seen: `forEach`, `map`, `filter`, `reduce` are all higher‑order functions because they accept a callback.

You can also create your own:

```javascript
function createMultiplier(multiplier) {
  return function(value) {
    return value * multiplier;
  };
}

const double = createMultiplier(2);
console.log(double(5)); // 10
```

### 4.6 Immediately Invoked Function Expression (IIFE)

An IIFE is a function that runs as soon as it is defined. It creates a new scope, useful for encapsulation.

```javascript
const potionShop = (function() {
  let inventory = 0; // private variable

  return {
    brew() {
      inventory++;
      return `Brewed potion #${inventory}`;
    },
    getStock() {
      return inventory;
    }
  };
})();

console.log(potionShop.brew()); // "Brewed potion #1"
console.log(potionShop.inventory); // undefined – cannot access private variable
console.log(potionShop.getStock()); // 1
```

Here, `inventory` is **closed over** by the returned methods – this is a closure.

### 4.7 Closures

A closure is the combination of a function and the lexical environment within which that function was declared. In other words, an inner function retains access to variables of its outer function even after the outer function has returned.

```javascript
function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name); // still remembers name
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc(); // "Mozilla"
```

**Why is this useful?**  
Closures enable data privacy (like the `inventory` in the IIFE example) and are the foundation of many functional programming patterns.

---

## 5. Conditionals (Brief)

### 5.1 `if...else`

```javascript
const playerHealth = 75;
const hasShield = true;

if (playerHealth <= 30 && hasShield) {
  console.log("You can survive another hit!");
} else {
  console.log("Take cover!");
}
```

### 5.2 Logical Operators

- `&&` – both conditions true
- `||` – at least one condition true

```javascript
const isLoggedIn = true;
const hasCourseAccess = false;

if (isLoggedIn || hasCourseAccess) {
  // allow to watch videos
}
```

### 5.3 `switch` Statement

```javascript
const chosenPath = "left";

switch (chosenPath) {
  case "right":
    console.log("User selected right");
    break;
  case "top":
    console.log("User selected top");
    break;
  case "left":
    console.log("User selected left");
    break;
  default:
    console.log("Jiska koi nhi hota, uska default hota h");
}
```

---

## 6. Important Gotchas & Interview Tips

### 6.1 `forEach` – No Break, No Await

- You cannot use `break` or `continue` inside a `forEach`. Use a `for...of` loop if you need to stop early.
- `forEach` does **not** wait for promises – it schedules them and continues. Use `for...of` with `await` for sequential async operations.

### 6.2 `sort()` Converts to Strings

Always provide a compare function when sorting numbers.

### 6.3 Empty Slots and Array Methods

Methods like `map`, `filter`, `forEach` skip empty slots. `join` treats them as empty strings. `sort` preserves them. Best practice: avoid creating sparse arrays.

### 6.4 `Object.freeze` vs `Object.seal`

| Method     | Add props | Delete props | Change existing |
|------------|-----------|--------------|-----------------|
| `freeze`   | ❌        | ❌           | ❌              |
| `seal`     | ❌        | ❌           | ✅              |

Both are shallow – they only affect the top level. Nested objects can still be mutated unless frozen recursively.

### 6.5 Property Descriptors

- `writable` – can the value be changed?
- `enumerable` – does it appear in `for...in` and `Object.keys`?
- `configurable` – can the property be deleted or its descriptor changed?

### 6.6 `hasOwnProperty` vs `in`

- `in` checks prototype chain.
- `hasOwnProperty` checks only the object itself.

### 6.7 Closures in Interviews

Common question: *What is a closure?*  
Answer: A closure is a function that retains access to its outer (enclosing) function’s variables even after the outer function has finished executing.

Example:

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

---

## Conclusion

This session covered the core building blocks of JavaScript: arrays, objects, and functions. Mastering these topics, especially array methods (`map`, `filter`, `reduce`) and object manipulation, is essential for effective JavaScript development. The additional concepts of higher‑order functions, closures, and immutability control (`freeze`, `seal`, property descriptors) prepare you for more advanced patterns and frameworks like React.

Keep practicing with the provided code files and try to modify them to solidify your understanding.