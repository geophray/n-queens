/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //create object to store which rows and columns have been used
  var used = {};
  used.col = [];
  used.row = [];
  var solution = new Board({'n': n});
  //[[0,0,0],[0,0,0],[0,0,0]]
  //create rows variable with get(rows)
  var rows = solution.rows();
  //iterate solution
  for (var row = 0; row < rows.length; row++) {
    //iterate rows
    for (var col = 0; col < rows[row].length; col++) {
      //if row and column haven't been used, toggle it
      if (!(_.contains(used.col, col)) && !(_.contains(used.row, row))) {
        solution.togglePiece(row, col);
        //save current column and row to object
        used.col.push(col);
        used.row.push(row);
      }
    }
  }
  solution = solution.attributes;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
