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

//maybe need to make an 'addNextPiece' helper function?

// var addNextPiece = function(board, n, currentRow, currentCol, conflictCheck){  //example initial addNextPiece invocation for rooks... addNextPiece(board, n, 0, 0, board.hasAnyRooksConflicts)
// //iterate currentRow
// for (var i = 0; i < n; i++) {
//   //if currentCol is equal to n and currentRow is equal to n-1, return board  //we've checked all spaces on the board and we can't add any without creating a conflict
//   if (currentCol)
//   //else if currentRow??? is equal to n, call addNextPiece(board, n, currentRow + 1, 0) //we've checked all spaces on this row, we should continue looking at the beginning of the next row
//   //add piece at currentRow, currentCol
//     //if passes conflictCheck, return board
//     //else increment currentCol and recurse using addNextPiece(board, n, currentRow, currentCol, conflictCheck)

// }
var addNextPiece = function(board, n, currentRow, currentCol, conflictCheck){  //

};

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
  solution = solution.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // console.log (solution.attributes['0'])
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  // Create a new board
  var board = new Board({'n': n});
  // Create helper function for populating potential solutions
  function newRow(b, r) {
    // parameter passed in is a board of nxn size, and row (board, row)
    // if row = n
    if (r === n) {
      // Check how many pieces are on the board
      var totalPieces = 0;
      //get rows, reduce rows instead of b
      var rowsR = b.rows();
      for (var i = 0; i < n; i++) {
          totalPieces += _.reduce(rowsR[i], function(accumulator, currentValue){
                return accumulator + currentValue;
              }, 0);;
      }
      // for (var i = 0; i < n; i++) {
      //   totalPieces += _.reduce(b[i], function(accumulator, currentValue){
      //     return accumulator + currentValue;
      //   }, 0);
      // }
      // If pieces === n , then return 1
      if (totalPieces === n) {
        return 1;
      } else {
      // else
        // return 0
        return 0;
      }
    }
    // Iterate over the current row, adding the next piece each iteration
    for (var i = 0; i < n; i++) {
      // returns a potential/valid solution
      b.togglePiece(r, i);
      // If has conflicts, then continue next iteration
      if (!board.hasAnyRooksConflicts.call(b)) {
        // Recursively call helper function on current board (board, row + 1)
        solutionCount += newRow(b, r+1);
        console.log ('solutionCount: ' + solutionCount)
        console.log ('board is: ' + JSON.stringify(b) + '\nrow is: ' + r + '\nrows is: ' + rowsR)
      }
      b.togglePiece(r, i);
    }
  };//function
  // Invoke the helper function on empty board (board, 0)
  newRow(board, 0);
  // solutionCount += helperFunction(board, row);

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
