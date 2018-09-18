var campground = require("../models/campground");
var comment = require("../models/comment");

var middlewareobj = {};

middlewareobj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()) {
         campground.findById(req.params.id , function(err , foundcampground) {
        if(err) {
             res.redirect("back");
        } else { 
            //check wheather one is author or not
            if(foundcampground.author.id.equals(req.user._id)) {
                next();
            } else {
               res.redirect("back");
              }
           }
      }); 
        
    } else {
        res.redirect("back");
    }
};

middlewareobj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()) {
         comment.findById(req.params.comment_id , function(err , foundcomment) {
        if(err) {
             res.redirect("back");
        } else { 
            //check wheather one is author or not
            if(foundcomment.author.id.equals(req.user._id)) {
                next();
            } else {
               res.redirect("back");
              }
           }
      }); 
        
    } else {
        res.redirect("back");
    }
}


middlewareobj.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
     res.redirect("/login")
}

module.exports = middlewareobj;