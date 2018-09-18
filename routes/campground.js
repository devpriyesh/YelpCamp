var express = require("express");
var route = express.Router();
var campground = require("../models/campground.js");
var middleware = require("../middleware/index.js");


route.get("/" , function(req,res) {
    res.render("home"); 
});
// INDEX - DISPLAY A LIST OF ALL CAMPGROUNDS
route.get("/campgrounds" , function(req,res) {
    
    campground.find({} , function(err,allcampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campground/campgrounds" , {campgrounds:allcampground}); 
        }
    });
   
});
// NEW - DISPLAYS FORM TO ADD NEW CAMPGROUND
route.get("/addnew" ,middleware.isLoggedIn, function(req,res) {
    res.render("campground/new");
});

// CREATE - ADD NEW CAMPGGROUND TO DB
route.post("/addcampground" ,middleware.isLoggedIn, function(req,res) {
    var name1 = req.body.name;
    var image1 = req.body.image ;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    
    var ncamp = {name:name1, image:image1 , description:desc , author:author}
    campground.create(ncamp , function(err,nc) {
        if(err) {
            console.log(err);
        } else {
            console.log(nc);
             res.redirect("/campgrounds");
        }
    });
   
});

// SHOW - displays the description of specific campground

route.get("/campgrounds/:id" , function(req,res) {
    
    campground.findById(req.params.id).populate("comments").exec(function(err , foundcampground) {
        if(err) {
            console.log(err); 
        } else { 
            res.render("campground/show" , {campground:foundcampground});
            console.log(foundcampground);
        } 
    })
    
});

//edit campground

route.get("/campgrounds/:id/edit" ,middleware.checkCampgroundOwnership, function(req,res) {
  
         campground.findById(req.params.id , function(err , foundcampground) {
                res.render("campground/edit" , {campground:foundcampground}); 
      }); 
});
//update campground
route.put("/campgrounds/:id" ,middleware.checkCampgroundOwnership, function(req,res) {
    //find and update
    campground.findByIdAndUpdate(req.params.id , req.body.campground , function(err , Updated) {
        if(err) {
            console.log(err);
        } else {
            // redirect somewhere
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
    
})

//destroy campground
route.delete("/campgrounds/:id" ,middleware.checkCampgroundOwnership, function(req,res) {
    campground.findByIdAndRemove(req.params.id , function(err,Camp){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds")
        }
    }); 
});





module.exports = route;