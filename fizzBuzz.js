// This is Lu's FizzBuzz

var seqHead = 74;
var seqEnd = 291;
for(var i = seqHead; i <= seqEnd; i++) {
    if((i%3) == 0) {
        if((i%5) == 0) {
            console.log("BuzzFizz");
        } else {
            console.log("Buzz");
        }

    } else if((i%5) == 0) {
        console.log("Fizz");
    } else {
        console.log(i);
    }
}