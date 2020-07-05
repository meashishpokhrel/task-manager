const mongoose = require ("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtokens")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter Valid Email Address")
            }
        }
        
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0){
                throw new Error("Age cannot be Negative Number!")
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        lowercase:true,
        validate(value){
            if(value.includes("password")){
                throw new Error("You cannot give password as a password")
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},"authtoken")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) =>{
    
    const user = await User.findOne({ email })
    
    if(!user){
        throw new Error("Unable to Login!")
    }
    
    // const isMatch = await bcrypt.compare(password, user.password)
    
    // if (!isMatch){
    //     throw new Error("Invalid to Login!!")
    // }
    return user
}


userSchema.pre("save", async function (next) {
    const user= this
    
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})


const User = new mongoose.model("User",userSchema)

module.exports = User