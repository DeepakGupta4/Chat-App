const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGO_DB_URI).then((response)=>{
    console.log("DB Connected Successfully")
}).catch(err=>{
    console.log(err)
})