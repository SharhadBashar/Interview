function add(S_i, SPrime, k) {
    let shouldAdd = true;
    for (var j = 0; j < SPrime.length; j++) {
        if ((SPrime[j] + S_i) % k === 0) {
            shouldAdd = false;
        }
    }
    return shouldAdd;
}

function nonDivisibleSubset(k, S) {

    const originalS = S;
    let SPrimeFinal = [];

  for (var i = 0; i < originalS.length; i++) {
    S = originalS;
    var SPrime = [];
    SPrime.push(S.splice(i, 1));
    while (S.length > 0) {
        let Si = S.pop();
        if(add(Si, SPrime, k)) {
          SPrime.push(Si);
        }
    }
    console.log(SPrime);
    if (SPrime.length > SPrimeFinal.length) {
      SPrimeFinal = SPrime;
    }
  }
  console.log(SPrimeFinal);
  console.log(SPrimeFinal.length);
}

nonDivisibleSubset(7, [278, 576, 496, 727, 410, 124, 338, 149, 209, 702, 282, 718, 771, 575, 436]);
nonDivisibleSubset(3, [1, 7, 2, 4]);