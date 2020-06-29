const express = require ("express")
const router = express.Router()
const task = require("../models/task")

router.post("/tasks", async (req,res) =>{
    const Task = new task (req.body)

    try{
        await Task.save()
        res.status(201).send(Task) 
    }
    catch(err){
        res.status(400).send()
    }
    
})

router.get("/tasks", async(req,res) => {

    try{
        const tasks = await task.find({})
        res.send(tasks) 
    }
    catch(err){
        res.status(500).send()
    }
})


router.get("/tasks/:id", async(req,res) => {
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

router.patch("/tasks/:id", async(req,res) =>{
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


router.delete("/tasks/:id", async (req,res) =>{
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

module.exports = router