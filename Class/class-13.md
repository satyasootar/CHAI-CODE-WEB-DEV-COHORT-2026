# JavaScript Promises

## 1. Introduction to Asynchronous JavaScript

JavaScript is single-threaded, meaning it can only execute one task at a time. However, many operations (like network requests, file reading, timers) take time. To handle such tasks without blocking the main thread, JavaScript uses asynchronous patterns.

### Callback Hell (Pyramid of Doom)

Initially, asynchronous code was handled using callbacks. But when multiple async operations depend on each other, callbacks nest deeply – this is known as **callback hell**.

**Example from `18-promises.js`** (callback-based order processing):

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

This pattern becomes hard to read and maintain. **Promises** were introduced to solve this problem.

---

## 2. What is a Promise?

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation. It acts as a placeholder for a value that will be available in the future.

### States of a Promise

- **Pending**: Initial state – operation not completed yet.
- **Fulfilled (Resolved)**: Operation completed successfully, and the promise has a resulting value.
- **Rejected**: Operation failed, and the promise has an error reason.

### Creating a Promise

Use the `new Promise` constructor, which takes an **executor function** with two parameters: `resolve` and `reject`. Inside the executor, you perform the async task and call `resolve(value)` on success or `reject(error)` on failure.

**Example** (from `19-promises.js`):

```javascript
const promise = new Promise((res, rej) => {
  setTimeout(() => {
    res("Chaicode");        // success after 2 seconds
    // rej(new Error("Chaicode")); // error
  }, 2000);
});
console.log(promise); // Promise { <pending> } initially
```

- `resolve` and `reject` are functions provided by JavaScript. They change the promise’s state and set its value/error.

---

## 3. Consuming a Promise

### `.then()` and `.catch()`

- `.then()` is called when the promise is fulfilled. It receives the resolved value.
- `.catch()` is called when the promise is rejected. It receives the error.
- `.finally()` runs regardless of fulfillment or rejection (for cleanup).

**Basic usage:**

```javascript
promise
  .then((data) => {
    console.log("Resolved:", data);
  })
  .catch((error) => {
    console.log("Rejected:", error);
  });
```

### Chaining Promises

`.then()` itself returns a new promise, allowing you to chain multiple asynchronous operations. You can return a value or another promise from a `.then()` callback, and the next `.then()` will receive that.

**Example from `19-promises.js`** (chaining with transformations):

```javascript
promise
  .then((data) => {
    newData = data.toUpperCase(); // transform data
    return newData;               // passes to next .then
  })
  .then((data) => {
    return data + ".com";         // further transform
  })
  .then(console.log)              // prints "CHAICODE.com"
  .catch((error) => {
    console.log(error);
    return "Chai";                // even in catch you can return a value
  })
  .then(console.log);             // this will run if previous catch returned
```

**Key Points:**
- If you return a value from `.then()`, the next `.then()` receives that value.
- If you return a promise, the next `.then()` waits for it to resolve.
- If an error occurs in any `.then()`, it jumps to the nearest `.catch()`.
- You can also provide a second argument to `.then()`: `.then(successCallback, errorCallback)` – but using `.catch()` is more readable.

---

## 4. Error Handling

Errors in promises can be handled with `.catch()` or the second parameter of `.then()`. The instructor emphasized that `.catch()` is the modern, preferred way.

```javascript
promise
  .then((data) => console.log(data))
  .catch((err) => console.log("Error:", err.message));
```

In `19-promises.js`, you see an example where a rejected promise is handled, and then a fallback value is returned to continue the chain:

```javascript
.catch((error) => {
  console.log(error);
  return "Chai";         // chain continues with this value
})
.then(console.log);      // prints "Chai"
```

---

## 5. Promise Static Methods

JavaScript provides several utility methods to work with multiple promises.

### `Promise.resolve(value)`
Creates a promise that is immediately resolved with the given value.

```javascript
const turant = Promise.resolve("Turant");
console.log(turant); // Promise { <resolved>: "Turant" }
turant.then(console.log); // prints "Turant"
```

### `Promise.reject(reason)`
Creates a promise that is immediately rejected with the given reason.

