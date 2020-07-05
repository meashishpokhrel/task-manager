const mongoose = require ("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

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
    }
})



userSchema.statics.findByCredentials = async (email, password) =>{
    
    const user = await User.findOne({ email })
    
    if(!user){
        throw new Error("Unable to Login!")
    }
    // text = user.password
    // console.log(text);
    // console.log(password)
    
    // password2 = await bcrypt.hash(password,8)
    // const isMatch = await bcrypt.compare(password2, user.password)
    
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