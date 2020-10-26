const express = require("express"),
    passport = require('passport'),
    router = express.Router();

const User = require("../models/user");

//Index(landing) Route
router.get("/", function (req, res) {
    res.render("landing");
});

//register form
router.get("/register", function (req, res) {
    res.render("register")
});

//register logic
router.post("/register", function (req, res) {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds")
        })
    });
});

//Log-in - Form
router.get("/login", function (req, res) {
    res.render("login");
});

//Log-in - Logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) { }
);

//Log-Out
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;

