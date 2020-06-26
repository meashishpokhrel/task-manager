const express = require ("express")
require("./db/mongoose")
const User = require("./models/users")
const task = require("./models/task")
const app = express()

const port = process.env.port || 3000
app.use (express.json())

app.post("/users", (req,res) => {
    const user = new User(req.body)
    
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.post("/tasks", (req,res) =>{
    const Task = new task (req.body)

    Task.save().then (() =>{
        res.status(201).send(Task)
    }).catch((err) =>{
        res.status(400).send(err)
    })
})

app.listen(port,  () => {
    console.log("Server Started on " + port)
    
})