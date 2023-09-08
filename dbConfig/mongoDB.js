const mongoose = require("mongoose");

let URL = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.34aeo.mongodb.net/${process.env.MONGODB_DATABASE_NAME}`

const connectDatabase = ()=>{ 
    mongoose.connect(URL).then((data)=>{
    console.log("MongoDB connected successfully")
}).catch((error)=>{
    console.log(error)
})
}

module.exports = connectDatabase 