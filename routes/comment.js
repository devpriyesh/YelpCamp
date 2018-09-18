var express = require("express");
var route = express.Router({mergeParams : true});
var campground = require("../models/campground.js");
var comment = require("../models/comment.js");
var middleware = require("../middleware/index.js");

 // ============================== NEW Comments ============================
route.get("/new" ,middleware.isLoggedIn, function(req,res) {
    campground.findById(req.params.id , function(err,campground) {
        if(err) {
        console.log(err);
        } else {
        res.render("comment/new" , {campground:campground});    
        }
    });
});


//=================================Post Comments ==============================
route.post("/" ,middleware.isLoggedIn, function(req,res) {
    // res.send("post routes");
    campground.findById(req.params.id , function(err , camp) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds/" + camp._id);
        } else  {
            comment.create(req.body.comment , function(err , com) {
                if(err) {
                    console.log(err);
                    res.redirect("/campgrounds/" + camp._id);
                } else {
                    com.author.username  =req.user.username;
                    com.author.id       =req.user._id;
                    com.save();
                    camp.comments.push(com);
                    camp.save();
                    res.redirect("/campgrounds/" + camp._id);
                }
            });
        }
    });
});

// comment edit
route.get("/:comment_id/edit" ,middleware.checkCommentOwnership , function(req,res) {
   comment.findById(req.params.comment_id , function(err , foundComment) {
       if(err) {
           console.log(err);
       } else {
           res.render("comment/edit" , {campground_id:req.params.id , comment:foundComment});
       }
   });
});

//comment update
route.put("/:comment_id" ,middleware.checkCommentOwnership , function(req,res) {
    comment.findByIdAndUpdate(req.params.comment_id ,req.body.comment , function(err , updatedComments) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
     });
});

//destroy comment route
route.delete("/:comment_id"  ,middleware.checkCommentOwnership , function(req,res) {
    comment.findByIdAndRemove(req.params.comment_id , function(err){
        if(err) {
            console.log(err);
        } else {
             res.redirect("/campgrounds/" + req.params.id);
        }
    });
});





module.exports = route;