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