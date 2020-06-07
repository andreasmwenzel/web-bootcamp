var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

async function seedDB() {
    console.log("================")
    console.log("SEEDING DATABASE")
    try{
        //Remove all campgrounds
        let deleted = await Campground.deleteMany({})
        await Comment.deleteMany({})
        console.log(deleted.deletedCount + " campgrounds deleted");
    
        //add some campgrounds
        for (camp of data) {
            let c = await Campground.create(camp);
            console.log("Created " + c.name + " with id " + c._id)
            let com = await Comment.create({
                text: "This place is great, but I wish there was internet",
                author: "Homer"
            })
            console.log(com)
            c.comments.push(com);
            c.save();
        }
    }catch(err){
        console.log(err);
    }



    //add some comments
    // Comment.remove({}, function(err) {
    //     if(err){
    //         console.log(err);
    //     }

    //         //add a few campgrounds
    //     data.forEach(function(seed){
    //         Campground.create(seed, function(err, campground){
    //             if(err){
    //                 console.log(err)
    //             } else {
    //                 console.log("added a campground");
    //                 //create a comment
    //                 Comment.create(
    //                     {
    //                         text: "This place is great, but I wish there was internet",
    //                         author: "Homer"
    //                     }, function(err, comment){
    //                         if(err){
    //                             console.log(err);
    //                         } else {
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                             console.log("Created new comment");
    //                         }
    //                     });
    //             }
    //         });
    //     });
    // });
    //add a few comments

    console.log("FINISHED SEEDING");
    console.log("================")
}

module.exports = seedDB;