# JavaScript Class Notes: Closures, DOM, and Todo App

## 1. Closures

### What is a Closure?
> **Definition:** A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created, at function creation time.

- A closure gives a function access to its **outer scope** even after the outer function has returned.
- This is possible because the inner function carries a hidden **"backpack"** (or "tiffin box") containing all the variables it references from its lexical scope.

### Lexical Scoping
JavaScript uses lexical scoping, meaning that the scope of a variable is determined by its position in the source code. Inner functions can access variables of outer functions.

**Example:**
```javascript
function startCompany() {
  function ca(name) {
    return `Name of your company is ${name}`;
  }
  return ca;
}

const getMeAcompany = startCompany();
const myCompanyName = getMeAcompany("Zomato");
console.log(myCompanyName); // "Name of your company is Zomato"
```
- `ca` is returned from `startCompany` and still remembers the `name` parameter because of closure.

### The "Tiffin Box" (Backpack) Analogy
- Every function gets a backpack when created.
- The backpack holds all the outer variables that the function references.
- When the outer function finishes execution, its local variables are normally garbage collected, **but** if an inner function holds references to them, they are kept alive inside the backpack.

### Multiple Instances – Separate Backpacks
Each call to an outer function creates a **new** closure with its own set of variables.

```javascript
function eternal(guest) {
  const guestName = guest;
  let count = 0;

  function zomato() {
    console.log(`Hi ${guestName}, from zomato`);
  }

  function blinkit() {
    if (count == 1) return;
    console.log(`Hi ${guestName}, from blinkit`);
    count++;
  }

  return { zomato, blinkit };
}

const hitesh = eternal("hitesh");
const piyush = eternal("Piyush");

hitesh.blinkit(); // Hi hitesh, from blinkit
hitesh.blinkit(); // (nothing, because count === 1)
piyush.blinkit(); // Hi Piyush, from blinkit (separate count)
```
- `hitesh` and `piyush` each get their own `guestName` and `count` in their backpack.

### Practical Use Case: Memoization (Caching) with Closures
A common optimisation pattern: cache results of expensive function calls.

```javascript
function createOptimisedVersion(fn) {
  const cache = {}; // the "tiffin box"

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log(`Returning from cache`, key);
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function square(n) {
  return n * n;
}

const optimisedSquare = createOptimisedVersion(square);

console.time('first call');
optimisedSquare(12255555);
console.timeEnd('first call');

console.time('second call (cached)');
optimisedSquare(12255555);
console.timeEnd('second call (cached)'); // much faster
```
- The returned function uses the `cache` object from its closure to store previous results.
- No global variables needed – the cache is private to the optimised version.

## 2. DOM (Document Object Model)

### The Window Object
- In the browser, the global object is `window`.
- It contains many properties and methods, e.g.:
  - `window.alert()`
  - `window.document` (the DOM)
  - `window.console`

### The Document Object
- Represents the web page loaded in the browser.
- Provides methods to select and manipulate elements.

**Selecting an element:**
```javascript
const buttonRef = document.getElementById('createButton');
```

**Creating a new element:**
```javascript
const li = document.createElement('li');
li.textContent = 'Some task';
```

**Appending to the DOM:**
```javascript
const container = document.getElementById('todoContainer');
container.appendChild(li);
```

### Event Listeners
Add interactivity using `addEventListener`.

```javascript
buttonRef.addEventListener('click', function() {
  console.log('Button clicked');
});
```

**Multiple listeners:** You can attach many listeners to the same event – they all run.

**Removing an event listener:**
```javascript
function handler() { console.log('clicked'); }
buttonRef.addEventListener('click', handler);
// later
buttonRef.removeEventListener('click', handler);
```
- To remove, you must have a reference to the exact function used.

### Inline vs Programmatic Handlers
- **Inline:** `<button onclick="saveData()">Click</button>` – not recommended.
- **Programmatic:** using `addEventListener` or assigning to `.onclick` property.

### Memory Leaks with DOM References
- If you remove a DOM element but still hold a JavaScript reference to it, the element cannot be garbage collected.
- Always set references to `null` after removing the element if you no longer need them.

```javascript
// Bad – memory leak
const btn = document.getElementById('btn');
btn.remove();
// btn still points to the removed element

// Good
btn.remove();
btn = null;
```

## 3. Todo List Project

We built a simple Todo application to practice DOM manipulation and event handling.

### HTML Structure
```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <style>
    body { background: #111; color: white; }
    input, button { padding: 0.5rem; }
  </style>
</head>
<body>
  <input type="text" id="todoInput" placeholder="Enter your task">
  <button id="createButton">Create</button>
  <ul id="todoContainer"></ul>

  <script src="todo.js"></script>
</body>
</html>
```

### JavaScript (todo.js)
```javascript
// Get references
const createBtn = document.getElementById('createButton');
const inputField = document.getElementById('todoInput');
const container = document.getElementById('todoContainer');

// Add click listener to create button
createBtn.addEventListener('click', function() {
  const task = inputField.value.trim();
  if (task === '') return;

  // Create new list item
  const li = document.createElement('li');
  li.textContent = task;

  // Append to container
  container.appendChild(li);

  // Clear input
  inputField.value = '';

  // Add click listener to remove this item
  li.addEventListener('click', function() {
    li.remove();
    // Optional: set li = null after removal to help GC
  });
});
```

### Explanation
1. **Select elements** using `getElementById`.
2. **Attach event** to the Create button.
3. **Read input value**, create an `<li>`, set its text.
4. **Append** the `<li>` to the `<ul>`.
5. **Clear** the input field.
6. **Add a click listener** to each new `<li>` so that clicking it removes the item.

### Event Delegation Alternative
Instead of attaching a listener to every `li`, you could attach one listener to the container and use `event.target` to detect clicks on `li` elements. This is more efficient.

```javascript
container.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    event.target.remove();
  }
});
```

## 4. Fetching Data from an API

During the class, we also saw how to fetch data from a public API (FreeAPI quotes) and display it.

```javascript
(async function() {
  const response = await fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random');
  const data = await response.json();
  console.log(data);
  // Use data to display on page
})();
```

- `fetch` returns a Promise.
- Use `.then()` or `async/await` to handle the response.
- The API returns JSON, which we parse with `.json()`.

## 5. Key Takeaways

- **Closures** are a fundamental JavaScript concept. They allow functions to "remember" their lexical environment, enabling patterns like memoization, factory functions, and data privacy.
- **DOM** is the interface to interact with web pages. Learn to select, create, modify, and remove elements.
- **Event listeners** are the primary way to handle user interactions. Be mindful of memory leaks by removing listeners and nullifying references when elements are removed.
- **Building projects** like a Todo app helps consolidate these concepts. You'll naturally revisit closures, promises, and DOM methods.

## 6. Next Steps

- Practice writing your own closures and memoization functions.
- Extend the Todo app with features like editing tasks, persisting to localStorage, or fetching data from an API.
- Prepare for the upcoming JavaScript quiz (prize: ₹5,000). Focus on promises, closures, and the event loop.

> "JavaScript is easy once you understand the mental model." – Hitesh Choudhary
