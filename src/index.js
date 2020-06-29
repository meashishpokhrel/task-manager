const express = require ("express")
require("./db/mongoose")
const app = express()
const userRouter = require("./routers/tasks")
const taskRouter = require ("./routers/users")

const port = process.env.port || 3000
app.use (express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,  () => {
    console.log("Server Started on " + port)
    
})