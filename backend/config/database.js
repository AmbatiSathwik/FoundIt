const mongoose = require('mongoose')
const {MONGO_URL} = process.env

exports.connect = ()=>{
    mongoose.connect(MONGO_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(()=>{
        console.log("Database connected successfull");
    })
    .catch((e)=>{
        console.log(e);
        process.exit(1);
    });
}

