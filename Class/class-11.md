## 1. The Mysterious `this` Keyword

`this` is a special keyword in JavaScript that refers to the **context** in which a function is executed. Its value is determined by **how** the function is called, not where it is defined (with one exception: arrow functions). Let's break it down with examples from the code.

### 1.1 Global Context

```javascript
console.log(this); // In a browser: window object; in Node.js: global object
```

In the global scope (outside any function), `this` refers to the global object. In browsers, that's `window`; in Node.js, it's `global`.

### 1.2 Regular Function Calls

```javascript
function ranveerOnGlobalStage() {
  return typeof this; // Returns "object" (in non-strict mode)
}
console.log(ranveerOnGlobalStage()); // "object"
```

When a regular function is called without any explicit context, `this` inside it refers to the global object (in non‑strict mode). That's why `typeof this` is `"object"`.

But things change in **strict mode**:

```javascript
function ranveerWithNoScript() {
  "use strict";
  return this; // Returns undefined
}
console.log(ranveerWithNoScript()); // undefined
```

In strict mode, `this` inside a function that is called without a context remains `undefined`. This is a common interview question—remember it!

```javascript
function ranveerWithScript() {
  return this; // Returns global object (non-strict mode)
}
console.log(ranveerWithScript()); // global object
```

### 1.3 Method Calls (Object Context)

When a function is called as a method of an object, `this` refers to the object that owns the method.

```javascript
const bollywoodFilm = {
  name: "Bajirao Mastani",
  lead: "Ranveer",
  introduce() {
    return `${this.lead} performs in ${this.name}`;
  },
};

console.log(bollywoodFilm.introduce()); // "Ranveer performs in Bajirao Mastani"
```

Here `this` inside `introduce()` is the `bollywoodFilm` object. If we create another object with the same structure, `this` will refer to that object:

```javascript
const bollywoodFilm2 = {
  name: "Dhurandhar",
  lead: "Ranveer",
  introduce() {
    return `${this.lead} performs in ${this.name}`;
  },
};
console.log(bollywoodFilm2.introduce()); // "Ranveer performs in Dhurandhar"
```

### 1.4 Nested Functions: The Pitfall

One of the trickiest situations is when you have a function inside another function. The inner function **does not inherit** the outer function’s `this`. It gets its own `this` bound to the global object (or `undefined` in strict mode).

Look at this example:

```javascript
const filmSet = {
  crew: "Spot boys",
  prepareProps() {
    console.log(`Outer this.crew: ${this.crew}`); // Works: "Spot boys"

    function arrangeChairs() {
      console.log(`Inner this.crew: ${this.crew}`); // undefined (or error)
    }
    arrangeChairs();

    const arrangeLights = () => {
      console.log(`Arrow this.crew: ${this.crew}`); // "Spot boys" (arrow function saves the day!)
    };
    arrangeLights();
  },
};

filmSet.prepareProps();
```

**Why does `arrangeChairs` lose `this.crew`?**  
Because `arrangeChairs` is a regular function called without any context, so its `this` defaults to the global object. Since `global.crew` doesn't exist, we get `undefined`.

**How do we fix it?**  
- **Arrow functions**: They don't have their own `this`; they inherit `this` from the surrounding (lexical) scope. So `arrangeLights` correctly uses the `filmSet`'s `this`.
- Another common trick: `const that = this;` and use `that` inside the inner function.
- Or use `.bind(this)` on the inner function.

### 1.5 Detached Methods

When you take a method out of its object and call it as a standalone function, `this` becomes the global object (or `undefined` in strict mode).

```javascript
const actor = {
  name: "Ranveer",
  bow() {
    return `${this.name} takes a bow`;
  },
};

console.log(actor.bow()); // "Ranveer takes a bow"

const detachedBow = actor.bow;
console.log(detachedBow()); // "undefined takes a bow" (or error in strict mode)
```

`detachedBow` is just a reference to the function; when called, it has no connection to the original `actor` object.

### 1.6 Arrow Functions vs Regular Functions

Arrow functions are special: they do not have their own `this`. Instead, they capture the `this` value from the enclosing context at the time they are defined.

```javascript
const myfunctionOne = function () {
  console.log(this);
};

const myfunctionTwo = () => {
  console.log(this);
};

myfunctionOne(); // logs global object (or undefined in strict)
myfunctionTwo(); // logs the same `this` as the outer scope (e.g., global if defined globally)
```

