# HTTP, Node.js, and TypeScript

## 1. HTTP Methods

HTTP methods (verbs) indicate the desired action to be performed on a resource. They are idempotent or safe in certain ways.

| Method | Description | Idempotent? |
|--------|-------------|-------------|
| **GET** | Retrieve a resource. Should have no side effects. | Yes |
| **POST** | Submit data to create a new resource. Not idempotent. | No |
| **PUT** | Replace an entire resource. Sending the full object. | Yes |
| **PATCH** | Partially update a resource (only changed fields). | No |
| **DELETE** | Remove a resource. Idempotent (multiple deletions same result). | Yes |
| **HEAD** | Same as GET but returns only headers (no body). | Yes |
| **OPTIONS** | Pre-flight request to check allowed methods/capabilities (CORS). | Yes |

- **PUT** is usually idempotent – sending the same request multiple times results in the same state.
- **PATCH** is not necessarily idempotent – only send the fields that changed (bandwidth efficient).
- **DELETE** after first deletion subsequent deletes return the same response (e.g., 404) but resource is gone.

## 2. HTTP Response Status Codes

Status codes are grouped into five classes:

| Range | Category | Examples |
|-------|----------|----------|
| 1xx | Informational | 100 Continue |
| 2xx | Success | 200 OK, 201 Created |
| 3xx | Redirection | 301 Moved Permanently, 304 Not Modified |
| 4xx | Client Error | 404 Not Found, 400 Bad Request, 429 Too Many Requests |
| 5xx | Server Error | 500 Internal Server Error, 502 Bad Gateway |

- **200** – Successful GET, PUT, PATCH, DELETE.
- **201** – Resource created (typically after POST).
- **404** – Resource not found.
- **429** – Too many requests (rate limiting).
- **500** – Internal server error.

