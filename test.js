
function nonDivisibleSubset(k, S) {
  let remainder = [];
  let count = 0;
  for (let i = 0; i < k; i++) {
    remainder.push(0);
  }
  for (let i = 0; i < S.length; i++) {
    remainder[S[i] % k] += 1;
  }
  console.log(remainder);
  if (remainder[0]) {
    count += 1;
  }
  if (!(k%2)) {
    count += 1;
  }
  for (let i = 1; i < k/2; i++) {
    count += Math.max(remainder[i], remainder[k - i]);
  }
  console.log(count);
}

nonDivisibleSubset(4, [1,2,3,4,5,6,7,8,9,10])
//nonDivisibleSubset(7, [278, 576, 496, 727, 410, 124, 338, 149, 209, 702, 282, 718, 771, 575, 436]);