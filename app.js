const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to DB!')).catch(error => console.log(error.message));

//Scema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);
// Campground.create(
//     {
//         name: "Mt Abu", 
//         image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
//         description: "This is located in mout Abu, 100KMs away from udaipur. It has a beutiful sunset point."
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Newly Created Campground");
//         }

//     }
// );
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX Route
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: allCampgrounds});

        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

//CREATE - add new campground to db
app.post("/campgrounds", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampGround = {name: name, image: image, description: description};
    Campground.create(newCampGround, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
});

//SHOW -Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("show", {campground: foundCampground});
        }

    });
});

app.listen(4000, function(){
    console.log("YelpCamp Server has started");
});