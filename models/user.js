var mongoose = require("mongoose");
var LocalMongoose= require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username:String,
    password:String
});

userSchema.plugin(LocalMongoose);

var User = mongoose.model("User" ,  userSchema);
module.exports = User;