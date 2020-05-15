function average(arr){
    let sum = 0;
    arr.forEach(function(num){
        sum+=num;
    })
    // for(i=0; i<arr.length; i++){
    //     sum += arr[i]
    // }
    return Math.round(sum / arr.length);
}


let scores = [90, 98, 89, 100, 100, 86, 94]
console.log(average(scores)); //94

let scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49]
console.log(average(scores2)); //68