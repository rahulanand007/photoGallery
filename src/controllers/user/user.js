const User = require('../../models/user')

const register_user =async(req,res)=>{
    try {
        const {name,email,password,role} = req.body
        const new_user =await User.create({
            name:name,
            email:email,
            password:password,
            role:role
        })

        return res.send(new_user)

    } catch (error) {
        res.send(error.message)
        console.log(error.message,"----")
    }
}

const login_user = async(req,res,next)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.send("Invalid Email or Password")
        }

        const user = await User.findOne({email}).select("+password")

        if(!user){
            return res.send("No user found with this email")
        }

        const isPasswordMatch = await user.comparePassword(password)

        if(!isPasswordMatch){
            return res.send("Invalid Email or Password")
        }

        let token = await user.getJwtToken()

        return res.send(token)
        
    } catch (error) {
        res.send(error.message)
        console.log(error.message,"----")
    }
}


module.exports = {
    register_user,
    login_user
}