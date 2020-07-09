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


router.patch("/users/me", auth, async(req,res)=>{
    // const _id = req.params.id
    const updates = Object.keys(req.body)       //Converts into a array
    const canUpdate = ["name", "email", "password", "age"]
    const isValidator = updates.every((update)=> canUpdate.includes(update))

    if(!isValidator){
        return res.status(400).send({Err: "Invalid Updates!!!"})
    }
    try{
        updates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }
    catch(err){
        res.status(500).send()
    }
})

router.delete("/users/me",auth, async (req,res) =>{
    
    try{
        await req.user.remove()
        res.send(req.user)
        
    }
    catch(err){
        res.status(400).send()
    }


})

module.exports = router

