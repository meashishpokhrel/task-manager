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

const me = new User({
    name: "Ashish Pokhrel",
    age: 21
})

me.save().then( (me)=>{
    console.log(me);
    
}).catch((err) => {
    console.log(err);
    
})