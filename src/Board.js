// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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
      // return false; // fixme
      // get the rows out at that index
      var currentRow = this.rows()[rowIndex];
      // then iterate through that row
        // see if there's more than one piece in this row
          // return true
      // return false

      // use reduce 
      return (_.reduce(currentRow, function(accumulator, value){return accumulator+value;}) > 1);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // return false; // fixme
      // keep track of row's length
      var n = this.rows().length;
      // initialize a conflict variable as false
      var conflict = false;
      // loop from 0 to length of matrix
      for (var i=0; i<n; i++) {
        // call hasRowConflictAt(index) and store result
        // if above call produces true
        if(this.hasRowConflictAt(i)){
          // set conflict variable to be true
          conflict = true;
        }
      }
      // return conflict variable
      return conflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // return false; // fixme
      // find this colum by itterating through each row
      var matrix = this.rows();
      // declare variable to store column information (an array)
      var thisColumn = [];
      // loop over each row
      for (var i = 0; i < matrix.length; i++){
        // push item at colIndex in the row in to the arary
        thisColumn.push(matrix[i][colIndex]);
      }
      // sum the elements of the array
      // if sum is greater than 1 
        // return true
      // return false
      return (_.reduce(thisColumn, function(accumulator, value){return accumulator + value;}) > 1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // return false; // fixme
      // loop over all the columns
      for(var i = 0; i < this.rows().length; i++){
        // call hasColConflict at each index for column
        if(this.hasColConflictAt(i)){
          // if result is true return true
          return true;
        }
      }
      // return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // // return false; // fixme
      var MDCIAFR = majorDiagonalColumnIndexAtFirstRow;
      // get the matrix out
      var matrix = this.rows();
      // initialize a counter to keep track of how many 1's are in this diagonal
      var counter = 0;
      // iterate through the rows, with index i
      for(var i=0; i<matrix.length; i++) {
        // see if we can access rows[i][checkIndex] (i + CIAFR = checkIndex is in bounds)
        if(i+MDCIAFR < matrix.length && i+MDCIAFR>=0) {
          // check if rows[i][i+CIAFR] has 1
          counter+=matrix[i][i+MDCIAFR];
        }
      }
      // if counter>1
        // return true
      // else return false
      return counter>1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // return false; // fixme
      // let n be the matrix length
      var n = this.rows().length;
      // loop via index i, from -(n-1) to (n-1)
      for (var i = -(n-1); i <= (n-1); i++) {
        // call hasMajorDiagonalConflictAt(i), if true
        if(this.hasMajorDiagonalConflictAt(i)) {
          // return true
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
      // return false; // fixme
      // keep track of sum
      var sum = 0;
      // get the matrix
      var matrix = this.rows();
      // iterate over matrix rows
      for(var i = 0; i < matrix.length; i ++){
        // if matrix[i, os -i] is accessable
        if(minorDiagonalColumnIndexAtFirstRow - i >= 0 && minorDiagonalColumnIndexAtFirstRow - i < matrix.length){
          // add value at element to sum
          sum += matrix[i][minorDiagonalColumnIndexAtFirstRow - i];
        }
      }
      // return if sum is greater than 1
      return (sum > 1);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // return false; // fixme
      var n = this.rows().length;
      // from include 0 to not include n*2 - 1
      for(var i = 0; i < (2 * n - 1); i++){
        // run check minor diagonal conflict at that index
        if(this.hasMinorDiagonalConflictAt(i)){
          // if result is true return true
          return true;
        }
      }
      // return false
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
