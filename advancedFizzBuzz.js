// This is Lu's advancedFizzBuzz

var seqHead = 10;
var seqEnd = 250;
var count = 0;
var arr = new Array();

for(var i = seqHead; i <= seqEnd; i++) {
    arr[count]=i;
    count++;
}

FizzBuzzer(arr);

// function FizzBuzzer
function FizzBuzzer(arr) {
    for(var i = 0; i < arr.length; i++) {
        if((arr[i]%3) == 0) {
            if((arr[i]%5) == 0) {
                console.log("BuzzFizz");
            } else {
                console.log("Buzz");
            }

        } else if((arr[i]%5) == 0) {
            console.log("Fizz");
        } else {
            console.log(arr[i]);
        }
    }
    return 0;
}
