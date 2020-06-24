const mongoose = require ("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const User = new mongoose.model("User",{
    name:{
        type: String
    },
    age: {
        type: Number
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
    name: "Ashish Pokhrel",
    age: 21
})

const newTask = new task ({
    description: "hello i am healthy",
    completed: true
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