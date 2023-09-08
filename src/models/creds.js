const mongoose = require('mongoose')

const credsSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required: true,  
    },
    access_token:{
        type:String
    },
    refresh_token:{
        type:String
    },
    scope:{
        type:String
    },
    token_type:{
        type:String
    },
    expiry_date:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('Creds',credsSchema)