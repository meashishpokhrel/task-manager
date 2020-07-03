const express = require ("express")
require("./db/mongoose")
const app = express()
const bcrypt = require("bcryptjs")
const userRouter = require("./routers/tasks")
const taskRouter = require ("./routers/users")

const port = process.env.port || 3000
app.use (express.json())
app.use(userRouter)
app.use(taskRouter)

// const myfunction = async () => {
//     const password = "test1234"
//     const hashedPassword = await bcrypt.hash(password,8)
//     console.log(password);
//     console.log(hashedPassword)

//     const isValidator = await bcrypt.compare("test12345", hashedPassword)
//     console.log(isValidator)
    
    
// }

// myfunction()


app.listen(port,  () => {
    console.log("Server Started on " + port)
    
})