const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
mongoose = require("mongoose"),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

// Requiring Schemas
const Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user");

// Requiring Routes
const indexRoutes = require("./routes/index"),
    commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");

// ===================
// APP CONFIG
// ===================

// Database connection
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to DB!')).catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//Passport Configuration
app.use(require("express-session")({
    secret: "Best course on web devlopment by Colt Steele",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Adding CurrentUser to every template at once
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// Using the routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// ===================
// Server Starting
// ===================
app.listen(4000, () => {
    console.log("YelpCamp Server has started");
});