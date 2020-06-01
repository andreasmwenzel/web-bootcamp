var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/cat_app', {useNewUrlParser: true, useUnifiedTopology: true})


const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperment: String
});

const Cat = mongoose.model("Cat", catSchema)

// add new cat to DB
// let dman = new Cat({
//     name: "Declan",
//     age: 3,
//     temperment: "playful"
// })

// dman.save(function(err, cat){
//     if(err){
//         console.log("something went wrong");
//     } else{
//         console.log("Cat saved: ");
//         console.log(cat);
//     }
// });

//retrieve all cats
Cat.find({}, function(err, cats){
    if(err){
        console.log("ERROR: ");
        console.log(err);
    } else{
        console.log("cats:")
        console.log(cats)
    }
})

//remove
Cat.remove({_id: "5ece79186b273d1058085c1b"}, function(err, res){
    if(err){
        console.log(err)
    }
    else{
        console.log(res)
    }
})