In the code, `myfunctionTwo` is defined in the global scope, so its `this` is the global object. If defined inside an object method, it would inherit that method’s `this`.

---

## 2. Taking Control: `call`, `apply`, and `bind`

These three methods allow you to explicitly set the value of `this` for a function. They are lifesavers when you need to borrow methods or ensure the correct context.

### 2.1 `call` and `apply` – Immediate Invocation

Both `call` and `apply` **invoke the function immediately** with a specified `this` value. The only difference is how you pass arguments:

- `call(thisArg, arg1, arg2, ...)` – arguments are listed individually.
- `apply(thisArg, [argsArray])` – arguments are passed as an array.

```javascript
function cookDish(ingredient, style) {
  return `${this.name} prepares ${ingredient} in ${style} style!`;
}

const sharmaKitchen = { name: "Sharma jis Kitchen" };
const guptaKitchen = { name: "Gupta jis Kitchen" };

// Using call
console.log(cookDish.call(sharmaKitchen, "Paneer and spices", "Muglai"));

// Using apply
const guptaOrder = ["Chole kulche", "Punjabi Dhaba"];
console.log(cookDish.apply(guptaKitchen, guptaOrder));
```

**Important:** If the function doesn't use `this`, you can pass `null` as the first argument. For example:

```javascript
Math.max.apply(null, [100, 30, 45, 50]); // 100
// Same as:
Math.max(...[100, 30, 45, 50]);
```

Here `Math.max` doesn't care about `this`, so `null` is fine. The spread operator (`...`) does the same job more elegantly.

### 2.2 `bind` – Creating a Bound Function

`bind` does **not** invoke the function immediately. Instead, it returns a **new function** with a permanently bound `this` value. You can also pre‑set some arguments (partial application).

```javascript
function reportDelivery(location, status) {
  return `${this.name} at ${location}: ${status}`;
}

const deliveryBoy = { name: "Ranveer" };

const bindReport = reportDelivery.bind(deliveryBoy);
console.log(bindReport("Haridwar", "WHAT")); // "Ranveer at Haridwar: WHAT"
```

You can also pre‑fill arguments:

```javascript
const reportFromHaridwar = reportDelivery.bind(deliveryBoy, "Haridwar");
console.log(reportFromHaridwar("Delivered")); // "Ranveer at Haridwar: Delivered"
```

### 2.3 Differences at a Glance

| Method  | Invokes immediately? | Arguments format                | Returns      |
|---------|----------------------|----------------------------------|--------------|
| `call`  | Yes                  | Comma-separated list             | Result of function |
| `apply` | Yes                  | Array of arguments               | Result of function |
| `bind`  | No                   | Comma-separated list (optional)  | New function with bound `this` |

**Use cases:**
- Borrowing methods from other objects.
- Setting `this` in event handlers or callbacks.
- Partial application (fixing some arguments).

---

## 3. The `new` Keyword: Building Objects

When you see `new` before a function call, JavaScript performs a series of steps to create a new object. This is how constructor functions work.

### 3.1 What `new` Does

1. Creates a brand new empty object.
2. Links that object to the function's prototype (so the object can access methods on the prototype).
3. Binds `this` inside the constructor function to the new object.
4. Returns the new object (unless the constructor explicitly returns a different object).

```javascript
function TataCar(chassisNumber, modelName) {
  // Step 3: `this` is the new object
  this.chassisNumber = chassisNumber;
  this.modelName = modelName;
  this.fuelLevel = 100;
  // Step 4: returns `this` implicitly
}

TataCar.prototype.status = function () {
  return `Tata ${this.modelName} #${this.chassisNumber} | Fuel: ${this.fuelLevel}`;
};

const car1 = new TataCar("MH-101", "Nexon");
const car2 = new TataCar("DL-202", "Harrier");

console.log(car1.status()); // "Tata Nexon #MH-101 | Fuel: 100"
console.log(car2.status()); // "Tata Harrier #DL-202 | Fuel: 100"
```

Notice that `status` is defined on `TataCar.prototype`, not on each instance. That means **all instances share the same function**, saving memory. The `new` keyword links each instance to that prototype.

### 3.2 Factory Function Alternative

You can also create objects without `new`, using a factory function:

```javascript
function createAutoRickshaw(id, route) {
  return {
    id,
    route,
    run() {
      return `Auto ${this.id} running on ${this.route}`;
    },
  };
}

