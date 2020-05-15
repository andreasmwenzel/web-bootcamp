let rgb = [0, 0, 0];
let resetButton = document.querySelector("#reset");
let answerSquare;
let difficultyHard = true;
let difficultyToggle = document.querySelector("#difficultyToggle");
let guessSquares = document.querySelectorAll(".guessSquare");
let jumbotron = document.querySelector("#headJumbo");
let tryAgainDisplay = document.querySelector("#try-again");

function rgbString(r, g, b) {
    let str = "rgb(" + r + "," + g + "," + b + ")"
    return str;
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function victory(){
    for(let i=0; i<guessSquares.length; i++){
        guessSquares[i].classList.remove("invisible");
        guessSquares[i].style.backgroundColor = rgbString(rgb[0], rgb[1], rgb[2]);
        if (i === answerSquare){
            guessSquares[i].removeEventListener("click", victory);
        }
        else{
            guessSquares[i].removeEventListener("click", clickedIncorrect);
        }
    }
    jumbotron.style.backgroundColor = rgbString(rgb[0], rgb[1], rgb[2]);

    resetButton.textContent = "Play Again";
    tryAgainDisplay.classList.add("invisible");
}
function clickedIncorrect(){
    tryAgainDisplay.classList.remove("invisible");
    this.classList.add("invisible");
    
}

function resetGame() {
    //get top rgb
    let rgbDisplays = document.querySelectorAll(".colorDisplay")

    jumbotron.removeAttribute("style");
    resetButton.textContent = "New Colors";
    for (let i = 0; i < 3; i++) {
        rgb[i] = random(0, 256);
        rgbDisplays[i].textContent = rgb[i]
    }
    //console.log(rgb);
    //select a square at random

    if (difficultyHard) {
        answerSquare = random(0, 6);
    }
    else {
        answerSquare = random(0, 3);
    }
    console.log(answerSquare);

    for (let i = 0; i < guessSquares.length; i++) {
        guessSquares[i].classList.remove("mainBackground");
        guessSquares[i].classList.remove("invisible");
        if (i === answerSquare) {
            //set victory square to the right color and add victory listener
            guessSquares[i].style.backgroundColor= rgbString(rgb[0], rgb[1], rgb[2]);
            guessSquares[i].addEventListener("click", victory)
        }
        else {
            //set the other colors randomly
            guessSquares[i].style.backgroundColor= rgbString(random(0, 256), random(0, 256), random(0, 256));
            guessSquares[i].addEventListener("click", clickedIncorrect);
        }
    }

}

resetButton.addEventListener("click", resetGame)

function setDifficulty(diff) {
    //guarantee a toggle
    if (diff === difficultyHard) {
        return;
    }
    difficultyHard = diff;
    let hard = document.querySelector("#hard");
    let easy = document.querySelector("#easy");

    hard.classList.toggle("mainBackground");
    hard.classList.toggle("mainColor");
    easy.classList.toggle("mainBackground");
    easy.classList.toggle("mainColor");

    for (let i = 3; i < 6; i++) {
        guessSquares[i].classList.toggle("d-none");
    }
    resetGame();
}

difficultyToggle.addEventListener("click", function (a) {
    setDifficulty(a.target === document.querySelector("#hard"));
})