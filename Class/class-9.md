# Class 9: JavaScript Fundamentals

## Action Items
- [ ] Practice using `const` by default, only change to `let` when reassignment is needed.
- [ ] Research what a **Rune** is (R-U-N-E).
- [ ] Write down all primitive data types in your notes.
- [ ] Complete the assignment on array and object methods – focus on basics like `pop`, `push`, `sort`, `reverse`, and finding values.
- [ ] Study string method documentation (`includes`, `slice`, `replace`, `split`, `trim`) at your own pace.
- [ ] Research the difference between `undefined` and `null` in terms of memory management.

---

## Variable Declarations: `var`, `let`, `const`

| Keyword | Scope          | Can be reassigned? | Notes |
|---------|----------------|---------------------|-------|
| `var`   | Function-scoped | Yes                 | Avoid – leaks out of blocks, can cause conflicts. |
| `let`   | Block-scoped    | Yes                 | Use when you need to reassign. |
| `const` | Block-scoped    | No                  | Use by default. The reference cannot change, but object/array contents can be mutated. |

### The “Leaky Treasure” Problem with `var`
- Variables declared with `var` inside a block (e.g., `if`, `for`) are accessible outside that block because `var` is function‑scoped.
- Example: `for (var i = 0; i < 3; i++)` – `i` remains in the outer scope after the loop, potentially interfering with other loops or code.
- In older codebases, developers used prefixes (e.g., `_temp`) to avoid accidental collisions.

### Best Practice: `const` by Default
- Start every declaration with `const`. Only switch to `let` when you know reassignment is necessary.
- This makes code more predictable, bug‑resistant, and easier to reason about.
- Mature developers prefer `const` for stability; beginners often lean on `let` for flexibility, but `const` is the safer choice.

---

## Variable Naming Conventions
- No universal rules – consistency within a project is what matters most.
- Common styles:
  - **camelCase** – `crewCount`
  - **snake_case** – `crew_count` (less common in JavaScript)
  - **PascalCase** – for classes/constructors
- Underscore prefix (`_private`) often indicates a private variable or an unused parameter.
- Dollar signs (`$`) appear in some contexts (e.g., jQuery variables, or to denote DOM elements).
- Environment variables typically use **UPPER_SNAKE_CASE** (e.g., `API_KEY`).

---

## Primitive Data Types (7 total)

| Type      | Description |
|-----------|-------------|
| `string`  | Textual data. |
| `number`  | Integers and decimals (64‑bit floating point). |
| `bigint`  | For arbitrarily large integers; created by adding `n` suffix, e.g., `9007199254740991n`. |
| `boolean` | `true` or `false`. |
| `undefined` | A variable that has been declared but not assigned a value. |
| `null`    | Intentional absence of any value. Use `null` to explicitly clear a variable (not `0` or `""`). |
| `symbol`  | Guaranteed unique and immutable. Used for unique property keys, especially in libraries and frameworks. |

### Type Checking with `typeof`
- `typeof` returns a string indicating the type.
- Quirk: `typeof null === "object"` – this is a bug from JavaScript's creation (1995) that is preserved for backward compatibility.
- Arrays and plain objects both return `"object"`; use `Array.isArray(arr)` to check for arrays.

### Symbol in Practice
- Symbols guarantee uniqueness – even two symbols with the same description are different values.
- Common in server‑side rendering (e.g., React) and GraphQL to create unique identifiers that won't clash.

---

## Non‑Primitive Types (Objects)
- Objects, arrays, functions are all objects.
- `typeof function() {}` returns `"function"`, but functions are still objects (callable objects).

---

## Copy by Value vs Copy by Reference

| Type       | Behaviour |
|------------|-----------|
| **Primitives** | Copied **by value** – each variable gets its own independent copy. |
| **Objects**    | Copied **by reference** – variables point to the same memory location. |

### Shallow Copy with the Spread Operator
```js
const original = { name: "Sword", damage: 50 };
const copy = { ...original };
```
- The spread operator creates a new object with top‑level properties copied **by value**.
- **Limitation**: Nested objects are still copied by reference (shallow copy). Changes to a nested object in the copy will affect the original.

### Deep Copy with `structuredClone()`
```js
const deepCopy = structuredClone(original);
```
- Creates a true deep copy, cloning all nested objects.
- Modern addition (not available a few years ago). Older workarounds used `JSON.parse(JSON.stringify(original))`.

---

## JavaScript Numbers

- All numbers (integers and decimals) are 64‑bit floating point.
- Underscores can improve readability: `1_000_000`.
- Special numeric values:
  - `Infinity`, `-Infinity`
  - `NaN` (Not a Number) – results from invalid math operations. **`NaN` is never equal to itself**.
