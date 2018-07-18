const express = require("express")
const Product = require("../models/product")
const mongoose  = require("mongoose")
const bcrypt    = require("bcrypt")
const jwt       = require('jsonwebtoken');
const User      = require("../models/user")
const router =  express.Router()



router.get("/",function(req,res,next){
    User.find()
    .select("email password")
    .exec()
    .then(users =>{
        res.json(users)
    })
    .catch(err => {
        res.json(err)
    })
})

router.post("/",function(req,res,next){
    User.find({email:req.body.email})
        .exec()
        .then( user => {
            if(user.length >=1){
                console.log(user)
                return res.status(409).json({
                    message:"email_already_exists"
                })
            } else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        res.status(500).json({
                            message:"Error from creating hash for password"
                        })
                    } else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email:req.body.email,
                            password:hash
                        })
            
                        user.save()
                            .then( user =>{
                                res.status(201).json({
                                    message:"User successfully created",
                                    user:user
                                })
                            })
                            .catch( err =>{
                                res.status(400).json({
                                    message:"Saving the user in data base creating the error",
                                    err:err
                                })
                            })
                    }
                })

            }
        })
})


router.delete("/:id",(req,res,next)=>{
   

    User.findOneAndRemove({_id:req.params.id})
        .exec()
        .then(user => {
            res.json({
                message:"user is deleted"
            })
        .catch(err => {
            res.json({
                message:"Error in deleting the user"
            })
        })
    })
})

router.post("/login",function(req,res,next){

    User.findOne({email:req.body.email})
        .exec()
        .then(user => {
            if(user.length<1){
                return res.status(400).json({
                    message:"Auth failed"
                })
            }
            bcrypt.compare(req.body.password,user.password,function(err,result){
                if(err){
                    return res.status(400).json({
                        message:"Auth failed"
                    })
                }
                if(result){
                   const token = jwt.sign({
                        email:req.body.email,
                        password:user._id
                    },"qwertyuiop",{expiresIn:"1h"})
                    return res.status(200).json({
                        message:"Auth successfull",
                        token:token
                    })
                }
                res.status(500).json({
                    message:"Auth failed"
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                message:"error in finding the user"
            })
        })

})
module.exports = router;