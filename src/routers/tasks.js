const express = require ("express")
const router = express.Router()
const task = require("../models/task")
const auth = require ("../middleware/auth")

router.post("/tasks", auth ,async (req,res) =>{
    const Task = new task ({
        ...req.body,
        owner: req.user._id
    })

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
    const updates = Object.keys(req.body)
    const canUpdate = ["description", "completed"]
    const isValidator = updates.every((update)=> canUpdate.includes(update))

    if (!isValidator){
        res.status(400).send({Err: "Invalid Updates!!!"})
    }
    try{
        const tasks = await task.findById(_id)
        updates.forEach((update)=> tasks[update] = req.body[update])
        await tasks.save()
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