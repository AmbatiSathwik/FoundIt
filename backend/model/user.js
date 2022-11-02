const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    sid:{
        type: String,
        require: true,
        unique: true
    },
    firstname:{
        type: String,
        default: null
    },
    lastname:{
        type: String,
        default: null
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    roll:{
        type: String,
        require: true,
        unique: true
    },
    dob:{
        type: Date,
        default: null
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    phone:{
        type: String,
        default: null
    },
    password:{
        type: String,
        require: true
    },
    jwttoken:{
        type: String
    }
})

module.exports = mongoose.model('user', userSchema)