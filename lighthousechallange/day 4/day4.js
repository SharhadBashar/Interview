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