const express = require ("express")
require("./db/mongoose")
const app = express()

const jwt = require("jsonwebtoken")
const userRouter = require("./routers/tasks")
const taskRouter = require ("./routers/users")
const adminRouter = require ("./routers/admin")

const port = process.env.port || 3000
app.use (express.json())
app.use(userRouter)
app.use(taskRouter)
// app.use(adminRouter)



app.listen(port,  () => {
    console.log("Server Started on " + port)
    
})

const Task = require ("./models/task")
const User = require ("./models/users")
const main = async () => {
    // const task = await Task.findById("5f1bcd7bc45b421450e16bc8")
    // await task.populate("owner").execPopulate()
    // console.log(task.owner)

    const user = await User.findById("5f06d1c93cf6062a286eb14d")
    await user.populate("tasks").execPopulate()
    console.log(user.tasks)
}
main()


//Nodemon code for Token Bearer automation
// if (pm.response.code === 201){
//     pm.environment.set("authoToken", pm.response.json().token)
// }