### `Promise.all(iterable)`
- Takes an array (or iterable) of promises.
- Returns a promise that resolves when **all** input promises resolve.
- The resolved value is an array of results in the same order.
- If **any** promise rejects, the whole `Promise.all` rejects immediately with that error.

```javascript
const allPromise = Promise.all([
  Promise.resolve("Chai"),
  Promise.resolve("Code"),
  // Promise.reject("Error"), // if uncommented, allPromise rejects
]);

allPromise.then(console.log); // ["Chai", "Code"]
```

### `Promise.allSettled(iterable)`
- Waits for **all** promises to settle (either resolve or reject).
- Returns a promise that resolves with an array of objects describing the outcome of each promise:
  - `{ status: "fulfilled", value: ... }`
  - `{ status: "rejected", reason: ... }`
- Never rejects – it always resolves after all promises finish.

**Example from `19-promises.js`**:

```javascript
const allPromise = Promise.allSettled([
  Promise.resolve("Chai"),
  Promise.resolve("Code"),
  Promise.reject("Error"),
]);

allPromise.then(console.log);
/* Output:
[
  { status: 'fulfilled', value: 'Chai' },
  { status: 'fulfilled', value: 'Code' },
  { status: 'rejected', reason: 'Error' }
]
*/
```

### `Promise.any(iterable)`
- Returns a promise that resolves as soon as **any** of the input promises resolves.
- If all promises reject, it rejects with an `AggregateError`.

### `Promise.race(iterable)`
- Returns a promise that settles (resolve or reject) as soon as the first promise settles (wins the race).

---

## 6. Async / Await

`async`/`await` is syntactic sugar over promises, making asynchronous code look synchronous.

### `async` function
- Declaring a function with `async` makes it return a promise automatically.
- Inside an `async` function, you can use `await` to pause execution until a promise settles.

### `await`
- `await` can only be used inside an `async` function (except in modules where top-level await is allowed in modern JS).
- It waits for the promise to resolve and returns the resolved value.
- If the promise rejects, `await` throws the error, so you should wrap it in `try...catch`.

**Example from `19-promises.js`**:

```javascript
const hPromise = new Promise((res, rej) => {
  setTimeout(() => {
    // res("Masterji");
    rej(new Error("Masterji"));
  }, 3000);
});

async function nice() {
  try {
    const result = await hPromise;
    console.log(result);
  } catch (error) {
    console.log("Error aa gya ji", error.message);
  }
}

nice();
```

**Key Points:**
- `await` pauses the function until the promise settles, but does **not** block the main thread – other code can run.
- Error handling with `try...catch` is clean.
- You can also use `await` with `Promise.all` etc.:

```javascript
const [a, b] = await Promise.all([p1, p2]);
```

### Global `await` (Top-level await)
In modern JavaScript modules, you can use `await` outside an `async` function. This is useful in scripts, but support depends on the environment.

---

## 7. Practical Examples from `20-promises.js`

### Boiling Water Function

```javascript
function boilWater(time) {
  return new Promise((res, rej) => {
    console.log("Krte h ji boil water");
    if (typeof time !== "number" || time < 0) {
      rej(new Error("ms must be in number and greater than zero"));
    }
    setTimeout(() => {
      res("Ubal gya"); // water boiled
    }, time);
  });
}

boilWater(200)
  .then((msg) => console.log("Resolved: ", msg))
  .catch((err) => console.log("Rejected: ", err.message));
```

- Shows input validation inside the promise executor.
- Reject with an `Error` object for proper error handling.

### Grind Leaves (using `Promise.resolve`)

```javascript
function grindLeaves() {
  return Promise.resolve("Leaves grounded");
}
```

- Immediately resolved promise – useful for synchronous values that you want to treat as async.

### Steep Tea (using timeout)

```javascript
function steepTea(time) {
  return new Promise((res) => {
    setTimeout(() => res("Steeped tea"), time);
  });
}
```

- No rejection needed in this simple example.

### Add Sugar (synchronous function)

```javascript
function addSugar(spoons) {
  return `Added ${spoons} sugar`;
}
```

- This is a normal synchronous function. In a promise chain, you can call it and return its value.

**Chaining them together** (the file ends with an incomplete chain, but the idea is):