> 💡 For a complete list, refer to [MDN HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

---

## 3. Node.js Foundation

### 3.1 JavaScript on the Server
Node.js is not just JavaScript on the server – it is a runtime built on **Google's V8 JavaScript engine** with additional layers that provide OS-level functionality.

```
┌─────────────────────────────┐
│       JavaScript Code        │
├─────────────────────────────┤
│    Node.js Bindings (fs,     │
│    http, path, os, etc.)     │
├─────────────────────────────┤
│           libuv              │
│   (Event Loop, Thread Pool,  │
│    Async I/O, File System)   │
├─────────────────────────────┤
│            V8                │
│   (Compiles JS to machine    │
│    code, JIT compilation)    │
└─────────────────────────────┘
```

- **V8**: Converts JavaScript to machine code (Just-In-Time compilation). It handles memory allocation, garbage collection, and execution.
- **libuv**: A C library that provides the event loop, asynchronous I/O (file system, network), and a thread pool for operations that cannot be done asynchronously at the OS level.
- **Node.js Bindings**: Bridge between JavaScript and C++/C (libuv, V8). They expose lower-level APIs like `fs`, `net`, `http`, etc.

### 3.2 Single‑Threaded? Not Exactly
- JavaScript execution in Node.js is **single‑threaded** (one main thread running the event loop).
- However, **libuv** maintains a **thread pool** (by default 4 threads) to handle expensive operations (file I/O, DNS lookup, crypto) without blocking the main thread.
- This gives Node.js its non‑blocking, asynchronous behaviour.

### 3.3 Check Your Environment
```javascript
const fs = require("fs");
const path = require("path");
const os = require("os");

console.log("Node: ", process.versions.node);   // Node version
console.log("libuv: ", process.versions.uv);    // libuv version
console.log("v8: ", process.versions.v8);       // V8 version
console.log("=".repeat(25));
console.log("Platform ", process.platform);      // e.g., 'linux', 'darwin', 'win32'
console.log("CPU cores ", os.cpus().length);     // number of logical CPU cores

console.log(typeof global);        // 'object'
console.log(typeof globalThis);    // 'object' (universal across environments)
```

### 3.4 NPM and Semantic Versioning

**NPM** (Node Package Manager) is the default package manager for Node.js. It allows you to install and manage third‑party libraries.

- **package.json** – metadata about your project (name, version, dependencies, scripts, etc.)
- **node_modules/** – folder where installed packages live.
- **package-lock.json** – locks exact versions for reproducible builds.

**Semantic Versioning (SemVer)** – version format `MAJOR.MINOR.PATCH`
- **MAJOR**: incompatible API changes.
- **MINOR**: add functionality (backward compatible).
- **PATCH**: backward compatible bug fixes.

Example: `"express": "^4.18.2"` – `^` means compatible with minor/patch updates.

### 3.5 Node.js Project Initialisation
```bash
npm init                  # creates package.json
npm install <package>     # install a package (saved to dependencies)
npm install -g <package>  # install globally (e.g., typescript)
```

---

## 4. Introduction to TypeScript

### 4.1 Why TypeScript?
JavaScript is **loosely typed** – no type checking at compile time. This can lead to runtime errors that are hard to catch.

```javascript
function add(a, b) {
    return a + b;
}
console.log(add(1, 2));      // 3
console.log(add("1", "2"));  // "12" (unexpected!)
```

- No way to know what types a function expects.
- No autocompletion for object properties.
- Bugs appear only at runtime.

**TypeScript** is a **superset of JavaScript** that adds **static typing**. It compiles down to plain JavaScript that runs anywhere JS runs (browsers, Node.js).

### 4.2 TypeScript Workflow

```
Source Code (.ts)  
      │
      ▼
 tsc (TypeScript Compiler)
      │
      ▼
JavaScript (.js)  →  Run in Node.js / Browser
```

- You write `.ts` files, the TypeScript compiler (`tsc`) checks types and produces `.js` files.
- The generated JavaScript is what actually executes.
- TypeScript itself is never run directly – it’s a development tool.

### 4.3 Installation
```bash
npm install -g typescript   # global install
tsc --version               # verify
```

### 4.4 Basic TypeScript Syntax

#### Type Annotations
```typescript
function add(a: number, b: number): number {
    return a + b;
}
// add(1, "2");  // Error: Argument of type 'string' is not assignable to 'number'
```

#### Interfaces
Define the shape of an object.
```typescript
interface User {
    id: string;
    fname: string;
    lname?: string;          // optional property
    email: string;
    contact: {
        mobile: string;
    };
    address: {
        street: number;
        pin: number;
        country: string;
    };
}
```

#### Custom Types (Type Aliases)
```typescript
type UserID = string;   // alias for string
```

#### Classes with Access Modifiers
```typescript
class InMemoryDB {
    private _db: Map<UserID, User>;   // private field

    constructor() {
        this._db = new Map();
    }

    public insertUser(data: User): UserID {
        if (this._db.has(data.id)) {
            throw new Error(`User with ID ${data.id} already exists`);
        }
        this._db.set(data.id, data);
        return data.id;
    }

    public updateUser(id: UserID, updateData: Omit<User, 'id'>): boolean {
        if (!this._db.has(id)) throw new Error(`User with ID ${id} does not exist`);
        this._db.set(id, { ...updateData, id });
        return true;
    }

    public getUserById(id: UserID): User {
        const user = this._db.get(id);
        if (!user) throw new Error(`User with ID ${id} not found`);
        return user;
    }
}
```

#### Using the DB
```typescript
const myDb = new InMemoryDB();
myDb.insertUser({
    id: '1',
    fname: 'Piyush',
    email: 'piyush@email.com',
    contact: { mobile: '99999' },
    address: {
        country: 'In',
        pin: 147001,
        street: 1
    }
});
// myDb.updateUser('1', { ... }); // works
```

### 4.5 Benefits of TypeScript
- **Compile-time type checking** – catch errors early.
- **Better IDE support** – autocompletion, refactoring, navigation.
- **Self-documenting code** – interfaces serve as contracts.
- **Optional properties** (`?`) make flexibility clear.
- **Private/public** modifiers enforce encapsulation.

---

## 5. Putting It All Together: Development Flow

The image from class summarises the typical workflow:

- Developers write **TypeScript** (`.ts`) on their local machine.
- Code is pushed to **Git** (shared repository).
- Before deployment:
  - Compile TS to JS using `tsc`.
  - Run the resulting JavaScript file with **Node.js** (or serve in the browser).
- On the server, only JavaScript files are executed – TypeScript is a development‑time tool.

```
Local Machine (TS) → Git (TS) → CI/Deploy → Compile (TS → JS) → Server (Node) runs JS
```

---

## 6. Summary

| Topic | Key Takeaways |
|-------|---------------|
| HTTP Methods | GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS – each with idempotence characteristics. |
| Status Codes | 1xx (info), 2xx (success), 3xx (redirection), 4xx (client error), 5xx (server error). |
| Node.js | Built on V8 + libuv; single‑threaded event loop but background threads for I/O. |
| NPM & SemVer | package.json, node_modules, semantic versioning (major.minor.patch). |
| TypeScript | Superset of JavaScript with static types; compiles to plain JS; interfaces, optional props, access modifiers. |

> 💡 For deeper dives, refer to:
> - [MDN HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
> - [Node.js Documentation](https://nodejs.org/en/docs/)
> - [TypeScript Handbook](https://www.typescriptlang.org/docs/)