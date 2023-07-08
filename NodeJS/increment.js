function increment (num) {
    for (var i = num.length - 1; i >= 0; i--) {
        num[i]++;
        if (num[i] > 9) num[i] = 0;
        else break;
    }
    return num;
}

increment([1, 2, 7, 9]);