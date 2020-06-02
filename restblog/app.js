const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    app = express(),
    port = 3000;

mongoose.connect(
    "mongodb://localhost:27017/restful_blog",
    { useNewUrlParser: true, useUnifiedTopology: true }
)

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(expressSanitizer());

//SCHEMA SETUP
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Jetski",
//     image: "https://images.unsplash.com/photo-1591025281419-578e85271775?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1609&q=80",
//     body: "Being on the water is so much fun"
// })

// **** ROUTES ****
app.get("/", (req, res) => res.redirect("/blogs"));
app.get("/blogs", (req, res) => {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err)
        } else {
            res.render("index", { blogs: blogs })
        }
    })
})
app.get("/blogs/new", (req, res) => {
    res.render("new")
})
app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    //save blog post to database
    Blog.create(req.body.blog, (err, blog) => {
        (err) ? res.render("new") :  res.redirect("/blogs/"+blog.id);
    })
    //res.redirect("/blogs");
})

app.get("/blogs/:id", (req, res)=>{
    Blog.findById(req.params.id, (err, blog)=>{
        (err) ? res.redirect("/") : res.render("show", {blog:blog})
    })
})

app.get("/blogs/:id/edit", (req, res)=>{
    Blog.findById(req.params.id, (err, blog)=>{
        (err) ? res.redirect("/") : res.render("edit", {blog:blog})
    })
})

app.put("/blogs/:id", (req, res)=>{
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog)=>{
        (err) ? res.send("error") : res.redirect("/blogs/"+req.params.id)
    })
})

app.delete("/blogs/:id", (req, res)=>{
    Blog.findByIdAndRemove(req.params.id, (err, blog)=>{
        (err) ? res.send("error") : res.redirect("/blogs");
    })
    // res.send("this is the delete route");
})

app.listen(port, () => console.log(`restblog app listening at http://localhost:${port}`))
