// this is Lu's Bouncy Bubble Sort Lab
const readline = require('readline');

var list = new Array();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('\n Please input integers separated by commas: ', (input) => {
    rl.close();
    list = input.split(",");
    // string to int
    for(var i = 0; i < list.length; i++) {
        list[i] = parseInt(list[i]);
    }
    // do bouncing bubble sort
    list = bouncingBubbleSort(list);
    console.log("\n After sorting: "+list.join(",")+"\n");
});



// sort function
function bouncingBubbleSort(arr) {
    /*
    order == 0 : from head to tail
    order == 1 : from tail to head
     */
    var order = 0;
    var flag = 0;
    for(var i = 0; i < arr.length-1; i++) {
        if(order == 0) {
            for(var j = 0; j < arr.length-1; j++) {
                if(arr[j] > arr[j+1]) {
                    let element = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = element;
                    flag = 1;
                }
            }
            // reverse
            order = 1;
        }
        else {
            for(var j = arr.length-1; j > 0; j--) {
                if(arr[j] < arr[j-1]) {
                    let element = arr[j-1];
                    arr[j-1] = arr[j];
                    arr[j] = element;
                    flag = 1;
                }
            }
            // reverse
            order = 0;
        }
        if(flag == 0) {
            break;
        }
    }
    return arr;
}



