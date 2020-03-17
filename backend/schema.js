const mongoose = require('mongoose')
const mongooseSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:2
    },
    useremail:{
        type:String,
        required:true,
        min:2
    },
    password:{
        type:String,
        required:true,
        min:2
    }
})
const mongooseModel = mongoose.model("users",mongooseSchema)

module.exports = mongooseModel