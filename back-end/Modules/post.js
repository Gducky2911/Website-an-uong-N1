const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image:{
        type:String
    },
    place: {
        type:String
    },
    content:{
        type:String
    },
    postDate:{
        type:String
    },
    updateDate:{
        type:String
    },
    userPost:{
        type:String
    },
    rating:{
        type:Number
    },
    reported:{
        type:Number
    },
    like:{
        type:Number
    }
})
module.exports = mongoose.model("Post", postSchema);