const auto1 = createAutoRickshaw("UP-1", "Lucknow-kanpur");
const auto2 = createAutoRickshaw("UP-2", "Agra-Mathura");
```

But here, each `auto` gets its own copy of the `run` method. If you create thousands of autos, that's a lot of duplicated functions. With constructors and prototypes, the method is shared.

---

## 4. Prototypes and Inheritance

Prototypes are JavaScript's way of sharing behavior between objects. Every object has an internal link to another object called its **prototype**. When you access a property that doesn't exist on the object itself, JavaScript looks up the prototype chain.

### 4.1 `Object.create()` – Explicit Prototypal Inheritance

`Object.create(proto)` creates a new object whose prototype is `proto`. This is a clean way to set up inheritance.

```javascript
const prithviraj = {
  name: "Prithviraj",
  generation: "grandfather",
  cookTraditionalDish() {
    return `${this.name} cooks an ancient family recipe`;
  },
};

const raj = Object.create(prithviraj);
raj.name = "raj";
raj.generation = "father";
raj.runBusiness = function () {
  return `${this.name} runs the family business`;
};

const ranbir = Object.create(raj);
ranbir.name = "ranbir";
ranbir.generation = "son";
ranbir.makeFilm = function () {
  return `${this.name} directs blockbuster movies`;
};

console.log(ranbir.makeFilm());       // own method
console.log(ranbir.runBusiness());    // inherited from raj
console.log(ranbir.cookTraditionalDish()); // inherited from prithviraj
```

The prototype chain: `ranbir` → `raj` → `prithviraj` → `Object.prototype` → `null`.

### 4.2 Modifying Built‑in Prototypes (Polyfills)

You can add methods to built‑in prototypes like `Array.prototype` or `String.prototype`. This is exactly what **polyfills** do: they add modern methods to older environments that don't have them.

```javascript
Array.prototype.last = function () {
  return this[this.length - 1];
};

console.log([1, 2, 3].last()); // 3
console.log(["Ani", "hitesh", "Akash"].last()); // "Akash"
```

Now every array has a `last()` method! But be cautious: modifying built‑in prototypes can lead to naming conflicts if you're not careful.

#### Example: Adding a property (not a function)

```javascript
Array.prototype.hitesh = "hitesh";
console.log([1, 2, 3].hitesh); // "hitesh"
```

This adds a string property to every array—probably not useful, but it shows that you can add anything.

#### String Polyfill Idea

```javascript
String.prototype.upperCase = function () {
  return this.toUpperCase(); // but we could write our own implementation
};
```

But why reinvent the wheel? A better exercise is to create something that doesn't exist, like a `capitalize` method:

```javascript
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

console.log("hello world".capitalize()); // "Hello world"
```

---

## 5. Exercise: Build Your Own Polyfills

Now it's your turn! Practice by implementing your own versions of common array and string methods. This will deepen your understanding of prototypes and `this`.

### 5.1 Array Polyfills

**Task 1:** Implement `myMap` – a custom version of `Array.prototype.map`.

```javascript
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// Test
const numbers = [1, 2, 3];
const doubled = numbers.myMap(num => num * 2);
console.log(doubled); // [2, 4, 6]
```

**Task 2:** Implement `myFilter`.

```javascript
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

**Task 3:** Implement `myReduce`.

```javascript
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};
```

**Task 4:** Create a new method `myChunk(size)` that splits an array into groups of length `size`.

```javascript
Array.prototype.myChunk = function (size) {
  const chunks = [];
  for (let i = 0; i < this.length; i += size) {
    chunks.push(this.slice(i, i + size));
  }
  return chunks;
};

console.log([1, 2, 3, 4, 5].myChunk(2)); // [[1,2], [3,4], [5]]
```

### 5.2 String Polyfills

**Task 1:** Implement `myCapitalize` as shown above.

**Task 2:** Implement `myReverse` – reverse a string.

```javascript
String.prototype.myReverse = function () {
  let reversed = "";
  for (let i = this.length - 1; i >= 0; i--) {
    reversed += this[i];
  }
  return reversed;
};

console.log("hello".myReverse()); // "olleh"
```

**Task 3:** Implement `myIsPalindrome` – check if a string reads the same forwards and backwards.

```javascript
String.prototype.myIsPalindrome = function () {
  const cleaned = this.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
};

console.log("racecar".myIsPalindrome()); // true
console.log("hello".myIsPalindrome());   // false
```

**Task 4:** Implement `myVowelCount`.

```javascript
String.prototype.myVowelCount = function () {
  const matches = this.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
};

console.log("hello world".myVowelCount()); // 3
```

