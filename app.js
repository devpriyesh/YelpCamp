var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    methodOverride        = require("method-override"),
    LocalStrategy         = require("passport-local"),
    passportMongooseLocal = require("passport-local-mongoose");

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
// mongoose.connect("mongodb://localhost/yelp-camp001");
mongoose.connect("mongodb://priyesh:password123@ds161322.mlab.com:61322/yelpcamp_priyesh");
app.use(methodOverride("_method"));

var campground = require("./models/campground.js"),
    SeedDB = require("./seed.js"),
    comment = require("./models/comment.js"),
    User = require("./models/user.js");

var CommentRoute = require("./routes/comment"),
    CampgroundRoute = require("./routes/campground"),
    AuthRoute = require("./routes/auth");



// SeedDB();

//===================
// passport config
//===================

app.use(require("express-session") ({
    secret:"priyesh is the best coder",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use(function( req, res, next) {
    res.locals.currentUser = req.user ;
    next();
});

app.use("/campgrounds/:id/comment" , CommentRoute);
app.use(CampgroundRoute);
app.use(AuthRoute);



app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Server Started !"); 
});
