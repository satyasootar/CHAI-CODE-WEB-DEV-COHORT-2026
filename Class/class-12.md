# JavaScript Deep Dive: Classes, Symbols, Error Handling, and Promises

Welcome to the next part of our JavaScript journey! In this guide, we'll explore four essential modern JavaScript features: **Classes**, **Symbols**, **Error Handling**, and **Promises**. These concepts will help you write cleaner, more robust, and asynchronous code. We'll use the code examples you've provided and expand them with detailed explanations.

---

## 1. Classes in JavaScript (ES6)

### What are Classes?

Classes are **syntactic sugar** over JavaScript's existing prototype-based inheritance. They provide a cleaner, more intuitive way to create objects and handle inheritance.

```javascript
class Cricketer {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.matchesPlayed = 0;
    this.stamina = 100;
  }

  introduce() {
    return `${this.name} the ${this.role} | matchesPlayed: ${this.matchesPlayed} | stamina: ${this.stamina}`;
  }
}
```

- The `constructor` method is a special method for creating and initializing objects. It runs automatically when you use `new`.
- Properties like `name`, `role`, `matchesPlayed`, and `stamina` are assigned to the new instance (`this`).
- Methods like `introduce()` are defined on the class prototype, so all instances share the same method (saving memory).

### Creating Instances

```javascript
const player1 = new Cricketer("Virat", "Batsman");
const player2 = new Cricketer("Bumrah", "Bowler");

console.log(player1.introduce()); // "Virat the Batsman | matchesPlayed: 0 | stamina: 100"
console.log(player2.introduce()); // "Bumrah the Bowler | matchesPlayed: 0 | stamina: 100"
```

### Checking Own Properties

```javascript
console.log(player1.hasOwnProperty("name")); // true
console.log(player1.hasOwnProperty("introduce")); // false (it's on the prototype)
```

### typeof a Class

```javascript
console.log(typeof Cricketer); // "function"
```

Classes are just functions under the hood. The `class` syntax creates a function named `Cricketer` with the constructor body.

### Methods Inside Constructor vs Prototype

```javascript
class Debutant {
  constructor(name) {
    this.name = name;
    this.walkOut = () => `${this.name} walks out to bat for the first time`;
  }
}

const debutant1 = new Debutant("Shubman");
const debutant2 = new Debutant("Yashasvi");

console.log(debutant1.walkOut === debutant2.walkOut); // false
```

Here, `walkOut` is defined inside the constructor, so **each instance gets its own copy of the function**. This can be useful if you need closures, but it consumes more memory. For shared behavior, define methods outside the constructor (on the prototype).

---

## 2. Symbol – The Unique Identifier

`Symbol` is a primitive data type introduced in ES6. Every symbol value is **unique** and can be used as a property key without risk of name collisions.

### Creating Symbols

```javascript
const aadhaar_of_mayur = Symbol("aadhaar");
const aadhaar_of_piyush = Symbol("aadhaar");

console.log(typeof aadhaar_of_mayur); // "symbol"
console.log(aadhaar_of_mayur === aadhaar_of_piyush); // false
```

Even though both symbols have the same description (`"aadhaar"`), they are different values. The description is just for debugging; it doesn't affect uniqueness.

```javascript
console.log(aadhaar_of_mayur.toString()); // "Symbol(aadhaar)"
console.log(aadhaar_of_mayur.description); // "aadhaar"
```

### Symbols as Object Keys

Symbols make excellent keys for "hidden" properties that won't appear in normal enumeration.

```javascript
const biometricHash = Symbol("biometricHash");
const bloodGroup = Symbol("bloodGroup");

const citizenRecord = {
  name: "Ved Pandey",
  age: 21,
  [biometricHash]: "a7yknfky788dn",
  [bloodGroup]: "O+",
};

console.log(Object.keys(citizenRecord)); // ["name", "age"]
console.log(Object.getOwnPropertySymbols(citizenRecord)); // [Symbol(biometricHash), Symbol(bloodGroup)]
```

`Object.keys` ignores symbol keys. To get them, use `Object.getOwnPropertySymbols`.

### Well-Known Symbols

JavaScript has built-in symbols that let you customize object behavior. Two common ones are `Symbol.iterator` and `Symbol.toPrimitive`.

#### Symbol.iterator – Making Objects Iterable

```javascript
const rtiQueryBook = {
  queries: ["Infra budget", "Ration Card", "Education budget", "Startup laws"],
  [Symbol.iterator]() {
    let index = 0;
    const queries = this.queries;
    return {
      next() {
        if (index < queries.length) {
          return { value: queries[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (const query of rtiQueryBook) {
  console.log(`Filing RTI: ${query}`);
}
```

