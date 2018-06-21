// this is Lu's Wrapper & Iterator Lab using raw JavaScript(ES6).
class Vector {

    constructor() {
        this.arr = [];
    }

    get length() {
        return this.arr.length;
    }

    get(index) {
        return this.arr[index];
    }

    set(index, value) {
        this.arr[index] = value;
    }

    push(value) {
        this.arr.push(value);
    }

    pop() {
        return this.arr.pop();
    }

    insert(index, value) {
        this.arr.splice(index, 0, value);
    }

}
// generator function
Vector.prototype[Symbol.iterator] = function*() {
    for (let i = 0; i < this.arr.length; i++) {
        yield this.arr[i];
    }
};


/* test Vector
var list = new Vector();
list.push("a");
list.push("b");
list.push("c");
list.push("d");
list.push("e");
console.log(list.pop());  // e
console.log(list.length); // 4
list.insert(2, "cool!");
console.log(list.get(2)); // cool!
console.log(list.get(3)); // c
list.set(5, "again!");
console.log(list.get(5)); // again!
for(let contents of list) {
    console.log(contents);       // a, b, cool!, c, d, again!
}
*/

