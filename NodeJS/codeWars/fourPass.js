/*
The eccentric candy-maker, Billy Bonka, is building a new candy factory to produce his new 4-flavor sugar pops. The candy is made by placing a piece of candy base onto a conveyer belt which transports the candy through four separate processing stations in sequential order. Each station adds another layer of flavor.

Due to an error in the factory blueprints, the four stations have been constructed in incorrect locations. It's too costly to disassemble the stations, so you've been called in.

Arrange the directional path of the conveyer belt so that it passes through each of the stations in sequential order while also traveling the shortest distance possible.

Input
An array consisting of the locations of each station on the factory floor, in order. The factory floor is a 10 x 10 matrix (with 0 starting index).

Output
Your function should return the path of the conveyer belt as an array.
If a valid configuration is not possible, return null or None.

The position values in the input and output arrays will consist of integers in the range 0 - 99, inclusive. These integers represent a position on the factory floor.
For example, the position [0,8] is given as 8, and [4,6] is given as 46

Technical Details
The conveyer belt must run through each station once and in ascending order
The conveyer belt must not intersect/overlap itself
The distance covered by the conveyer belt must be the minimum necessary to complete the task
Full Test Suite: 30 fixed tests, 100 random tests
Inputs will always be valid and each test will have zero or more possible solutions..

//INPUT - reference image A
let stations = [0,65,93,36];
fourPass(stations);

//OUTPUT #1 - reference image B
// [0, 1, 2, 3, 4, 5, 15, 25, 35, 45, 55, 65, 64, 63, 73, 83, 93, 94, 95, 96, 86, 76, 66, 56, 46, 36]

//OUTPUT #2 - reference image C
// [0, 10, 20, 30, 40, 50, 60, 61, 62, 63, 64, 65, 75, 85, 84, 83, 93, 94, 95, 96, 86, 76, 66, 56, 46, 36]

https://www.codewars.com/kata/four-pass-transport/train/javascript
*/
function fourPass(stations){
  var coordinates = []
  for(var i = 0; i < stations.length; i++){
    coordinates.push(getCoordinates(stations[i]));
  }
  var directions = []
  for (var i = 0; i < coordinates.length - 1; i++){
    var direction = getDirection(coordinates[i], coordinates[i + 1]);
    if(i !== coordinates.length - 2){
      direction.splice(-1,1);
    }
    directions = directions.concat(direction);
  }
  return directions;
}

//gets the array coordinates from the number location
function getCoordinates(station){
  var coordinates = []
  if (station < 10){
    coordinates.push(0);
    coordinates.push(station);
  }
  else{
    station = String(station);
    coordinates.push(parseInt(station.charAt(0)));
    coordinates.push(parseInt(station.charAt(1)));
  }
  return coordinates;
}

function getDirection(start, end){

  var directions = [];
  //find column direction
  var currentLocation = start[1];
  directions.push(start[0] * 10 + currentLocation);
  if(start[1] < end[1]){
    while(currentLocation !== end[1]){
      currentLocation++;
      directions.push(start[0] * 10 + currentLocation);
    }
  }
  else if(start[1] > end[1]){
    while(currentLocation !== end[1]){
      currentLocation--;
      directions.push(start[0] * 10 + currentLocation);
    }
  }

  currentLocation = directions[directions.length - 1];
  //find row direction
  if(start[0] < end[0]){
    while (currentLocation !== end[0] * 10 + end[1]){
      currentLocation += 10;
      directions.push(currentLocation);
    }
  }
  else if(start[0] > end[0]){
    while (currentLocation !== end[0] * 10 + end[1]){
      currentLocation -= 10;
      directions.push(currentLocation);
    }
 }
  return directions;
}

console.log(fourPass([0,65,93,36]))




































