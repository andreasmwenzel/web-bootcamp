const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3000;
app.set("view engine", "ejs")

app.get("/", (req, res)=>res.render("home"));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//friends
let friends  = ["joe", "julie", "jeremy", "jessy"]

app.get("/friends", function(req, res){
    
    res.render("friends", {friends: friends})
})

app.post("/addfriend", function(req, res){
    friends.push(req.body.newfriend);
    res.redirect("/friends")
    
})

app.listen(port, () => console.log(`Post Request app listening at http://localhost:${port}`))