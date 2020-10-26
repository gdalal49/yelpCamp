const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");


//Scema Setup
const UserSchema = new mongoose.Schema({
    text: String,
    author: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);