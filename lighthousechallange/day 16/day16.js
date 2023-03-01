const GRID = [
      ["", "", "", "^", "", "", "", "", "", ""],
      ["", "", "v", "", "~", "", "", "", "", ""],
      ["", "v", "", "", "^", "^", "", "", "", ""],
      ["", "", "", "", "^", "^", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "v", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "^", "~", "~", "", "", "", "^", "", ""],
      ["", "^", "", "~", "~", "", "", "", "", ""],
      ["", "^", "", "", "~", "~", "", "", "", ""],
    ];

function countRows(){
  return GRID.length;
}
function countColumns(){
  return GRID[0].length;
}
function gridSize(){
  let height = countRows();
  let width = countColumns();
  return (width + ' x ' + height);
}
function totalCells(){
  let height = countRows();
  let width = countColumns();
  return(width * height);
}
function convertColumn(coordinates){
  return (coordinates.charCodeAt(0) - 65);
}

/*function lightCell(coordinates){
  let column = convertColumn(coordinates);
  let row = Number(coordinates.substring(1)) - 1;
  return ('"' + GRID[row][column] + '"');
}*/
//Updated above function
function lightCell(coordinates){
  let column = convertColumn(coordinates);
  let row = Number(coordinates.substring(1)) - 1;
  if(GRID[row][column] == ""){
    return GRID[row][column];
  }
  return false;
}

function isRock(coordinates){
  let gridValue = lightCell(coordinates);
  if (gridValue === "^"){
    return true;
  }
  return false;
}

function isCurrent(coordinates){
  let gridValue = lightCell(coordinates);
  if (gridValue === "~"){
    return true;
  }
  return false;
}

function isShip(coordinates){
  let gridValue = lightCell(coordinates);
  if (gridValue === "v"){
    return true;
  }
  return false;
}

function lightRow(row){
  return GRID[row - 1];
}

function lightColumn(column){
  var columnContents = [];
  columnNumber = convertColumn(column);
  for (var i = 0; i < GRID.length; i++){
    columnContents.push(GRID[i][columnNumber])
  }
  return columnContents;
}

function allRocks(){
  var rocks = [];
  for (var i = 0; i < countRows(); i++){
    for (var j = 0; j < countColumns(); j++){
      if (GRID[i][j] === "^"){
        rocks.push(String.fromCharCode(j+65) + (i+1));
      }
    }
  }
  return rocks;
}

function allCurrents(){
  var currents = [];
  for (var i = 0; i < countRows(); i++){
    for (var j = 0; j < countColumns(); j++){
      if (GRID[i][j] === '~'){
        currents.push(String.fromCharCode(j+65) + (i+1));
      }
    }
  }
  return currents;
}

function allShips(){
  var ships = [];
  for (var i = 0; i < countRows(); i++){
    for (var j = 0; j < countColumns(); j++){
      if (GRID[i][j] === 'v'){
        ships.push(String.fromCharCode(j+65) + (i+1));
      }
    }
  }
  return ships;
}

function firstRock(){
  for (var i = 0; i < countRows(); i++){
    for (var j = 0; j < countColumns(); j++){
      if (GRID[i][j] === "^"){
        return (String.fromCharCode(j+65) + (i+1));
      }
    }
  }
}

function firstCurrent(){
  for (var i = 0; i < countRows(); i++){
    for (var j = 0; j < countColumns(); j++){
      if (GRID[i][j] === "~"){
        return (String.fromCharCode(j+65) + (i+1));
      }
    }
  }
}
