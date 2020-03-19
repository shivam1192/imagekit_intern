const mongoose = require('mongoose')
const mongooseSchema = new mongoose.Schema({
    ip:{
        type:String,
        required:true,
        min:2
    },
    count:{
        type:Number,
        required:true,
        min:0
    },
    date:{
        type:String,
        required:true,
    }
})
const mongooseModelip = mongoose.model("ipstore",mongooseSchema)



module.exports = mongooseModelip