```javascript
grindLeaves()
  .then((val) => {
    console.log(val);
    return steepTea(1000);
  })
  .then((tea) => {
    console.log(tea);
    return addSugar(2);
  })
  .then((sweet) => console.log(sweet))
  .catch(console.error);
```

---

## 8. How Promises Work Under the Hood (Event Loop & Microtasks)

The instructor explained the execution model:

- JavaScript has a **call stack** where functions are executed.
- Web APIs (like `setTimeout`, `fetch`) are handled by the browser (or Node.js) and have their own threads.
- When an async operation completes, its callback is placed in a **task queue** (macrotask queue) or **microtask queue**.
- **Microtask queue** (for promises, mutation observers) has higher priority than the **macrotask queue** (for `setTimeout`, DOM events).
- The event loop continuously checks if the call stack is empty, then first processes all microtasks, then one macrotask, and repeats.

**Priority order:**
1. Synchronous code (line by line)
2. Microtasks (promise callbacks)
3. Macrotasks (setTimeout, setInterval)

**Analogy used:** VIP culture – promises (microtasks) get priority like VIPs, while timers (macrotasks) are like regular people waiting in line.

**Example to illustrate:**

```javascript
console.log("Swastik");
Promise.resolve("resolveed value").then((v) => {
  console.log("Microtask ", v);
});
console.log("Avishek");
// Output:
// Swastik
// Avishek
// Microtask resolved value
```

Even though the promise resolves immediately, its `.then` callback is a microtask and runs after all synchronous code.

---

## 9. Fetch API and References

`fetch` is a web API that returns a promise. The instructor explained:

- `fetch` is not part of JavaScript core; it’s provided by the browser (or Node.js via libraries).
- When you call `fetch`, JavaScript delegates the network request to the browser’s networking layer.
- `fetch` returns a **reference** to a promise object immediately.
- This promise object has internal state (`pending`, `fulfilled`, `rejected`) and will eventually hold the response data.

```javascript
const data = fetch('https://api.example.com');
console.log(data); // Promise { <pending> }
```

- The variable `data` holds a **reference** to the promise, not the actual data. You use `.then` or `await` to access the eventual value.

**Key takeaway:** JavaScript itself cannot make network calls; it relies on external APIs (browser or Node.js). The promise is a placeholder for the result.

---

## 10. Recap and Important Concepts

- **Promises** are objects representing future values.
- **Chaining** allows sequential async operations without nesting.
- **Error propagation** – if you don’t handle an error, it cascades down to the next `.catch()`.
- **Static methods** like `Promise.all`, `Promise.allSettled` help manage multiple promises.
- **Async/await** makes code cleaner but is just syntactic sugar over promises.
- **Microtasks vs Macrotasks** – promise callbacks run before timers.

### Additional Notes from the Class

- The instructor emphasized understanding the **reference vs value** concept: when you assign a promise to a variable, you store a reference to the promise object, not the result.
- They discussed **metaprogramming** and symbols briefly, but that’s beyond the scope.
- The class also included a live quiz and announcements about a hackathon (build-a-thon) and campus ambassador program, but those are not part of the technical notes.

---

## 11. Summary of Code Files

### `18-promises.js`
Demonstrates callback hell with order preparation, pickup, delivery. Serves as motivation for promises.

### `19-promises.js`
- Promise creation with `setTimeout`.
- Chaining with `.then()` and returning transformed values.
- Error handling with `.catch()` and continuing the chain.
- `Promise.allSettled` example.
- Async/await with try/catch.

### `20-promises.js`
- `boilWater` – promise with validation and timeout.
- `grindLeaves` – returns `Promise.resolve`.
- `steepTea` – returns a promise that resolves after a timeout.
- `addSugar` – synchronous function.
- Partial chain to combine them.

---

## 12. Key Interview Points

- What are the states of a promise?
- How does promise chaining work?
- Difference between `Promise.all` and `Promise.allSettled`.
- How to handle errors in async/await.
- Explain the event loop with microtasks and macrotasks.
- What happens if you don’t return anything in a `.then()`? (It returns `undefined`, so next `.then()` receives `undefined`.)

