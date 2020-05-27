const express = require("express")
const bodyParser = require("body-parser")

const app = express();
const port = 3000;

let campgrounds = [
    {name: "Salmon Creek", image:"https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507440752b7bd09e4fc7_340.jpg"},
    {name: "Granite Hill", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440752b7bd09e4fc7_340.jpg"},
    {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440752b7bd09e4fc7_340.jpg"},
    {name: "Salmon Creek", image:"https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507440752b7bd09e4fc7_340.jpg"},
    {name: "Granite Hill", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440752b7bd09e4fc7_340.jpg"},
    {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440752b7bd09e4fc7_340.jpg"},
    {name: "Salmon Creek", image:"https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507440752b7bd09e4fc7_340.jpg"},
    {name: "Granite Hill", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440752b7bd09e4fc7_340.jpg"},
    {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440752b7bd09e4fc7_340.jpg"}
]



app.set("view engine", "pug")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

// **** ROUTES ****
app.get("/", (req, res)=>res.render("home"));

app.get("/campgrounds", (req, res) =>{
    res.render("campgrounds", {camps:campgrounds})
})

app.get("/campground", (req, res)=>{
    res.render("new")
})

app.get("/campgrounds/new", (req, res)=>{
    res.render("new")
})

app.post("/campgrounds", (req, res) =>{
    //get data from from and add to campground array
    campgrounds.push({
        name: req.body.name,
        image: req.body.img
    })
    //redirect to campground page
    res.redirect("/campgrounds")
})

app.listen(port, () => console.log(`openDB app listening at http://localhost:${port}`))