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