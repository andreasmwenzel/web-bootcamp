const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/embed", { useNewUrlParser: true, useUnifiedTopology: true })



//POST title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("Post", postSchema);

//USER email, name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts:[postSchema]
});

const User = mongoose.model("User", userSchema)

// var newUser = new User({
//     email: "hermoine@hogwarts.edu",
//     name: "hermoine granger"
// })

// newUser.posts.push({
//     title: "leviosa",
//     content: "levitate"
// })

// newUser.save((err, user)=>{
//     (err) ? console.log(err) : console.log(user);
// })

// let newPost = new Post({
//     title: "charlie's first post",
//     content: "goo goo ga ga"
// })

// newPost.save((err, post)=>{
//     (err) ? console.log(err) : console.log(post);
// })

User.findOne({name: "hermoine granger"}, (err, user)=>{
    if(err){
        console.log(err)
    } else{
        console.log(user);
        user.posts.push({
            title:"lumos",
            content: "light"
        })
        user.save((err, user)=>{
            (err) ? console.log(err) : console.log(user);
        })
    } 
})