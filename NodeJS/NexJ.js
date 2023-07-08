function map(array, fun, out) {
    var n = array.length,//3
        
        i;
    if (out == null){
        out = []
    }
    m = out.length//1
    //var v;
    for (i = 0; i < n; ++i){
        v = array[i];//v=2
        v = fun.call(v, v, i);
        if (v != undefined) {
            out[m++] = v;
        }
    }
    return out;
}

var a1 = [2, 4, 5];
var a2 = ["hello"];
function incr(v, i) {
    return v + i;
}
console.log(map(a1, incr, a2));


