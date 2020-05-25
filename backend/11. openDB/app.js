//openDB api key = &apikey=thewdb //never do this in practice

const express = require("express")
const axios = require("axios")
const app = express();
const port = 3000;

app.set("view engine", "ejs")

// **** ROUTES ****
app.get("/", (req, res)=>res.render("search"));

app.get("/search", (req, res)=>res.render("search"));

app.get("/results", (req, res) => {
    const s = req.query.s
    let toSend;
    axios.get(`http://www.omdbapi.com/?s=${s}&apikey=thewdb`)
    .then((response) => {
        toSend = response.data.Search;
        console.log("got data");
        res.render("results", {data: toSend});
    })
    .catch((error) => {
        toSend = error;
        // handle error
        console.log(error);
    })
    .finally( () => {
        console.log("axios finished")
        // always execute
  });
})


app.listen(port, () => console.log(`openDB app listening at http://localhost:${port}`))