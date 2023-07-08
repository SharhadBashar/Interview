function increment (num) {
    return res = [...''+ (+num.reduce((str, n) => str+n, '') +1)].map(Number);
}

console.log(increment([1, 2, 7, 9]));
console.log(increment([3, 9, 9, 9]));
console.log(increment([9, 9, 9, 9]));
console.log(increment([1, 1, 1, 1]));

