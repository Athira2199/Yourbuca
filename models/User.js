const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email : String,
    name  : String,
    phoneNumber : Number,
    date : String,
    password : String
});

module.exports = mongoose.model("User", UserSchema);