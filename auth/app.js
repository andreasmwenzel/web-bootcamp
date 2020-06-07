const   express = require("express"),
        mongoose = require("mongoose"),
        bodyParser = require("body-parser"),
        passport = require("passport"),
        expressSession = require("express-session"),
        localStrategy = require("passport-local"),
        localMongoose = require("passport-local-mongoose");
        User = require("./models/user")


const   app = express(),
        port = 3000;
mongoose.connect("mongodb://localhost/auth", { useNewUrlParser: true, useUnifiedTopology: true })

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended:true}))
app.use(require("express-session")({
    secret: "this is a really cool string for a secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================================================
//                    ROUTES
//==================================================

app.get("/", (req, res) =>{
    res.render("index")
})

app.get("/secret", isLoggedIn, (req, res)=>{
    res.render("secret")
})

//Auth Routes
app.get("/register", (req, res)=>{
    //show signup form
    res.render("register");
})
app.post("/register", (req, res)=>{
    //handle registration
    User.register(new User({username:req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.redirect("/register")
        } else{
            passport.authenticate("local")(req, res, function(){
                res.redirect('/secret')
            })
        }
    })
})

app.get("/login", (req, res)=>{
    res.render("login")
})

app.post("/login", passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res)=>{
})

app.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(port, () => console.log(`openDB app listening at http://localhost:${port}`))