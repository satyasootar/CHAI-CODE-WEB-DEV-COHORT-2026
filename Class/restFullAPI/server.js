import "dotenv/config" // This will let use the values in env file using process.env.<key>
import app from "./src/app.js"
import connectDB from "./src/common/config/db.js"

const port = process.env.PORT || 3001

const start = async() => {
  await connectDB() //connect to db before starting the server

  app.listen(port, () => {
    console.log(`✅server is running on port: ${port} on ${process.env.NODE_ENV} mode`)
  })
}

start().catch((err)=>{
    console.log(`Failed to start the server. Error: ${err}`);
    process.exit(1) //gracefully exit the application
})



