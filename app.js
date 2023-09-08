const express = require('express');
const app = express()
const cors = require("cors");
const google_route= require('./src/routes/google_drive')
const user_route = require('./src/routes/user')
const google_creds_middleware = require('./src/middleware/google_middleware')
const bodyParser = require('body-parser');
const { authenticated } = require('./src/middleware/auth');




app.use(cors())
app.options("*", cors());
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.send("Backend Photo Gallery App")
})

app.use('/google',authenticated,google_creds_middleware,google_route)
app.use('/user',user_route)



module.exports= app