var mongoose = require("mongoose");
var campground = require("./models/campground.js");
var comment = require("./models/comment.js");

var data = [
        {
            name:"Horizon's Limit",
            image:"https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519__340.jpg",
            description:"lorem ipsum asd asd asd asd asdas "
        } , {
            name:"River Heat",
            image:"https://cdn.pixabay.com/photo/2013/11/28/10/03/autumn-219972__340.jpg",
            description:"lorem ipsum asd asd asd asd asdas "
        } , {
            name:"Sun's enemy",
            image:"https://cdn.pixabay.com/photo/2018/08/19/10/16/nature-3616194__340.jpg",
            description:"lorem ipsum asd asd asd asd asdas "
        }
    ];
    
    
function SeedDB (){
    campground.remove(function(err) {
        // if(err) {
        //     console.log(err);
        // } else {
        //     console.log("Removed !!");
        //   data.forEach(function(seed) {
        //       campground.create(seed , function(err , data) {
        //           if (err) {
        //               console.log(err);
        //           } else {
        //               console.log("CampGround created!!!");
        //               data.save();
        //               comment.create(
        //                   {
        //                   text:"This is the besT place ..but i wish there was an internet !!",
        //                   author:"Priyesh"
        //               } , function(err , comment) {
        //                   if(err) {
        //                       console.log(err);
        //                   } else {
        //                       data.comments.push(comment);
        //                       data.save();
        //                       console.log("comment added !!");
        //                   }
        //               })
        //           }
        //       });
        //   });
        // }
    });
}


module.exports = SeedDB ;