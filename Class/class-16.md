# Notes on the TypeScript source files that implement the Express API. They cover environment handling, the main server entry, the Express app factory, and the Todo module (routes, controller, validation schema).


## Application Code Overview

This is a simple **Todo API** built with Express and TypeScript.  
It uses an in‑memory array as a database, validates incoming data with **Zod**, and follows a modular structure.

---

### 1. Environment Configuration – `env.ts`

```typescript
import {z} from "zod"

const envSchema = z.object({
    PORT: z.string().optional().default("8080")
})

function createEnv(env: NodeJS.ProcessEnv){
    const safeParseResult = envSchema.safeParse(env)
    if(!safeParseResult.success) throw new Error(safeParseResult.error.message)
    return safeParseResult.data;
}

export const env = createEnv(process.env)
```

**Purpose**:  
Validates and provides typed access to environment variables.

- **Zod schema** – defines that `PORT` is an optional string, defaulting to `"8080"`.  
  `z.string()` ensures it is a string; `.optional().default("8080")` provides a fallback.
- **`createEnv` function** – calls `safeParse` (instead of `parse`) to avoid throwing inside Zod; we manually throw with a clear error message if validation fails.
- **`env` export** – a typed object (`{ PORT: string }`) that can be imported anywhere.  
  Using `process.env` directly would be unsafe and untyped.

**Why this pattern?**  
Centralises environment validation, fails fast if a required variable is missing, and gives you auto‑completion for `env.PORT`.

---

### 2. Entry Point – `index.ts`

```typescript
import http from "node:http"
import { env } from './env.js'
import { createServerApplication } from "./app/index.js"

async function main(){
    try {
        const server = http.createServer(createServerApplication())
        const PORT: number = env.PORT ? +env.PORT : 8080

        server.listen(PORT , ()=>{
            console.log(`Server is running on PORT: ${PORT}`);
        })
    } catch (error) {
        throw error
    }
}

main()
```

**Purpose**:  
Bootstraps the HTTP server.

- Imports the native `http` module and creates a server using our Express application (from `app/index.js`).  
- The `PORT` is read from the validated `env` object, converted to a number (`+env.PORT`).  
- The `server.listen` call starts the server.  
- The `try/catch` is somewhat redundant here (it just re‑throws), but it could be extended to handle startup errors gracefully.

**Note**:  
Using `http.createServer(app)` is equivalent to `app.listen()`, but it gives you direct access to the `http.Server` instance if needed (e.g., for WebSocket integration).

---

### 3. Express App Factory – `app/index.ts`

```typescript
import express from "express"
import type { Application } from "express"
import todoRouter  from './todo/routes.js'

export function createServerApplication():Application {
    const app = express()
    app.use(express.json())
    app.use("/todos", todoRouter)
    
    return app
}
```

**Purpose**:  
Creates and configures the Express application.

- **`express.json()`** – middleware to parse JSON request bodies.  
- Mounts the `todoRouter` under the `/todos` path.  
- Returns the configured `app` instance.

**Why a factory function?**  
It allows the app to be created lazily and makes testing easier (you can create a fresh app for each test).

---

### 4. Todo Module – Validation Schema – `VALIDATION/todo.schema.ts`

```typescript
import z from "zod"

export const todoValidationSchema = z.object({
    id: z.string().describe("ID of the Todo"),
    title: z.string().describe("title of todo"),
    description: z.string().optional().describe("Description of the todo"),
    isCompleted: z.boolean().describe('If the todo item is completed or not')
})

export type Todo = z.infer<typeof todoValidationSchema>
```

**Purpose**:  
Defines the shape of a Todo item and provides both runtime validation and a TypeScript type.

- **`z.object({...})`** – describes the expected fields.  
  - `id` – required string.  
  - `title` – required string.  
  - `description` – optional string.  
  - `isCompleted` – required boolean.  
- **`.describe()`** – adds a description (useful for generating documentation or error messages).  
- **`z.infer<...>`** – extracts the TypeScript type from the schema, giving you a `Todo` type that matches the validation rules.

**Advantage**:  
One source of truth – the schema defines both validation and type. No need to maintain a separate interface (the commented‑out `ITodo` is unnecessary).

