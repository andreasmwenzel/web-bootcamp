const express = require('express')
const app = express()
const port = 3000

app.use(express.static("public"))
app.set("view engine", "ejs")

//Hello
app.get('/', function(req, res){
    res.render("index")
})

app.get("/show/:thing", function(req, res){
    let thing = req.params.thing;
    let vars = {
        thing: thing
    }
    res.render("shows", vars)
})

app.get("/posts", function(req, res){
    let posts = [
        {title:"Post 1", author:"me" },
        {title:"Post 2", author:"you" },
        {title:"Post 3", author:"the other guy" },
    ]
    res.render("posts", {posts: posts})
})

app.get("*", function(req, res){
    res.send("Oops");
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))