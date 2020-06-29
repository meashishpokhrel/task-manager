const express = require ("express")
const router = express.Router()
const User = require("../models/users")

router.post("/users", async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user) 
    }
    catch(err){
        res.status(400).send()
    }
})

router.get("/users", async (req,res) => {

    try{
        const users =await User.find({})
        res.send(users)
    }
    catch(err){
        res.status(500).send()
    }
})

router.get("/users/:id", async (req,res) => {
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

router.patch("/users/:id", async(req,res)=>{
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

router.delete("/users/:id", async (req,res) =>{
    
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

module.exports = router