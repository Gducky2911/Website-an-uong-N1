const { json } = require("express");
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const { schema } = require("./users");


var placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: JSON,
        required: true
    },
    categories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    }],
    image:{
        type:[]
    },
    rating:{
        type:Number
    },
    sum_rating:{
        type:Number
    },
    status:{
        type:Boolean
    },
    id_user:{
        type:String
    }
})
module.exports = mongoose.model("Place", placeSchema);