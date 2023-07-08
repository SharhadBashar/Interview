function sortArray(array) {
  if (array.length === 0){
    return array;
  }
  var oddArray = [];
  for (var i = 0; i < array.length; i++){
    if (array[i] % 2 === 1){
      oddArray.push(array[i]);
      array[i] = -1;
    }
  }
  oddArray.sort((a,b) => {
    return a - b;
  });
  for(var i = 0; i < array.length; i++){
    if(array[i] === -1){
      array[i] = oddArray.shift();
    }
  }
  return array;
}

console.log(sortArray([5, 3, 2, 8, 1, 4]));
console.log(sortArray([5, 3, 1, 8, 0]));
//[5,3,1]
//[1,3,5]
//[1,3,5,]