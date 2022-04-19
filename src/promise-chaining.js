require("./db/mongoose")
const User = require("./models/users")

const findandCount = async (id, age) =>{
    const updateage =await  User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age: 0})
    return count
    return updateage
}

findandCount("5ef35613916ce62e84904af4", 3 ).then((count)=>{
    console.log(count)
    
}).catch((err)=>{
    console.log(err)
})