function duplicateEncode(word){
  var letters = {};
  var encoded = '';
  word = word.toLowerCase();
  for (var i = 0; i < word.length; i++){
    if(letters[word.charAt(i)] !== undefined){
      letters[word.charAt(i)] += 1;
    }
    else{
      letters[word.charAt(i)] = 1;
    }
  }
  for(var i = 0; i < word.length; i++){
    if(letters[word.charAt(i)] > 1){
      encoded += ')';
    }
    else{
      encoded += '(';
    }
  }
  return encoded;
}