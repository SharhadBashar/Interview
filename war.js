var card = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"],
  a = "2325910KJAQJ3K", // 2 3 2 5 9 10 K J A Q J 3 K
  b = "45278KA424J22",  // 4 5 2 7 8 K  A 4 2 4 J 2 2
  len = a.length, //13
  aScore = 0,
  i = 0,
  arrA, arrB


function strToArr(cardStr) {
  playerCards = []
  for (var i = 0; i < cardStr.length; i++) {
    if (cardStr[i] === '1') {
      playerCards.push('10');
      i++;
    }
    else {
      playerCards.push(cardStr[i]);
    }
  }
  return playerCards;
}

aArr = strToArr(a);
bArr = strToArr(b);

for (var i = 0; i < aArr.length; i++) {
  if (card.indexOf(aArr[i]) > card.indexOf(bArr[i])) {
    aScore++;
  }

  else if (card.indexOf(aArr[i]) === card.indexOf(bArr[i])) {

  }
}

/*function compare(a, b, point = 1) {
  if (card.indexOf(a) > card.indexOf(b)) {
    aScore += point;
  }
}*/

/*while(i < arrA.length) {

  compare(aArr[i], bArr[i]);

  if (card.indexOf(aArr[i]) === card.indexOf(bArr[i])) {
    if (len - i - 1 > 3) {
      aArr.splice(i + 1, 3);
      bArr.splice(i + 1, 3);
      len = len - 3;
      i++;
      compare(aArr[i], bArr[i], 3);
    }
    else if (len - i - 1 === 3) {
      aArr.splice(i + 1, 2);
      bArr.splice(i + 1, 2);
      len = len - 2;
      i++;
      compare(aArr[i], bArr[i], 2);
    }
    else if (len - i - 1 === 2) {
      aArr.splice(i + 1, 1);
      bArr.splice(i + 1, 1);
      len = len - 1;
    }
    else if (len - i - 1 < 2) {
      i++;
    }
    console.log(aArr[i]);
    console.log(bArr[i]);
    console.log("")
  }

  else {
    i++;
  }
}*/

console.log(aScore);