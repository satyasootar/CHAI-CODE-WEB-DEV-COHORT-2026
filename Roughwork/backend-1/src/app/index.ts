import express from 'express'
import type { Request, Response} from "express"

function createServerApplication(){
    const app = express()
    app.use(express.json())

    app.get("/", (req: Request, res: Response)=>{
        res.send("Hello from Server")
    })


    return app
}

export default createServerApplication