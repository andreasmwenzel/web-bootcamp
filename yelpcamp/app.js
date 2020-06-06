const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground")
    Comment = require("./models/comment")
path = require("path")
seedDB = require("./seeds")
app = express(),
    port = 3000;

seedDB();
mongoose.connect(
    "mongodb://localhost:27017/yelp_camp",
    { useNewUrlParser: true, useUnifiedTopology: true }
)

app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

// Campground.create(
//     {
//         name: "Beach",
//         image: "https://i.imgur.com/MI6dLSM.jpg",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum delectus nobis temporibus minus, reprehenderit itaque mollitia ratione ullam porro veniam?"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("new campground:");
//             console.log(campground);
//         }
//     }
// )

// **** ROUTES ****
app.get("/", (req, res) => res.render("home"));

app.get("/campgrounds", (req, res) => {
    //get campgrounds from db
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", { camps: campgrounds })
        }
    })
})

app.get("/campground", (req, res) => {
    res.render("campgrounds/new")
})

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
})

app.post("/campgrounds", (req, res) => {
    //get data from from and add to campground array
    var newCampground = {
        name: req.body.name,
        image: req.body.img,
        description: req.body.desc
    }
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            //redirect to campground page
            res.redirect("/campgrounds")
        }
    })

})

app.get("/campgrounds/:id", (req, res) => {
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

//==========================
// COMMENTS ROUTES
//==========================
app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            if(campground === null){
                res.redirect("/campgrounds")
            } else{
                res.render("comments/new", { campground: campground });
            }
        }
    })

})

app.post("/campgrounds/:id/comments", (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
        if(err || campground === null){
            res.redirect("/campgrounds")
        } else{
            Comment.create(req.body.comment, (err, comment) =>{
                if(err){
                    console.log(err)
                } else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

app.listen(port, () => console.log(`openDB app listening at http://localhost:${port}`))