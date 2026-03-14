const http = require("http")

const server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url === "/menu"){
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({items:["thali, burger, biriyani"]}))
    }else if(req.method === "POST" && req.url === "/order"){
        let data = ""
        req.on("data", chunk => data += chunk)
        req.on("end", ()=> {
            const order = JSON.stringify({
                status:"received",

            })
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({
                status: true,
                order
            }))
        })
    }
})
