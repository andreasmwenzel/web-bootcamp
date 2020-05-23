const express = require("express")

const app = express()
const port = 3000;
app.set("view enginge", "ejs")

app.get("/", (req, res)=>res.render("home"));


app.listen(port, () => console.log(`Post Request app listening at http://localhost:${port}`))