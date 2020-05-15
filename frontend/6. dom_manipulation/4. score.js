//Points game:
//On player button presses, increase resepctive player score
//when player reaches play-to score, change color to of respective player green and lock player buttons

let p1Button = document.querySelector("#p1btn");
let p2Button = document.querySelector("#p2btn");
let resetButton = document.getElementById("reset");
let goalInput = document.getElementById("goalInput")

function incrementPlayer(p){
    //only allow goal to change when no-one has scored yet
    goalInput.disabled = true;
    let playerPointSpan = document.querySelector("#p" + p + "score");
    let playerScore = Number(playerPointSpan.textContent) + 1;
    playerPointSpan.textContent = String(playerScore);
    if(playerScore >= goalInput.value){
        playerPointSpan.classList.add("victory");
        p1Button.disabled = true;
        p2Button.disabled = true;
    }
}

p1Button.addEventListener("click", function (){
    incrementPlayer(1);
})
p2Button.addEventListener("click",function(){
  incrementPlayer(2);  
})

//when input changes
goalInput.addEventListener("change", function(){
    if(this.value<1){
        this.value = 1;
    }
    document.getElementById("goal").textContent = this.value;
})

resetButton.addEventListener("click", function(){
    goalInput.disabled = false;
    p1Button.disabled = false;
    p2Button.disabled = false;
    let pnts = document.querySelectorAll(".points")
    for(let i = 0; i<pnts.length; i++){
        pnts[i].innerHTML = 0;
        pnts[i].classList.remove("victory");
    }
})