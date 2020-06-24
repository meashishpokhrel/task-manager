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
    }
})

const task = new mongoose.model("task",{
    description:{
        type: String
    },
    completed:{
        type: Boolean
    }
})

const me = new User({
    name: "     Ashish Pokhrel",
    email: "ram@gmail.com   "
})

const newTask = new task ({
    description: "hello i am healthy",
    completed: true
})

me.save().then( (me)=>{
    console.log(me);
    
}).catch((err) => {
    console.log(err);
    
})

// newTask.save().then( (newTask)=>{
//     console.log(newTask)
    
// }).catch( (err)=>{
//     console.log(err);
    
// })