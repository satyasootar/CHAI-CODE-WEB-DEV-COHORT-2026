import http from "http"
import createServerApplication from "./app/index.js";

function main(){
    const server = http.createServer(createServerApplication());
    const port = process.env.PORT || 3000

    server.listen(port, ()=>{
        console.log(`The server is running at port: ${port}`);
    })
}

main()