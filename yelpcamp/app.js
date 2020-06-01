const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      app = express(),
      port = 3000;

mongoose.connect(
    "mongodb://localhost:27017/yelp_camp",
    { useNewUrlParser: true, useUnifiedTopology: true }
)

app.set("view engine", "pug")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

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
app.get("/", (req, res)=>res.render("home"));

app.get("/campgrounds", (req, res) =>{
    //get campgrounds from db
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err)
        } else{
            res.render("index", {camps:campgrounds})
        }
    })
})

app.get("/campground", (req, res)=>{
    res.render("new")
})

app.get("/campgrounds/new", (req, res)=>{
    res.render("new")
})

app.post("/campgrounds", (req, res) =>{
    //get data from from and add to campground array
    var newCampground = {
        name: req.body.name, 
        image: req.body.img,
        description: req.body.desc
    }
    Campground.create(newCampground, function(err, campground){
        if(err){ 
            console.log(err)
        } else{
            //redirect to campground page
            res.redirect("/campgrounds")
        }
    })
    
})

app.get("/campgrounds/:id", (req, res)=>{
    //find campground with provided ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            console.log(campground);
            res.render("show", {campground : campground});
        }
    });
})

app.listen(port, () => console.log(`openDB app listening at http://localhost:${port}`))
