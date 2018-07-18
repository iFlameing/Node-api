const express = require("express")
var router    = express.Router()


router.get("/",(req,res,next)=>{
res.status(200).json({
    message:"It is from order get method"
})
})
router.post("/",(req,res,next)=>{
    res.status(200).json({
        message:"It is from order Post method"
    })   
})
router.get("/:id",(req,res,next)=>{
    res.status(200).json({
        message:"It is from order order Id   method"
    })   
})
router.delete("/",(req,res,next)=>{
    res.status(200).json({
        message:"It is from order delete method"
    })  
})

module.exports = router;
