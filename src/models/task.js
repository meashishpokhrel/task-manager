const mongoose = require ("mongoose")

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

module.exports = task