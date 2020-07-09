const express = require ("express")
const User = require("../models/users")
const router = new express.Router()
const auth = require ("../middleware/auth")


router.post("/users", async (req,res) => {
    const user = new User(req.body)
    
    try{
        await user.save()
        const token = await user.generateToken()
        res.status(201).send({user, token}) 
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.post("/users/login", async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(201).send({user, token})
    }
    catch(err){
    //    res.status(400).send()
    res.status(400).send({Err: "Unable to login!"})
      
    }
})

router.post("/users/logout", auth, async (req,res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch(err){
        res.status(400).send()
    }
})

router.post("/users/logoutAll", auth, async(req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(err){
        res.status(400).send()
    }

})

router.get("/users/me", auth, async (req,res) => {
        res.send(req.user)    
})

router.get("/users/:id", async (req,res) => {
    const _id=req.params.id

    try{
        const user = await User.findById({_id})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(err){
        res.status(500).send()
    }
})

router.patch("/users/:id", async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)       //Converts into a array
    const canUpdate = ["name", "email", "password", "age"]
    const isValidator = updates.every((update)=> canUpdate.includes(update))

    if(!isValidator){
        return res.status(400).send({Err: "Invalid Updates!!!"})
    }
    try{
        const user = await User.findById(_id)
        updates.forEach((update)=>user[update] = req.body[update])
        await user.save()
        
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