By defining `[Symbol.iterator]`, we make `rtiQueryBook` iterable, so it can be used in `for...of` loops. The iterator object must have a `next()` method that returns `{ value, done }`.

#### Symbol.toPrimitive – Controlling Type Conversion

```javascript
const governmentScheme = {
  name: "PM Kisan Yojna",
  people: 54,
  [Symbol.toPrimitive](hint) {
    if (hint === "string") return this.name;
    if (hint === "number") return 88;
    // default: return something else
  },
};

console.log(+governmentScheme); // 88 (hint is "number")
console.log(`${governmentScheme}`); // "PM Kisan Yojna" (hint is "string")
```

When JavaScript needs to convert an object to a primitive, it calls the `[Symbol.toPrimitive]` method with a hint: `"string"`, `"number"`, or `"default"`.

---

## 3. Error Handling with try…catch…finally

Errors happen. Instead of letting your program crash, you can **handle them gracefully** using `try...catch...finally`.

### Basic Syntax

```javascript
function bootNavigation(mapLoaded) {
  try {
    console.log(`Is Navigation loaded: ${mapLoaded}`);
    if (!mapLoaded) {
      throw new Error("Map was not passed in this function");
    }
    return "NAV_OK";
  } catch (error) {
    console.log(error);
    console.log(`Navigation Failed: ${error.message}`);
  } finally {
    console.log("Navigation sequence completed");
  }
}

const status1 = bootNavigation(false);
console.log(`Result: ${status1}`);
```

**Output:**
```
Is Navigation loaded: false
Error: Map was not passed in this function
Navigation Failed: Map was not passed in this function
Navigation sequence completed
Result: undefined
```

- **`try` block**: Contains code that might throw an error.
- **`throw`**: Manually throws an error object (you can throw anything, but throwing an `Error` object gives you a stack trace).
- **`catch` block**: Executes if an error is thrown. The error object is available as a parameter.
- **`finally` block**: Always executes, whether there was an error or not. Useful for cleanup (closing files, clearing timeouts, etc.).

Notice that after the error, the function returns `undefined` because the `return "NAV_OK"` was never reached. The `finally` runs after `catch`.

### Important Points
- You can have multiple `catch` blocks? No, but you can use `if` statements inside `catch` to handle different error types.
- The `finally` block runs even if there's a `return` in `try` or `catch`. It runs before the function actually returns.
- If you don't catch an error, it propagates up and may crash the program.

---

## 4. Promises – Taming Asynchronous Code

Promises are a modern way to handle asynchronous operations, avoiding the infamous **callback hell**.

### The Problem: Callback Hell

Before promises, asynchronous code was written with callbacks. The provided example shows a nested callback structure:

```javascript
function prepareOrderCB(dish, cb) {
  setTimeout(() => cb(null, { dish, status: "prepared" }), 100);
}
function pickupOrderCB(order, cb) {
  setTimeout(() => cb(null, { ...order, status: "picked-up" }), 100);
}
function deliverOrderCB(order, cb) {
  setTimeout(() => cb(null, { ...order, status: "delivered" }), 100);
}

prepareOrderCB("Biryani", (err, order) => {
  if (err) return console.log(err);
  pickupOrderCB(order, (err, order) => {
    if (err) return console.log(err);
    deliverOrderCB(order, (err, order) => {
      if (err) return console.log(err);
      console.log(`${order.dish}: ${order.status}`);
    });
  });
});
```

This is hard to read, maintain, and error-prone. Promises solve this.

### What is a Promise?

A promise is an object representing the **eventual completion (or failure)** of an asynchronous operation. It can be in one of three states:

- **pending**: initial state, neither fulfilled nor rejected.
- **fulfilled**: operation completed successfully.
- **rejected**: operation failed.

Once a promise is settled (fulfilled or rejected), it cannot change state.

### Creating a Promise

```javascript
function prepareOrder(dish) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!dish) {
        reject(new Error("No dish is there"));
        return;
      }
      console.log(`${dish} is ready`);
      resolve({ dish, status: "prepared" });
    }, 100);
  });
}
```

- The executor function `(resolve, reject) => {...}` runs immediately.
- Call `resolve(value)` when the operation succeeds.
- Call `reject(error)` when it fails.

### Consuming a Promise: `.then()`, `.catch()`, `.finally()`

```javascript
prepareOrder("Paneer Tikka")
  .then(order => {
    // order is the resolved value from prepareOrder
    return pickupOrder(order); // returns a new promise
  })
  .then(order => {
    return deliverOrder(order);
  })
  .then(order => {
    console.log(`${order.dish}: ${order.status}`);
  })
  .catch(error => {
    console.error("Something went wrong:", error);
  })
  .finally(() => {
    console.log("Order process completed");
  });
```

