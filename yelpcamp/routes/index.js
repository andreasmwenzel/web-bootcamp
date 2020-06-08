const express = require("express");
const router = express.Router();
const passport = require("passport")
const User = require("../models/user")

// **** ROUTES ****
router.get("/", (req, res) => res.render("home"));

//register show route
router.get("/register", (req, res) => {
    res.render("register")
})
//handle signup logic
router.post("/register", (req, res) => {
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
router.get("/login", (req, res) => {
    res.render("login");
})
//login
router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/campgrounds");
})
//logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
})

//***** Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;