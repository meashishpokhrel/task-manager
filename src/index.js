const express = require ("express")
require("./db/mongoose")
const User = require("./models/users")
const task = require("./models/task")
const app = express()

const port = process.env.port || 3000
app.use (express.json())

app.post("/users", async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user) 
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.get("/users", async (req,res) => {

    try{
        const users =await User.find({})
        res.send(users)
    }
    catch(err){
        res.status(500).send()
    }
})

app.get("/users/:id", async (req,res) => {
    const _id=req.params.id

    try{
        const users = await User.findById({_id})
        if(!users){
            res.status(404).send()
        }
        res.send(users)
    }
    catch(err){
        res.status(500).send()
    }
})


app.post("/tasks", async (req,res) =>{
    const Task = new task (req.body)

    try{
        await Task.save()
        res.status(201).send(Task) 
    }
    catch(err){
        res.status(400).send(err)
    }
    
})

app.get("/tasks", async(req,res) => {

    try{
        const tasks = await task.find({})
        res.send(tasks) 
    }
    catch(err){
        res.status(500).send(err)
    }
})


app.get("/tasks/:id", async(req,res) => {
    const _id = req.params.id

    try{
        const tasks = await task.findById(_id)
        if (!tasks){
            res.status(404).send()
        }
        res.send(tasks) 
    }
    catch(err){
        res.status(500).send(err)
    }
})



app.listen(port,  () => {
    console.log("Server Started on " + port)
    
})