- **`.then(onFulfilled, onRejected)`**: attaches callbacks for fulfillment and rejection. It returns a new promise, allowing chaining.
- **`.catch(onRejected)`**: shorthand for `.then(null, onRejected)`.
- **`.finally(onFinally)`**: runs regardless of fulfillment or rejection (like `finally` in try/catch).

### Chaining Promises

Each `.then` returns a new promise. If you return a value from a `.then` callback, that value becomes the resolution of the next promise. If you return a promise, the next `.then` waits for it.

```javascript
prepareOrder("Paneer Tikka")
  .then(order => {
    return pickupOrder(order); // returns promise
  })
  .then(pickedOrder => {
    return deliverOrder(pickedOrder);
  })
  .then(deliveredOrder => {
    console.log(deliveredOrder);
  });
```

### Error Propagation

If any promise in the chain rejects, the control jumps to the nearest `.catch`. This makes error handling linear and easy.

```javascript
prepareOrder("") // empty dish triggers reject
  .then(order => pickupOrder(order)) // skipped
  .then(order => deliverOrder(order)) // skipped
  .catch(err => console.log("Caught:", err.message)); // "No dish is there"
```

### Static Promise Methods

- **`Promise.resolve(value)`**: returns a promise that resolves with `value`.
- **`Promise.reject(reason)`**: returns a promise that rejects with `reason`.
- **`Promise.all(iterable)`**: waits for all promises to resolve, or rejects if any rejects. Returns an array of results.
- **`Promise.race(iterable)`**: settles as soon as the first promise settles (resolves or rejects).
- **`Promise.allSettled(iterable)`**: waits for all promises to settle (each may fulfill or reject) and returns an array of objects describing the outcome.
- **`Promise.any(iterable)`**: waits for the first promise to fulfill; rejects only if all reject.

Example of `Promise.all`:

```javascript
const order1 = prepareOrder("Biryani");
const order2 = prepareOrder("Kebab");
Promise.all([order1, order2])
  .then(([bir, keb]) => {
    console.log("Both orders ready:", bir, keb);
  })
  .catch(err => console.log("One failed:", err));
```

### Async/Await – Syntactic Sugar

`async/await` makes promise-based code look synchronous, further improving readability.

```javascript
async function processOrder(dish) {
  try {
    const order = await prepareOrder(dish);
    const picked = await pickupOrder(order);
    const delivered = await deliverOrder(picked);
    console.log(`${delivered.dish}: ${delivered.status}`);
  } catch (error) {
    console.error("Order failed:", error);
  } finally {
    console.log("Order process completed");
  }
}

processOrder("Paneer Tikka");
```

- An `async` function always returns a promise.
- `await` pauses the execution of the function until the promise settles, then returns the resolved value (or throws if rejected).
- Use `try...catch` for error handling.

### Comparison: Callbacks → Promises → Async/Await

| Callbacks                     | Promises                      | Async/Await                   |
|-------------------------------|-------------------------------|-------------------------------|
| Nested, hard to read          | Chained, linear               | Looks synchronous             |
| Error handling per step       | Central `.catch`              | `try/catch`                   |
| Inversion of control          | Trustworthy, standard         | Built on promises             |

### Complete Promise Example from File (Expanded)

The provided file shows a glimpse. Let's flesh it out with proper implementations for `pickupOrder` and `deliverOrder`:

```javascript
function prepareOrder(dish) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!dish) {
        reject(new Error("No dish provided"));
        return;
      }
      console.log(`${dish} is ready`);
      resolve({ dish, status: "prepared" });
    }, 100);
  });
}

function pickupOrder(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${order.dish} picked up`);
      resolve({ ...order, status: "pickedup" });
    }, 100);
  });
}

function deliverOrder(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${order.dish} delivered`);
      resolve({ ...order, status: "delivered" });
    }, 100);
  });
}

// Using promises
prepareOrder("Paneer Tikka")
  .then(order => pickupOrder(order))
  .then(order => deliverOrder(order))
  .then(order => console.log(`${order.dish}: ${order.status}`))
  .catch(err => console.error(err.message))
  .finally(() => console.log("Done"));

// Using async/await
async function handleOrder() {
  try {
    const order = await prepareOrder("Biryani");
    const picked = await pickupOrder(order);
    const delivered = await deliverOrder(picked);
    console.log(`${delivered.dish}: ${delivered.status}`);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("All done");
  }
}
handleOrder();
```