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
  // declare a new board
  var solution = new Board({n:n});
  // populate the diagonal
  for (var i=0; i<n; i++) {
    solution.togglePiece(i,i);
  }
  // return board

  // we will need to change the board with togglePiece(x, y)

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function(n) {
    if(n===1) return 1;
    return n*factorial(n-1);
  };
  var solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  var callback = function(board) {
    // set solution to board matrix
    solution = new Board(board.rows());
  };
  // call helperfunction
  helpFunction(new Board({n:n}), n, callback, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // solutions object contains solution boards
  var solutions = {};
  var counter = 0;

  // callback function that just increments solution count when a solution is found
  var pushSolutions = function(board) {counter++;};
  // call helper funciton with callback
  helpFunction(new Board({n:n}), n, pushSolutions, 0);

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  console.log('Number of solutions for ' + n + ' queens:', counter);

  // return solutionCount;
  return counter;
};

// below helper function is a recursion function that will have 2 nested for loops
// we will try to add a queen to an x,y position onto the board
// check if that resulting board violates any attacks
// if there are no attacks, recurse the function call with the resultant board, and 1 fewer queen left
// do the above said loops and queen placements only if number of queens left is more than zero
// if queens left is 0, invoke the callback function
function helpFunction(board, n, callback, rowBlocked) {
  // check basecase
  // n is zero
  if(n===0) {
    // invoke the callback with the board
    callback(board);
  }
  // else case
  else {
    // get the board
    var matrix = board.rows();
    // two nested for loops that iterate over the matrix
    // for all rows
    for (var i=rowBlocked; i<matrix.length; i++) {
      // for all cols
      for (var j=0; j<matrix.length; j++) {
        // if currentSpot doesn't have a queen
        if (matrix[i][j]===0) {
          // add queen to currentSpot
          board.togglePiece(i,j);
          // check conflicts at currentSpot
          if(!board.hasAnyQueenConflictsOn(i,j)) {
          // if no conflicts
            // recurse(board, n-1) 
            helpFunction(board, n-1, callback, i+1);
          }
          // remove the queen from currentSpot
          board.togglePiece(i,j);
        }
      }
    }
  }
};



































