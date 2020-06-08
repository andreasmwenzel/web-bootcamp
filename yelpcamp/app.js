const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    session = require("express-session"),
    Campground = require("./models/campground")
Comment = require("./models/comment"),
    User = require("./models/user"),
    path = require("path"),
    seedDB = require("./seeds"),
    app = express(),
    port = 3000;


mongoose.connect(
    "mongodb://localhost:27017/yelp_camp",
    { useNewUrlParser: true, useUnifiedTopology: true }
)

seedDB();

//USE PUG
app.set("view engine", "pug")
//HOST PUBLIC DIR
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
//SETUP EXPRESS-SESSION
app.use(session({
    secret: "this can be anything we want",
    resave: false,
    saveUninitialized: false
}));
//SETUP PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//***** Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

// **** ROUTES ****
app.get("/", (req, res) => res.render("home"));

app.get("/campgrounds", (req, res) => {
    console.log(req.user);
    //get campgrounds from db
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", { camps: campgrounds})
        }
    })
})
//register show route
app.get("/register", (req, res) => {
    res.render("register")
})
//handle signup logic
app.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds")
        })
    })
})
//login show route
app.get("/login", (req, res) => {
    res.render("login");
})
//login login
app.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), (req, res) => {
    res.redirect("/campgrounds");
})
//logout
app.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/campgrounds");
})

app.get("/campground", (req, res) => {
    res.redirect("campgrounds")
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            if (campground === null) {
                res.redirect("/campgrounds")
            } else {
                res.render("comments/new", { campground: campground });
            }
        }
    })

})

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err || campground === null) {
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

app.listen(port, () => console.log(`openDB app listening at http://localhost:${port}`))