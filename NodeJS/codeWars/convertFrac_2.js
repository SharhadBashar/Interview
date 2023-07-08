
function LCD(numbers){
  var gcd = 1;
  var multiples = [];
  var denominators = {};
  for (var i = 0; i < numbers.length; i ++){
    gcd *= numbers[i];
  }
  for (var i = 0; i < numbers.length; i ++){
    var currentMultiple = 1,
        j = 1;
    while(currentMultiple !== gcd){
      currentMultiple = numbers[i] * j;
      multiples.push(currentMultiple);
      j++;
    }
  }
  for (var i = 0; i < multiples.length; i++){
    if(denominators[multiples[i]] !== undefined){
      denominators[multiples[i]] += 1;
    }
    else{
       denominators[multiples[i]] = 1;
    }
  }
  multiples = [];
  for(var key in denominators){
    if(denominators[key] === numbers.length){
      return key;
    }
  }
}

function convertFrac(lst){
  numbers = [];
  var returnS = '('
  for (var i = 0; i < lst.length; i++){
    numbers.push(lst[i][1]);
  }
  var lcd = parseInt(LCD(numbers));
  for (var i = 0; i < lst.length; i++){
    lst[i][0] *= lcd/lst[i][1];
    lst[i][1] = lcd;
  }
  for (var i = 0; i < lst.length; i++){
    returnS += lst[i][0] + ',' + lst[i][1] + ')('
  }
  return returnS.substring(0, returnS.length-1);
}


var lst = [ [1, 2], [1, 3], [1, 4] ];
console.log(convertFrac(lst));
//console.log(LCD([2,3,4]));