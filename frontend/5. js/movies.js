movies = [
    {
        title : "In Burges",
        rating : 5,
        hasWatched : true
    },
    {
        title : "Frozen",
        rating : 4.5,
        hasWatched : false
    },
    {
        title : "Mad Max",
        rating : 5,
        hasWatched : true
    },
    {
        title : "Les Mes",
        rating : 3.5,
        hasWatched : false
    }
]

movies.forEach(function(movie){
    let movieOutput = "You have ";
    if(movie.hasWatched){
        movieOutput += "watched ";
    }
    else{
        movieOutput += "not watched ";
    }
    movieOutput += movie.title + " - " + movie.rating + " stars";
    console.log(movieOutput)
})

var obj = {
    name: "chuck",
    age : 23,
    isCool : false,
    friends: ["Bob", "Billy"],
    add: function(x,y){
        return x+y;
    }
}