const express = require('express')
const app = express()
const port = 3000

//Hello
app.get('/', (req, res) => res.send('Hello World!'))

// /speak/pig => oink,  /speak/dog => woof /speak/cow => moo
app.get('/speak/:animal', function(req, res){
    let animal = req.params.animal;
    let output = "The " + animal + " says: "
    if(animal === "pig"){
        output += "oink"
    }
    else if(animal === "dog"){
        output += "woof"
    }
    else if(animal === "cow"){
        output += "moo"
    }
    else{
        output = "I'm afraid I don't know that animal"
    }
    res.send(output)
    console.log(animal);
})

// /repeat/{something}/{number} repeat something number of times
app.get('/repeat/:str/:num', function(req, res){
    let str = req.params.str;
    let num = Number(req.params.num); 
    let output = "";
    if(!isNaN(num)){
        for(let i=0; i<Math.floor(num); i++){
            output += str + " ";
        }
    }
    else{
        output = "no number";
    }
    res.send(output);
    console.log(str, num);
})

app.get("*", function(req, res){
    res.send("Oops");
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))