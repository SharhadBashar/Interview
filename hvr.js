//String matching

function matchPercentage(a, b) {
  var match = 0,
      strC = '',
      len = (a.length >= b.length ) ? a.length : b.length,
      //len = a.length * b.length,
      arrA, arrB;

  a = a.toLowerCase();
  b = b.toLowerCase();
  arrA = a.split("");
  arrB = b.split("");

  /*for (var i = 0; i < arrA.length; i++) {
      strC += arrA[i];
    for (var j = 0; j < arrB.length; j++) {
      if (arrA[i] === arrB[j]) {
        strC += arrA[i];
      }
    }
  }*/

  for(var i = 0; i < arrA.length; i++) {
    strC += arrA[i];
    if (b.indexOf(strC) === -1) {
      break;
    }
  }

  for(var i = 0; i < arrA.length; i++) {
    strC += arrA[i];
    if (b.indexOf(strC) === -1) {
      break;
    }
  }
  return (strC.length / len * 100);
}


var a = 'I love dogs Love I dog';
var b = 'I do not love dogs';
console.log(matchPercentage(a, b));

a = 'Sharhad Bashar';
b = 'Sherhd Bsher';
console.log(matchPercentage(a, b));


a = 'Sharhad Bashar';
b = 'Sharhad Bashar';
console.log(matchPercentage(a, b));


a = 'I love dogs Love I dog';
b = 'Sharhad Bashar';
console.log(matchPercentage(a, b));


a = 'a';
b = 'aaaaaaaaaaaaaaa';
console.log(matchPercentage(a, b));

a = ' abcdefgh';
b = 'abcdezzz';
console.log(matchPercentage(a, b));

a = 'abcdefgh';
b = 'hgfedcba';
console.log(matchPercentage(a, b));

a = 'I, Andrew Matte';
b = 'Andrew Matte';
console.log(matchPercentage(a, b));