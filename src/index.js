const express = require ("express")
require("./db/mongoose")
const app = express()

const jwt = require("jsonwebtoken")
const userRouter = require("./routers/tasks")
const taskRouter = require ("./routers/users")

const port = process.env.port || 3000
app.use (express.json())
app.use(userRouter)
app.use(taskRouter)

// const myfunction = async () => {
//     const token = jwt.sign({_id:"abc123"},"tryingjwt",{expiresIn: "7 days"})
//     console.log(token);

//     const data = jwt.verify(token, "tryingjwt")
//     console.log(data);
      
    
// }

// myfunction()


app.listen(port,  () => {
    console.log("Server Started on " + port)
    
})

//Nodemon code for Token Bearer automation
// if (pm.response.code === 201){
//     pm.environment.set("authoToken", pm.response.json().token)
// }