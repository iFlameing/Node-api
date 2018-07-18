const jwt = require("jsonwebtoken")

module.exports = (req,res,next)=>{
    const  token = req.headers.authorization.split(' ')[1]

    console.log(token)
    try {
    const decoded = jwt.verify(token,"qwertyuiop")
        console.log(decoded)
        req.userdecoded = decoded
        next();
        
    } catch (error) {
        res.status(400).json({
            message:"Auth failed"
        })
    }

// console.log(req.body.token)
// const decoded = jwt.verify(req.body.token,"qwertyuiop")
//     next();
}