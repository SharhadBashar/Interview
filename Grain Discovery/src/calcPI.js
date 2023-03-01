const express = require('express');
const router = express.Router();

function randomNumber(min, max) {
    var randomNum = (Math.random() * (max - min)) + min;
    return randomNum;
}

function insideShape(x, y, radius) {
    var distance = Math.sqrt((x * x) + (y * y));
    return (distance < radius);
}

function roundDown(number){
    return Math.floor(number);
}

function calculatePI(dots) {
    var dotsInCircle = 0;
    for (i = 0; i < dots; i++) {
        var x = randomNumber(-1.0, 1.0);
        var y = randomNumber(-1.0, 1.0);
        if (insideShape(x, y, 1.0)) {
            dotsInCircle += 1;
        }
    }
    var piValue = 4.0 * dotsInCircle / dots;
    return piValue;
}
function starterBackend(lowerDots, higherDots){
    if (typeof (lowerDots) != 'number'){lowerDots = 10000}
    if (typeof (higherDots) != 'number'){higherDots = 10000000}
    dots = roundDown(randomNumber(lowerDots,higherDots));
    console.log('Dots used: ' + dots);
    console.log('Actual value of PI: ' + Math.PI);
    console.log('Calculated: ' + calculatePI(dots));
}

function starterFrontend(lowerDots, higherDots){
    if (typeof (lowerDots) != 'number'){lowerDots = 10000}
    if (typeof (higherDots) != 'number'){higherDots = 10000000}
    dots = roundDown(randomNumber(lowerDots, higherDots));
    document.getElementById("dots").innerHTML = dots;
    document.getElementById("piActual").innerHTML = Math.PI;
    document.getElementById("piCalculated").innerHTML = calculatePI(dots);
}

starterBackend();

