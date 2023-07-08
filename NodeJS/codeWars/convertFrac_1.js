

function LCM(numbers){
  a = numbers[0];
  for (var i = 1; i < numbers.length; i++){
    b = numbers[i];
    a = lcm_2(a,b);
  }
  return a;
}

function gcd(numbers){
  a = numbers[0];
  for (var i = 1; i < numbers.length; i++){
    b = numbers[i];
    a = gcd_2(a, b);
  }
  return a;
}
function lcm_2(a, b){
  return (a * b / gcd_2(a, b));
}

function gcd_2 (a, b){
  while(b){
    var temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function convertFrac(lst){
  numbers = [];
  var returnS = '('
  for (var i = 0; i < lst.length; i++){
    numbers.push(lst[i][1]);
  }
  var lcm = parseInt(LCM(numbers));
  for (var i = 0; i < lst.length; i++){
    lst[i][0] *= lcm/lst[i][1];
    lst[i][1] = lcm;
  }
  for (var i = 0; i < lst.length; i++){
    returnS += lst[i][0] + ',' + lst[i][1] + ')('
  }
  return returnS.substring(0, returnS.length-1);
}


var lst = [ [1, 2], [1, 3], [1, 4] ]
console.log(convertFrac(lst));