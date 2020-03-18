const express = require('express')
const MongooseModel = require('../schema')
const Joi = require('@hapi/joi')
const Route = express.Router()
const bcrypt = require('bcrypt')

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

module.exports = Route