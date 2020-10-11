const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

var campgrounds = [
    {name: "Mt Abu", image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Manali Heights", image: "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Shilong Valley", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Shilma Trails", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507749772c78d09745c3_340.jpg"},
    {name: "Himalayan Camp", image: "https://images.pexels.com/photos/2603681/pexels-photo-2603681.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "River Sides", image: "https://pixabay.com/get/53e4d1424b56a814f1dc84609620367d1c3ed9e04e507749772c78d09745c3_340.jpg"},
    {name: "Rafters Camp", image: "https://images.pexels.com/photos/1840394/pexels-photo-1840394.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Mount Abu Trails", image: "https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Himalayan Wild Camp", image: "https://images.pexels.com/photos/2609954/pexels-photo-2609954.jpeg?auto=compress&cs=tinysrgb&h=350"}
];

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.post("/campgrounds", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let newCampGround = {name: name, image: image};
    campgrounds.push(newCampGround);
    res.redirect("/campgrounds");
});

app.listen(4000, function(){
    console.log("YelpCamp Server has started");
});