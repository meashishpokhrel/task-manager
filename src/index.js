const express = require ("express")
require("./db/mongoose")
const User = require("./models/users")
const task = require("./models/task")
const app = express()

const port = process.env.port || 3000
app.use (express.json())

app.post("/users", (req,res) => {
    const user = new User(req.body)
    
    user.save().then((user) => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.get("/users", (req,res) => {
    User.find({}).then((users) =>{
        res.send(users)
    }).catch((err)=>{
        res.status(500).send()
    })
})

app.get("/users/:id", (req,res) => {
    const _id=req.params.id
    User.findById({_id}).then((users) =>{
        if(!users){
            res.status(404).send()
        }
        res.send(users)
    }).catch((err) => {
        res.status(500).send()
    })
})


app.post("/tasks", (req,res) =>{
    const Task = new task (req.body)

    Task.save().then ((Task) =>{
        res.status(201).send(Task)
    }).catch((err) =>{
        res.status(400).send(err)
    })
})

app.get("/tasks", (req,res) => {
    task.find({}).then((tasks) =>{
        res.send(tasks)
    }).catch((err)=>{
        res.status(500).send()
    })
})


app.get("/tasks/:id", (req,res) => {
    const _id = req.params.id
    task.findById(_id).then((tasks)=>{
        if (!tasks){
            res.status(404).send()
        }
        res.send(tasks)
    }).catch((err)=>{
        res.status(500).send()
    })
})



app.listen(port,  () => {
    console.log("Server Started on " + port)
    
})