const mongoose = require("mongoose");

var followSchema = new mongoose.Schema({
    id_user:{
        type:String
    },
    id_follower:{
        type:String
    }
})
module.exports = mongoose.model("Follow", followSchema);