var express = require("express");
var route = express.Router();
var User = require("../models/user.js");
var passport= require("passport");



//signup
route.get("/register" , function(req,res) {
    res.render("register");
});



route.post("/register" , function(req,res) {
    User.register(new User({username:req.body.username}) , req.body.password, function(err , data) {
        if(err){
            console.log(err);
            return res.redirect("/register");
        } 
        passport.authenticate("local")(req,res,function() {
            res.redirect("/campgrounds");
        });
    });
});

//login
route.get("/login" , function(req,res) {
    res.render("login");
});

route.post("/login" , passport.authenticate("local" , 
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }) , function(req,res){
});

//logout

route.get("/logout" , function(req,res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
     res.redirect("/login")
}

module.exports = route;