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

function lightCell(coordinates){
  let column = convertColumn(coordinates);
  let row = Number(coordinates.substring(1)) - 1;
  return ('"' + GRID[row][column] + '"');
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