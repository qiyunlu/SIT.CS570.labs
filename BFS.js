// this is Lu's BFS lab
const fs = require('fs');

class Queue {

    constructor() {
        this.arr = [];
    }

    push(value) {
        this.arr.push(value);
    }

    popHead() {
        return this.arr.shift();
    }

    getHead() {
        return this.arr[0];
    }

}

class Graph {
    
    constructor() {
        this.arr = [];
        this.S = []; // also used as bfn
        this.Q = new Queue();// S'
    }

    buildAdjacencyMatrix(list) {
        for(var i = 0; i < list[0][0]; i++) {
            this.arr[i] = [];
            for(var j = 0; j < list[0][0]; j++) {
                // -1 means not exit, 0 means not used
                this.arr[i][j] = [-1, 0];
            }
        }

        for(var i = 1; i < list.length; i++) {
            this.arr[list[i][0]][list[i][1]] = [1, 0];
            this.arr[list[i][1]][list[i][0]] = [1, 0];
        }
    }

    explore(start) {

        this.S.push(start);
        this.Q.push(start);

        var v = -1;
        var w = -1;
        while(this.Q.getHead() != undefined) {
            v = this.Q.getHead();
            var deleteV = true;
            for(var i = 0; i < this.arr[v].length; i++) {
                if(this.arr[v][i][0] == 1 && this.arr[v][i][1] == 0) {
                    w = i;
                    deleteV = false;
                    break;
                }
            }

            if(deleteV) {
                this.Q.popHead();
            }
            else {
                this.arr[v][w] = [1, 1];
                this.arr[w][v] = [1, 1];

                var inS = false;
                for(var i = 0; i < this.S.length; i++) {
                    if(this.S[i] == w) {
                        inS = true;
                        break;
                    }
                }
                if(!inS) {
                    this.S.push(w);
                    this.Q.push(w);
                }
            }
        }
        return this.S;
    }

}





// start here

// read from infile.dat
var list = fs.readFileSync("./infile.dat", "utf-8");
// seperate lines
list = list.split("\n");
for(var i = 0; i < list.length; i++) {
    // get rid of empty line
    if(list[i] == "") {
        list.splice(i, 1);
        i--;
    }
    else {
        // seperate nodes
        list[i] = list[i].split(" ");
    }
}
// change string to int
for(var i = 0; i < list.length; i++) {
    for(var j = 0; j < list[i].length; j++) {
        list[i][j] = +list[i][j];
    }
}

// build graph
var graph = new Graph();
graph.buildAdjacencyMatrix(list);
// get bfn
var bfn = graph.explore(0);

// print out result
console.log("\n node     bfn");
console.log("\n ------------");
for(var i = 0; i < bfn.length; i++) {
    console.log("\n   "+bfn[i]+"       "+(i+1));
}



/*
infile.dat

11 14
0 1
0 2
0 3
0 6
1 2
2 3
3 4
3 5
6 7
6 10
7 10
7 8
8 9
8 10

*/