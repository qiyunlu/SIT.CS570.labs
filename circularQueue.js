// this is Lu's circular queue lab
const readline = require('readline');

// linked list
class LinkedList {

    constructor() {
        this.arr = [];
    }

    set(index, value) {
        this.arr[index] = value;
    }

    outputAll() {
        var L = this.arr.length;
        console.log("\n Your data:");
        for(let i = 0; i < L; i++) {
            console.log("\n   "+this.arr.shift());
        }
    }

}



// program's entry
var list = new LinkedList();
// spot [0,11]
var spot = 0;
// start
loop();



// loop
function loop() {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('\n Please input your data.\n Or imput "quit" to quit.\n ', (input) => {
        rl.close();
        if(input == "quit") {
            list.outputAll();
            return 0;
        }
        else {
            list.set(spot++, input);
            if(spot > 11) {
                spot = 0;
            }
        }
        loop();
    });
}
