console.log("check");

let h1 = document.querySelectorAll ("h1")

h1.forEach(function(h){
    h.style.color = "pink"
})
console.log(h1)

// let body = document.body;
// let isBlue = false;
// let interval = setInterval(function(){
//     if(isBlue){
//         body.style.background = "white";
//         isBlue = false;
//     }
//     else{
//         body.style.background = "blue";
//         isBlue = true;
//     }

// }, 2000)

// setTimeout(function(){
//     clearInterval(interval)
// }, 10000)

// DOM SELECTORS
let l1 = document.getElementById("highlighted"); //ids are unique. Returns the 1 object with id given
//document.getElementsByClassName(class);
// let l1 = document.getElementsByTagName(highlighted);
console.log(l1);
l1.style.background = "green";
// document.querySelector();
// document.querySelectorAll();