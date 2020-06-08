const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    session = require("express-session"),
    User = require("./models/user"),
    path = require("path"),
    seedDB = require("./seeds"),
    app = express(),
    port = 3001;

const indexRoutes = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments")
        

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

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, () => console.log(`openDB app listening at http://localhost:${port}`))