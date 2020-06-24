const mongoose = require ("mongoose")
const validator = require("validator")

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

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

const task = new mongoose.model("task",{
    description:{
        type: String,
        trim: true,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    }
})

const me = new User({
    name: "     Ashish Pokhrel",
    email: "ram@gmail.com   ",
    password: " Ram123456ram"
})

const newTask = new task ({
    description: "hello i am healthy"
})

// me.save().then( (me)=>{
//     console.log(me);
    
// }).catch((err) => {
//     console.log(err);
    
// })

newTask.save().then( (newTask)=>{
    console.log(newTask)
    
}).catch( (err)=>{
    console.log(err);
    
})