- `1 / 0` → `Infinity`, `-1 / 0` → `-Infinity`.

### Useful Number Properties
- `Number.MAX_SAFE_INTEGER`, `Number.MIN_SAFE_INTEGER`
- `Number.EPSILON` – the smallest difference between two representable numbers, useful for floating‑point comparisons.
- Methods: `Number.isInteger()`, `Number.isFinite()`, `Number.isNaN()`.

### Parsing Numbers
- `parseInt(string, radix)` – converts to integer. **Always specify the radix** (e.g., `10`) to avoid unexpected octal behaviour.
- `parseFloat(string)` – converts to decimal.
- Hex notation: `parseInt("0xA3")` → `163`.
- Leading zeros: `parseInt("007", 10)` → `7`.

---

## Math Library

The built‑in `Math` object provides common mathematical operations. No installation needed.

| Method          | Description |
|-----------------|-------------|
| `Math.round()`  | Rounds to nearest integer. |
| `Math.floor()`  | Rounds down. |
| `Math.ceil()`   | Rounds up. |
| `Math.trunc()`  | Removes decimal part (towards zero). |
| `Math.max(a, b, ...)` | Returns the largest of the given numbers. |
| `Math.min(a, b, ...)` | Returns the smallest. |
| `Math.sqrt(x)`  | Square root. |
| `Math.random()` | Returns a pseudo‑random number between 0 (inclusive) and 1 (exclusive). |

### The Famous Precision Issue: `0.1 + 0.2 !== 0.3`
- This is a limitation of floating‑point arithmetic, not a JavaScript bug.
- Solution: compare with a tolerance using `Math.abs(a - b) < Number.EPSILON`.

---

## Strings

- **Strings are immutable** – any method that appears to modify a string actually returns a new string; the original remains unchanged.
- Three ways to declare:
  ```js
  'single quotes'
  "double quotes"
  `template literals`   // backticks
  ```

### Common String Methods

| Category      | Methods |
|---------------|---------|
| **Access**    | `charAt(index)` (returns empty string for invalid index), `.at(index)` (supports negative indices, returns `undefined` for out‑of‑range). |
| **Case**      | `toUpperCase()`, `toLowerCase()` – useful for normalising input (e.g., emails). |
| **Search**    | `indexOf()`, `lastIndexOf()`, `includes()`. |
| **Extract**   | `slice()`, `substring()`, `split()`. |
| **Trim**      | `trim()`, `trimStart()`, `trimEnd()` – remove whitespace. |
| **Padding**   | `padStart(targetLength, padString)`, `padEnd()` – e.g., `"42".padStart(6, "x")` → `"xxxx42"`. |

### Template Literals
- Enclosed in backticks `` `...` ``.
- Interpolate variables and expressions with `${expression}`.
- Support multi‑line strings.
- Can contain any JavaScript expression (e.g., ternary operators).
- **Tagged templates** (advanced) allow custom processing; used in GraphQL, styled‑components, etc.

---

## `null`, `undefined`, and `void`

- **`undefined`**: A variable that has been declared but not assigned a value. Also the default return of functions with no explicit `return`.
- **`null`**: An intentional assignment meaning “no value”. Use `null` to clear a variable (e.g., after a logout).
- **`void`**: An operator that evaluates an expression and returns `undefined`. Often used in TypeScript to indicate a function returns nothing.

---

## Conditionals

### `if` Statement
```js
if (condition) {
  // runs if condition is truthy
} else if (anotherCondition) {
  // ...
} else {
  // ...
}
```

### Logical Operators
- `&&` (AND) – both sides must be truthy.
- `||` (OR) – at least one side must be truthy.
- `!` (NOT) – negates truthiness.

### `switch` Statement
```js
switch (value) {
  case 'A':
    // do something
    break;
  case 'B':
    // do something else
    break;
  default:
    // fallback
}
```
- Use `break` to prevent fall‑through to the next case.
- Always include a `default` case for unmatched values.

### Ternary Operator
```js
const result = condition ? valueIfTrue : valueIfFalse;
```

---

## Console Debugging Methods

- `console.log()` – general output.
- `console.count(label)` – counts how many times the line with the given label is executed.
- `console.time(label)` / `console.timeEnd(label)` – measure time between the two calls.
- These tools help inspect values in memory, track variable changes, and debug logic.

---

## Next Class Preview
- Deep dive into **arrays and objects**.
- Detailed coverage of **loops** – including `map`, `reduce`, `filter`.
- **Functions** (closures, higher‑order functions, `this`, `call`, `new`, prototypal inheritance) will be covered next week.