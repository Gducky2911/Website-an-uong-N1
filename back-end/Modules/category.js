const { json } = require("express");
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    number:{
        type: Number
    }
})
module.exports = mongoose.model("Category", categorySchema);
