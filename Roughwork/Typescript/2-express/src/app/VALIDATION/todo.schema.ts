import z from "zod"

export const todoValidationSchema = z.object({
    id: z.string().describe("ID of the Todo"),
    title: z.string().describe("title of todo"),
    description: z.string().optional().describe("Description of the todo"),
    isCompleted: z.boolean().describe('If the todo item is completed or not')
    
})

export type Todo = z.infer<typeof todoValidationSchema>



// export interface ITodo {
//     id: string
//     title: string
//     description?: string
//     isCompleted: boolean
// }