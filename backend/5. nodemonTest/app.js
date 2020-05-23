var express = require("express");

var app = express();


// "/" => "Hello There"
app.get("/",function(req, res){
    res.send("Hello There");
})

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
})

// "/dog" => "Meow"
app.get("/dog", function(req, res){
    res.send("MEOW");
})

app.get("/r/:subredditName", function(req, res){
    console.log(req.params);
    res.send("Welcome to a subreddit")
})

app.get("/r/:subredditName/comments/*/*/:title", function(req, res){
    console.log(req.params)
    res.send("Welcome to a comments page")
})

app.get("*", function(req, res){
    console.log(req);
    res.send("You are a star");
})

app.listen(3000, function(){
    console.log("app.js listening on port 3000")
})
