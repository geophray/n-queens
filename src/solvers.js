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




var newRow = function(board, r, n, conflict, cb) { //O(n!)

  if (r === n) { // Check how many pieces are on the board
    return cb();

  }

  for (var i = 0; i < n; i++) {

    board.togglePiece(r, i);
    if (!board[conflict]()) {
      var success = newRow(board, r + 1, n, conflict, cb);
      if (success) {
        return success;
      }
    }
    //if it's checking the very last piece, don't execute line 59
    board.togglePiece(r, i);
  }
// return solutionCount;
};//function



window.findNRooksSolution = function(n) { //O(n^p) || O(n^2)
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
window.countNRooksSolutions = function(n) { //O(n!)
  var solutionCount = 0; //fixme

  // Create a new board
  var board = new Board({'n': n});
  // Create helper function for populating potential solutions

  // Invoke the helper function on empty board (board, 0)
  newRow(board, 0, n, 'hasAnyRooksConflicts', function() {
    solutionCount++;
  });
  // solutionCount += helperFunction(board, row);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) { //O(n!)
  var board = new Board({'n': n});
  var solution = board.rows();
  newRow(board, 0, n, 'hasAnyQueensConflicts', function() {
    var newBoard = _.map(board.rows(), function(r) {
      return r.slice();
    });
    return newBoard;
  });
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) { //O(n!)
  var solutionCount = 0; //fixme

  // Create a new board
  var board = new Board({'n': n});
  // Create helper function for populating potential solutions

  // Invoke the helper function on empty board (board, 0)
  newRow(board, 0, n, 'hasAnyQueensConflicts', function() { solutionCount++; });
  // solutionCount += helperFunction(board, row);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};