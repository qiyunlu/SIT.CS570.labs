// this is Lu's topological sort lab
const fs = require('fs');

class Digraph {
    constructor() {
        this.arr = [];
        this.topologicalOrder = [];
    }

    buildAdjacencyList(list) {
        for(var i = 0; i < list[0][0]; i++) {
            this.arr[i] = [];
        }
        for(var i = 1; i < list.length; i++) {
            this.arr[list[i][0]].push(list[i][1]);
        }
    }

    topologicalOrdering(str) {
        var array = JSON.parse(JSON.stringify(this.arr));
        var indegree = [];
        for(var i = 0; i < array.length; i++) {
            indegree[i] = 0;
        }
        for(var i = 0; i < array.length; i++) {
            for(var j = 0; j < array[i].length; j++) {
                indegree[array[i][j]]++;
            }
        }

        if(str == "DESC") {
            var i = 0;
            var nodeNum = 0;
            while(i < array.length) {
                var notAcyclic = true;
                for(var j = indegree.length-1; j >= 0; j--) {
                    if(indegree[j] == 0) {
                        notAcyclic = false;
                        nodeNum = j;
                        indegree[j] = -1;
                        break;
                    }
                }
                if(notAcyclic) {
                    console.log("not acyclic!");
                    return null;
                }
                i++;
                this.topologicalOrder[i] = nodeNum;
                for(var j = 0; j < array[nodeNum].length; j++) {
                    indegree[array[nodeNum][j]]--;
                }
            }
            return this.topologicalOrder;
        }
        else {
            var i = 0;
            var nodeNum = 0;
            while(i < array.length) {
                var notAcyclic = true;
                for(var j = 0; j < indegree.length; j++) {
                    if(indegree[j] == 0) {
                        notAcyclic = false;
                        nodeNum = j;
                        indegree[j] = -1;
                        break;
                    }
                }
                if(notAcyclic) {
                    console.log("not acyclic!");
                    return null;
                }
                i++;
                this.topologicalOrder[i] = nodeNum;
                for(var j = 0; j < array[nodeNum].length; j++) {
                    indegree[array[nodeNum][j]]--;
                }
            }
            return this.topologicalOrder;
        }
    }


}



// start here
var digraph = new Digraph();
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
// build digraph
digraph.buildAdjacencyList(list);
// do ordering
var toOne = digraph.topologicalOrdering();
// print out results
console.log("\n Original number of node | topological ordering number");
for(var i = 1; i < toOne.length; i++) {
    console.log("\n            "+toOne[i]+"                             "+i);
}
// another
console.log("\n ---------------------- or ---------------------------");
var toTwo = digraph.topologicalOrdering("DESC");
console.log("\n Original number of node | topological ordering number");
for(var i = 1; i < toTwo.length; i++) {
    console.log("\n            "+toTwo[i]+"                             "+i);
}




/*
infile.dat

6 8
0 1
0 2
1 3
1 4
2 3
2 4
5 3
5 4

*/