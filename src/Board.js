// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
          _             _     _
      ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
      / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
      \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
      |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //get row at rowIndex using get
      var row = this.get(rowIndex);
      //reduce the row array into a counter
      var counter = _.reduce(row, function(total, square) {
        return total + square;
      }, 0);
      //if counter > 1, return true else false
      return counter > 1; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rows = this.rows();
      var counter = _.reduce(rows, function(total, row) {
        return total + row[colIndex];
      }, 0);
      return counter > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //var rows
      var rows = this.rows();
      var n = rows.length;
      //var start = row is 0, column is mj
      var row = 0;
      var column = majorDiagonalColumnIndexAtFirstRow;
      //var counter = 0
      var counter = 0;
      //iterate rows.length
      for (column; column < rows.length; column++, row++) {
        // if column < 0
        if (column < 0) {
          continue;
        } else if ((row >= n) || (column >= n)) {
          //else if row or column >== n
          //return counter
          return counter > 1;
        } else {
          //else
          //if current element contains a piece, increment counter
          counter += rows[row][column];
          //if counter > 1, return false
          if (counter > 1) {
            return true;
          }//if
        }//else
      }//for
      // return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // Find n for our board and store it in a variable
      var n = this.get('n');
      // Set column start point to -(n-1) === -n+1
      var column = -(n - 1);
      // Iterate over the board starting at column ending at n-1
      for (column; column < n; column++) {
        // If hasMajorDiagonalConflictAt(column) === true
        if (this.hasMajorDiagonalConflictAt(column) === true) {
          // Return true
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // Create rows variable containing the current rows
      var rows = this.rows();
      // Create a variable for n
      var n = rows.length;
      // Create a row variable and instantiate it to zero
      var row = 0;
      // Create a column variable and set it to minorDiagonalColumnIndexAtFirstRow
      var column = minorDiagonalColumnIndexAtFirstRow;
      // Create a counter variable, set it to 0
      var counter = 0;
      // Iterate over the board starting at column
      for (column; column >= 0; column--, row++) {
        // If column is greater than or equal to n
        if (column >= n) {
          // skip the current iteration
          continue;
        } else if (row >= n || column < 0) {
          // Else if row >= n or column less than zero
          // return counter > 1
          return counter > 1;
        } else {
          // Else add the contents to counter
          counter += rows[row][column];
          // If counter is greater than one
          if (counter > 1) {
            // Return true
            return true;
          }
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // Find n for our board and store it in a variable
      var n = this.get('n');
      // Set column start point to -(n-1) === -n+1
      var column = 2 * n - 1;
      // Iterate over the board starting at column ending at n-1
      for (column; column >= 0; column--) {
        // If hasMinorDiagonalConflictAt(column) === true
        if (this.hasMinorDiagonalConflictAt(column) === true) {
          // Return true
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());


// Board methods defined in Board.js
//   rows
//   togglePiece
//   _getFirstRowColumnIndexForMajorDiagonalOn
//   _getFirstRowColumnIndexForMinorDiagonalOn
//   hasAnyRooksConflicts
//   hasAnyQueenConflictsOn
//   hasAnyQueensConflicts
//   _isInBounds

// Board methods defined in backbone.js

//   toJSON
//   sync
//   get
//   escape
//   has
//   set
//   unset
//   clear
//   fetch
//   save
//   destroy
//   url
//   parse
//   clone
//   isNew
//   hasChanged
//   changedAttributes
//   previous
//   previousAttributes
//   _.validate
//   _.extend
// also has array methods:
// 	push
// 	slice
// 	splice