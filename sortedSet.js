// this is Lu's sorted set lab

const fs = require('fs');
const readline = require('readline');

class SortedSet {
    constructor() {
        this.arr = [];
    }

    isEmpty() {
        if(this.arr.length == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    contains(value) {
        var i = 1;
        for(;this.arr[i] != undefined;) {
            if(this.arr[i] == value) {
                return ["Yes", i];
            }
            else if(this.arr[i] > value) {
                i = 2*i;
            }
            else {
                i = 2*i+1;
            }
        }
        return ["No", i];
    }

    add(value) {
        var result = this.contains(value);
        if(result[0] == "No") {
            this.arr[result[1]] = value;
        }
    }

    remove(value) {
        var result = this.contains(value);
        if(result[0] == "Yes") {
            var spot = result[1];
            if(this.arr[2*spot] == undefined && this.arr[2*spot+1] == undefined) {
                // Node removed is a leaf
                this.arr[spot] = undefined;
            }
            else if((this.arr[2*spot] != undefined)+(this.arr[2*spot+1] != undefined) == 1) {
                // Node removed has the left or the right children
                if(this.arr[2*spot] != undefined) {
                    this.moveSubtree(spot*2, spot);
                }
                else {
                    this.moveSubtree(spot*2+1, spot);
                }
            }
            else {
                // Node removed has both, the left and right children
                var node = this.findSmallestLeaf(spot*2+1);
                this.arr[spot] = this.arr[node];
                this.arr[node] = undefined;
            }
        }
    }

    findBiggestLeaf(treeRoot) {
        for(var i = treeRoot; this.arr[i*2+1] != undefined;) {
            i = i*2+1;
        }
        return i;
    }

    findSmallestLeaf(treeRoot) {
        for(var i = treeRoot; this.arr[i*2] != undefined;) {
            i = i*2;
        }
        return i;
    }

    moveSubtree(treeRoot, to) {
        if(treeRoot-to*2 <= 0) {
            // from left-down to right-up
            this.arr[to] = this.arr[treeRoot];
            this.arr[treeRoot] = undefined;
            var iterNode = treeRoot;
            if(this.arr[iterNode*2] != undefined) {
                this.moveSubtree(iterNode*2, iterNode);
            }
            if(this.arr[iterNode*2+1] != undefined) {
                this.moveSubtree(iterNode*2+1, iterNode+1);
            }
        }
        else {
            // from right-down to left-up
            this.arr[to] = this.arr[treeRoot];
            this.arr[treeRoot] = undefined;
            var iterNode = treeRoot;
            if(this.arr[iterNode*2] != undefined) {
                this.moveSubtree(iterNode*2, iterNode-1);
            }
            if(this.arr[iterNode*2+1] != undefined) {
                this.moveSubtree(iterNode*2+1, iterNode);
            }
        }
    }

}



// start from here
// Binary Search Tree: bst
var bst = new SortedSet();
// read file as String
var rfStr = fs.readFileSync("./infile.dat").toString();
// change String to array[String]
var rfArr = rfStr.split(",");
// change array[String] to array[int]; and add array to bst
for(var i = 0; i < rfArr.length; i++) {
    rfArr[i] = parseInt(rfArr[i]);
    bst.add(rfArr[i]);
}

console.log("\n Sorted Set A Contains "+rfArr.join(","));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// read user's input
rl.question('\n User Input = ', (input) => {
    rl.close();
    // search user's input in bst
    console.log("\n "+bst.contains(input)[0]);
});
