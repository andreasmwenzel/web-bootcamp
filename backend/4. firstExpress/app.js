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

app.listen(3000, function(){
    console.log("app.js listening on port 3000")
})