const mongoose = require('mongoose')

const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Your Name"],
        maxLength:[30,"Name Cannot Exceed 30 Characters"],
        minlength:[4,"Name Should Have more than 4 Characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minlength:[6,"Password Should be Greater than 6 Characters"],
        select:false
    },
    avatar_url:{
        type:String,
    },
    role:{
        type:String,
        default:"user",
    },
},{ timestamps: true }) 


userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})



//JWT TOKEN
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}


//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    let isMatch= await bcrypt.compare(enteredPassword, this.password);
     return  isMatch        
}




module.exports = mongoose.model('User',userSchema)