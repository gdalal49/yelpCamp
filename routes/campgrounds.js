const express = require("express"),
    router = express.Router();

const Campground = require("../models/campground");

// ======================
// Campground Routes
// ======================

//INDEX Route
router.get("/", function (req, res) {
    //Get All Campgrounds from Database
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//CREATE - add new campground to db
router.post("/", isLoggedIn, function (req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampGround = { name: name, image: image, description: description, author: author };
    Campground.create(newCampGround, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//SHOW -Shows more info about one campground
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //console.log(foundCampground);
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

//EDIT - Campgrounds - GET
router.get("/:id/edit", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            res.render("campgrounds/edit", { campground: foundCampground });
        }
    });
});
//UPDATE - Campgrounds - PUT
router.put("/:id", isLoggedIn, function (req, res) {
    //Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            //Redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//DESTROY - CAMPGROUND ROUTE
router.delete("/:id", isLoggedIn, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

//Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;