---

### 5. Todo Controller – `todo/controller.ts`

```typescript
import type { Request, Response } from 'express'
import { todoValidationSchema, type Todo } from "../VALIDATION/todo.schema.js"

class TodoController {
    private _db: Todo[] 

    constructor() {
        this._db = []
    }

    public handleGetAllTodos(req: Request, res: Response ){
        const todos = this._db;
        return res.json({todos})
    }

    public async handleInsertTodo(req: Request, res:Response){
        const rawBody = req.body;
        try {
            const validationResult = await todoValidationSchema.parseAsync(rawBody);
            this._db.push(validationResult)
            res.status(201).json({success: true, todo: validationResult})
        } catch (error) {
            return res.status(500).json({error: "Validation error"})
        }
    }
}

export default TodoController
```

**Purpose**:  
Encapsulates the business logic for Todo operations.

- **`_db`** – private in‑memory array (acts as a simple database).  
- **`handleGetAllTodos`** – returns all todos as JSON.  
- **`handleInsertTodo`** –  
  1. Takes the raw request body.  
  2. Uses `parseAsync` to validate asynchronously (can handle more complex async validation if needed).  
  3. If valid, pushes the todo into `_db` and responds with `201 Created`.  
  4. If validation fails, catches the error and returns a generic `500` (this could be improved to return the specific validation error).

**Important**:  
The controller uses **`async/await`** – even though the current validation is synchronous, `parseAsync` returns a promise, so the method is prepared for future async validators.  
The `try/catch` currently masks the actual error; a better approach would be to send the error details to the client (e.g., `res.status(400).json(error)`).

---

### 6. Todo Routes – `todo/routes.ts`

```typescript
import { Router } from "express";
import TodoController from "./controller.js";

const router = Router()
const controller = new TodoController()

router.get('/', controller.handleGetAllTodos.bind(controller))
// router.get("/:id")

router.post("/", controller.handleInsertTodo.bind(controller))

// router.put(":id")
// router.delete(":/id")

export default router
```

**Purpose**:  
Defines the endpoints for the Todo resource and wires them to the controller methods.

- Creates a new `Router` instance.  
- Instantiates the `TodoController`.  
- Binds the controller methods to the instance (`.bind(controller)`) so that `this` inside the methods refers to the controller instance.  
- Mounts `GET /` and `POST /` (relative to `/todos`, because the app mounts this router at `/todos`).  

**Why `.bind`?**  
When passing a method as a callback, `this` would otherwise be lost. `.bind(controller)` ensures the method retains the correct `this` context.

---

## How It All Fits Together

1. **Startup** – `index.ts` reads the validated `env`, creates an HTTP server with the Express app, and starts listening.
2. **Request Flow**  
   - A request to `POST /todos` hits the Express app.  
   - `express.json()` parses the body.  
   - The router directs it to `todoRouter.post('/')`.  
   - The router calls `controller.handleInsertTodo` (with `this` bound).  
   - The controller validates the body using the Zod schema.  
   - If valid, it saves the todo in memory and responds.  
   - If invalid, it responds with an error.
3. **Data Storage** – Currently in‑memory (`_db` array). Restarting the server clears all todos.

---

## TypeScript Highlights

- **Strict mode** – all the `tsconfig.json` strict options are in effect, so the code must handle `undefined` properly.
- **Type imports** – using `import type` for `Request`, `Response`, and `Application` avoids including them in the compiled JavaScript.
- **`z.infer`** – derives the `Todo` type from the schema, ensuring type safety.
- **`NodeJS.ProcessEnv`** – the built‑in type for `process.env` is used in `env.ts`.

---

## Potential Improvements

- **Error handling** – Return more detailed validation errors from the controller instead of a generic 500.
- **Database** – Replace the in‑memory array with a real database.
- **Logging** – Add logging middleware (e.g., `morgan`).
- **Environment variables** – Validate more variables (e.g., `NODE_ENV`).
- **ID generation** – Currently the client must supply an `id`; better to generate it on the server (e.g., using `uuid`).
- **Async validation** – The controller already uses `parseAsync`, but the schema is synchronous; you could add custom async checks later.
