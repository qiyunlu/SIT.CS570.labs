// this is Lu's Caesar Cipher Lab
const fs = require('fs');
const readline = require('readline');

console.log("\n Please put the message and the program in the same directory.");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("\n So which file do you want to decipher? ", (answer) => {
    rl.close();
    fs.exists("./"+answer, function(exists) {
        if(exists) {
            console.log("\n Deciphering...");
            var str = fs.readFileSync("./"+answer) + "";
            var arr = str.split("");
            var key = 5;
            for(var i = 0, count = 0; i < arr.length; i++, count++) {
                // key increases by 2 after every 3 characters
                if(count >= 3) {
                    count = 0;
                    key = key + 2;
                }
                // key does not exceed 26
                if(key >= 26) {
                    key = key - 26;
                }
                // decipher
                var charCode = arr[i].charCodeAt(0);
                if(charCode >= 65 && charCode <= 90) {
                    charCode = charCode - key;
                    if(charCode < 65) {
                        charCode = charCode + 26;
                    }
                } else if(charCode <= 122 && charCode >= 97) {
                    charCode = charCode - key;
                    if(charCode < 97) {
                        charCode = charCode + 26;
                    }
                }
                arr[i] = String.fromCharCode(charCode);
            }
            str = arr.join("");
            fs.writeFileSync("./solution.txt", str);
            console.log("\n Deciphered message saves in 'solution.txt'.");
            return 0;
        } else {
            console.log("\nERROR: ./"+answer+" not exists!");
            return 0;
        }
    });
});
