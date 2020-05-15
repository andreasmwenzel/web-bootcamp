/* creat a secret number*/
const num = 3;

// promt a gue

let  guess = prompt("Guess a number between 1 and 10: ")
while(Number(guess) !== num){
    if(Number(guess) > num){
        guess = prompt("Too high. Try again: ");
    }     
    else{
        guess = prompt("Too low. Try again: ");
    }
        
}
/*else{
    alert("you guessed wrong")
}*/
alert("You guessed right");