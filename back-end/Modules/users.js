const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    birthday:{
        type:String
    },
    gender:{
        type:Boolean
    },
    country:{
        type: String
    },
    avatar: {
        type: String
    },
    follower:{
        type:Number
    },
    isAdmin:{
        type:Boolean
    },
    resetPasswordToken:{
        type:String
    }
});

module.exports = mongoose.model("User", userSchema);