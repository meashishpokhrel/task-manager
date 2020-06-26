const express = require ("express")
require("./db/mongoose")
const User = require("./models/users")
const app = express()

const port = process.env.port || 3000
app.use (express.json())

app.post("/users", (req,res) => {
    const user = new User(req.body)
    
    user.save().then((user) => {
        res.send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.listen(port,  () => {
    console.log("Server Started on " + port)
    
})