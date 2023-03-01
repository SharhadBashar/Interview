function countRows(){
  return GRID.length;
}
function countColumns(){
  return GRID[0].length;
}
function gridSize(){
  var height = countRows();
  var width = countColumns();
  return (width + ' x ' + height);
}