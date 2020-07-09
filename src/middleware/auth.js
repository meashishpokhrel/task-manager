const User = require ("../models/users")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) =>{
    
    try{
        const token = req.header("Authorization").replace("Bearer ","")
        const decoded = jwt.verify(token, "authtoken")
        const user = await User.findOne({ _id: decoded._id, "tokens.token":token})

        if (!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        
        next()
    }
    catch(err){
        res.status(400).send({Err: "Please authenticate!"})
    }
        

}
module.exports = auth