const mongoose = require("mongoose");
const Post = require("./models/posts")
const User = require("./models/users")

mongoose.connect("mongodb://localhost/references", { useNewUrlParser: true, useUnifiedTopology: true })



User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user)=>{
    if(err){
        console.log(err)
    } else{
        console.log(user)
    }
})


// Post.create({
//     title: "Bob's world pt3",
//     content: "blah blah blah"
// }, (err, post)=>{
//     User.findOne({email:"bob@gmail.com"}, (err, user)=>{
//         if(err){
//             console.log(err)
//         } else{
//             user.posts.push(post)
//             user.save((err, user)=>{
//                 console.log(user)
//             })
//         }
//     })
// })

// User.create({
//     email:"bob@gmail.com",
//     name: "Bob Gamal"
// })