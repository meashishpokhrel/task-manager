const mongoose = require ("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const { delete } = require("../routers/tasks")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter Valid Email Address")
            }
        }
        
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("You cannot give password as a password")
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
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.virtual("tasks",{
    ref: "task",
    localField: "_id",
    foreignField: "owner"
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
    
}

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},"authtoken")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// Model methods
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    // console.log(user.password);
    // console.log(password);
    // text = await bcrypt.hash("password", 8)
    // console.log(text);
    
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login.')
    }

    return user
    
}


userSchema.pre("save", async function (next) {
    const user = this

    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const User = mongoose.model("User",userSchema)

module.exports = User