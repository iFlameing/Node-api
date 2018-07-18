const express = require("express")
const Product = require("../models/product")
const mongoose  = require("mongoose")
const multer = require("multer")
const checkauth = require("../middleware/middleware")
var router    = express.Router()


const storage = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,"./uploads/")
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString() +file.originalname);
    }
})

const fileFilter = (req,file,cb)=>{
    //Rejecting the image file based on the format//
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null,true)
    } else{
        cb(null,false)
    }
}

const upload = multer({
    // dest:'uploads/'
    storage:storage,
    limit:{
    fileSize : 1024*1024*5
    },
    fileFilter:fileFilter

})
router.get("/",(req,res,next)=>{
    Product.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err =>{
        res.status(500).json({
            message:"Error in finding the All Product"
        })
    })


})
router.post("/",checkauth,upload.single("productImg"),(req,res,next)=>{
    let product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImg:req.file.path
    })

    product.save(function(err,data){
        res.status(200).json({
            message:data
        })   
    })
    
})
router.get("/:id",(req,res,next)=>{
    let id = req.params.id
    console.log(id)
    Product.findById(id)
    .exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err => {
        res.status(500).json({
            message:"This is error from get request of id"
        })
    })

})

router.patch("/:id",(req,res,next)=>{
    const id = req.params.id 
    const updateObj = {}
    for (key in req.body){
        updateObj[key] = req.body[key]
    }
    console.log(updateObj)
     Product.update({_id: id},{ $set:updateObj})
     .exec()
     .then( docs => {
        res.status(200).json(docs)   
     })
     .catch(err =>{
         res.status(500).json({
             message:"Error from updating the Product data"
         })
     })
})

router.delete("/:id",(req,res,next)=>{
    const id = req.params.id
    console.log(id)
    Product.findOneAndRemove({_id: id})
        .exec()
        .then(docs=>{
            res.status(200).json(docs)
        })
        .catch(err =>{
            res.status(200).json(err)
        })


})

module.exports = router;
