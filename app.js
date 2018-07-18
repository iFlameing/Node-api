const express = require("express")
const mongoose = require("mongoose")
const productRouter = require("./Api/routes/product")
const orderRouter  = require("./Api/routes/order")
const signUpRouter = require("./Api/routes/signUp")
const bodyParser = require("body-parser")
mongoose.connect("mongodb://iFlameing:"+process.env.MONGO_ATLAS_pw+"@node-shop-shard-00-00-vndx0.mongodb.net:27017,node-shop-shard-00-01-vndx0.mongodb.net:27017,node-shop-shard-00-02-vndx0.mongodb.net:27017/test?ssl=true&replicaSet=node-Shop-shard-0&authSource=admin&retryWrites=true")


const app = express();
app.use("/uploads",express.static("uploads"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/api/product",productRouter)
app.use("/api/order",orderRouter)
app.use("/api/signup",signUpRouter)


app.get("/",function(req,res,next){
    res.send("this is from app get method")
})

module.exports = app;