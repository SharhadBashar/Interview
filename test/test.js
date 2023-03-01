
function map(array, fun, out) {
     //var v is not defined
    if (out == null){ //should be == instead of ===. If it is ===, the only way we enter this block statement is if out is exactly equal to null
        out = [];
    }
var n = array.length,
        m = out.length, //Move this below the if (out == null) statement. This is done, so in case out is not defined or null, and a new empty out array needs to be created, the value of m will be 0 if moved below, rather than undefined, if left here
        i,v;
    for (i = 0; i < n; ++i){ //should be i<n and i++ and needs a third bracket
        v = array[i];
        v = fun.call(v, v, i);
        if (v !== undefined) {
            out[m++] = v; //should be m++, otherwise, we will have an empty spot in the return array

        }
    } //closing bracket for the for loop
return out; //need a return statement
}

var a1 = [2, 4, 5];
var a2 = ["hello"];
function incr(v, i) {
    return v + 1;
}
console.log(  map([2, 4, 5], function(i) {
    if (i % 2) return this * 3;
})
);









