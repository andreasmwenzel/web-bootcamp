const express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground")


router.get("/", (req, res) => {
    //get campgrounds from db
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", { camps: campgrounds })
        }
    })
})


router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new")
})

router.post("/", isLoggedIn, (req, res) => {
    //get data from from and add to campground array
    let newCampground = {
        name: req.body.name,
        image: req.body.img,
        description: req.body.desc,
        createdBy:{
            id: req.user._id,
            username: req.user.username
        }
    }
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            console.log(campground);
            //redirect to campground page
            res.redirect("/campgrounds")
        }
    })

})

router.get("/:id", (req, res) => {
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err || campground === null) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", { campground: campground });
        }
    });
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;