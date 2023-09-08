const dotenv = require('dotenv')
dotenv.config({path:"./.env"})
const connectDatabase = require('./dbConfig/mongoDB')


connectDatabase()

const app = require('./app')


app.listen(process.env.PORT,()=>{
    console.log(`App listening on Port -`,process.env.PORT)
})