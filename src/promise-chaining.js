require("./db/mongoose")
const User = require("./models/users")

User.findByIdAndUpdate("5ef35613916ce62e84904af4", {age: 5}).then((users) =>{
    console.log(users)
    return User.countDocuments({age: 5})
}).then((count) => {
    console.log(count)
})