const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/",require("./routes/route"))

app.listen('3333',()=>{
    console.log("your server is listening on port 3333");
})

mongoose.connect(process.env.MONGOOSE_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("your mongoose server is ready to run")
})