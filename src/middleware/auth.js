const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticated = async(req,res,next)=>{
    let token = req.headers["authorization"];
    if(!token){
        return res.send("No token identified")
    }
    if(token.split(' ')[0] == "Bearer"){
        token = token.split(' ')[1]
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decodedData.id)

    next()
}

module.exports = {authenticated}