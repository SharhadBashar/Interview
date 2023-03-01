//calulates a random number given a min and max range
function randomNumber(min, max) {
    var randomNum = (Math.random() * (max - min)) + min;
    return randomNum;
}

//checks if a point is within a certain radius
function insideShape(x, y, radius) {
    var distance = Math.sqrt((x * x) + (y * y));
    return (distance < radius);
}

//rounds down a number
function roundDown(number){
    return Math.floor(number);
}

//calculates the value of PI
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

//stand alone backend code
function starterBackend(lowerDots, higherDots){
    if (typeof (lowerDots) != 'number'){lowerDots = 10000}
    if (typeof (higherDots) != 'number'){higherDots = 10000000}
    dots = roundDown(randomNumber(lowerDots,higherDots));
    console.log('Dots used: ' + dots);
    console.log('Actual value of PI: ' + Math.PI);
    console.log('Calculated: ' + calculatePI(dots));
}

//call from front end
function starterFrontend(lowerDots, higherDots){
    if (typeof (lowerDots) != 'number'){lowerDots = 10000}
    if (typeof (higherDots) != 'number'){higherDots = 10000000}
    dots = roundDown(randomNumber(lowerDots, higherDots));
    document.getElementById("dots").innerHTML = dots;
    document.getElementById("piActual").innerHTML = Math.PI;
    document.getElementById("piCalculated").innerHTML = calculatePI(dots);
}

//pass arguments here if wanted, if not run this function to get approx value of PI
starterBackend();

