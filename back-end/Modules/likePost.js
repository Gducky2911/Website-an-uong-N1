const mongoose = require("mongoose");

var likepostSchema = new mongoose.Schema({
    id_user:{
        type:String
    },
    id_post:{
        type:String
    }
})
module.exports = mongoose.model("Like", likepostSchema);