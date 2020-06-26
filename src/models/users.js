const mongoose = require ("mongoose")
const validator = require("validator")

const User = new mongoose.model("User",{
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
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

module.exports = User