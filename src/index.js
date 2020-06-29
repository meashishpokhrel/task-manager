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
        res.status(400).send()
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
            return res.status(404).send()
        }
        res.send(users)
    }
    catch(err){
        res.status(500).send()
    }
})

app.patch("/users/:id", async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)       //Converts into a array
    const canUpdate = ["name", "age", "email", "password"]
    const isValidator = updates.every((update)=> canUpdate.includes(update))

    if(!isValidator){
        return res.status(400).send({Err: "Invalid Updates!!!"})
    }
    try{
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!user){
           return res.status(400).send()
        } 
        res.send(user)
    }
    catch(err){
        res.status(500).send()
    }
})

app.delete("/users/:id", async (req,res) =>{
    
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user){
            return res.status(400).send()
        }
        res.send(user)
    }
    catch(err){
        res.status(400).send()
    }


})

app.post("/tasks", async (req,res) =>{
    const Task = new task (req.body)

    try{
        await Task.save()
        res.status(201).send(Task) 
    }
    catch(err){
        res.status(400).send()
    }
    
})

app.get("/tasks", async(req,res) => {

    try{
        const tasks = await task.find({})
        res.send(tasks) 
    }
    catch(err){
        res.status(500).send()
    }
})


app.get("/tasks/:id", async(req,res) => {
    const _id = req.params.id

    try{
        const tasks = await task.findById(_id)
        if (!tasks){
            return res.status(404).send()
        }
        res.send(tasks) 
    }
    catch(err){
        res.status(500).send()
    }
})

app.patch("/tasks/:id", async(req,res) =>{
    const _id =req.params.id
    const update = Object.keys(req.body)
    const canUpdate = ["description", "completed"]
    const isValidator = update.every((update)=> canUpdate.includes(update))

    if (!isValidator){
        res.status(400).send({Err: "Invalid Updates!!!"})
    }
    try{
        const tasks = await task.findByIdAndUpdate(_id, req.body, {new: true, runValidators:true})
        if (!tasks){
            return res.status(400).send()
        }
        res.send(tasks)
    }
    catch(err){
        res.status(400).send()
    }
})

app.delete("/tasks/:id", async (req,res) =>{
    const _id = req.params.id
    try{
        const tasks = await task.findByIdAndDelete(_id)
        if (!tasks){
            return res.status(400).send()
        }
        res.send(tasks)
    }
    catch(err){
        res.status(404).send()
    }
})


app.listen(port,  () => {
    console.log("Server Started on " + port)
    
})