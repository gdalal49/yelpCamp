const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Scema Setup
const CommentSchema = new Schema({
    text: String,
    author: String
});

module.exports = mongoose.model('Comment', CommentSchema);