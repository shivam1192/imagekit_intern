const express = require('express')
const MongooseModel = require('../schema')
const Joi = require('@hapi/joi')
const Route = express.Router()
const bcrypt = require('bcrypt')
const MongooseModelip = require('../schemaip')

const schemaobject = Joi.object({
    username:Joi.string().required().min(2),
    useremail:Joi.string().required().min(2).email(),
    password:Joi.string().required().min(2),
})

Route.post("/",async(req,res)=>{
    const {username,useremail,password} = req.body
    const validate = schemaobject.validate(req.body)
    if(validate.error){
        res.send(validate.error.details[0].message)
        // res.send("error occur")
    }
    else{
        const email_duplicate = await MongooseModel.findOne({useremail:useremail});
        if(email_duplicate){
            res.send("email already exist")
                }
        else{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt);
            
            const new_user = new MongooseModel({
                username,
                useremail,
                password:hash,
            })
            try{
                   const savepost = await new_user.save();
                   res.send(savepost._id)
            }catch(error){
                console.log("hello")
            }
        }   
    }
})

Route.post('/submit',async(req,res)=>{
     let {ip,count,date} = req.body
     const gotip = await MongooseModelip.findOne({ip:ip});
     if(gotip&&(gotip.date==date)){
        const set= await MongooseModelip.updateOne({_id:gotip._id},{$set : {count: gotip.count+1}})
        try{
            res.send(gotip)
        }catch(error){
         console.log(error)
     }
    }
     else if(gotip&&!(gotip.date==date)){
        const set= await MongooseModelip.updateOne({_id:gotip._id},{$set : {count: 0}})
        const seto= await MongooseModelip.updateOne({_id:gotip._id},{$set : {date: date}})

        const updateip = await MongooseModelip.findOne({ip:ip})
        try{
            res.send(updateip)
        }catch(error){
         console.log(error)
     }
     }
     else{
        const newip = new MongooseModelip({
            ip,
            count:0,
            date,
        })
        try{
            const saveip = await newip.save();
            res.send(saveip)
     }catch(error){
         console.log(error)
     }
     }
})

Route.post("/count",async(req,res)=>{
    const {ip} = req.body
    const gotip = await MongooseModelip.findOne({ip:ip});
    if(gotip){
        res.send(gotip)
    }else{
        res.json({count:0})
    }
})

module.exports = Route