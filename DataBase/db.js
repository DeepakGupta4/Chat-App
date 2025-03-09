const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/chatApp").then((response)=>{
    console.log("DB Connected Successfully")
}).catch(err=>{
    console.log(err)
})