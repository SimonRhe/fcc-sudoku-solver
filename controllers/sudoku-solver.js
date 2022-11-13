class SudokuSolver {

  /** Returns row number (between 1 and 9) */
  getRowNumber(rowLetter) {
    return rowLetter.charCodeAt(0) - "A".charCodeAt(0) + 1; // 1 to 9
  }

  /** The validate function should take a given puzzle string and check it to see if it has 81 valid characters for the input. */
  validate(puzzleString) {
    const regex = /[1-9\.]{81}/;
    let result = regex.test(puzzleString);
    //console.log("Valid result: ", result);
    return result;
  }

  /** Returns the value at row and column */
  getValueAt(puzzleString, row, column) {
    let rowNumber = this.getRowNumber(row);
    let rowColPosition = ((rowNumber - 1) * 9) + (column - 1);
    //console.log("rowColPosition: ", rowColPosition, "charAt:", puzzleString.charAt(rowColPosition));
    return puzzleString.charAt(rowColPosition);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowNumber = this.getRowNumber(row);
    //console.log("Row", row, "; row number", rowNumber);
    let startPosition = 9 * (rowNumber - 1);
    let rowContent = puzzleString.substring(startPosition, startPosition + 9);
    //console.log("Row", row, "rowNumber", rowNumber, "Start position", startPosition, "Row content", rowContent);

    // if value already in rowContent, then not valid
    let result = !rowContent.includes(value);
    //console.log("Row placement valid:", result);
    return result;


  }

  checkColPlacement(puzzleString, row, column, value) {
    let colContent = "";
    for (let i = column - 1; i < 81; i += 9) {
      colContent += puzzleString.charAt(i);
    }
    //console.log("colContent", colContent);
    let result = !colContent.includes(value);
    //console.log("Column placement valid:", result);
    return result;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let rowNumber = this.getRowNumber(row);
    let adjRow = (rowNumber - 1 - ( (rowNumber - 1) % 3));
    let adjCol = (column - 1 - ( (column - 1) % 3));
    let startPosition = (9 * adjRow) + adjCol; // top left corner
    //console.log("Row", row, "column", column, "\nAdj row", adjRow, "; Adj col", adjCol, "; startPosition", startPosition);

    
    let regionContent = "";
    let i = startPosition;
    for (let lineCount = 0; lineCount < 3; lineCount++) {
      regionContent += puzzleString.substring(i, i+3);
      i += 9;
    }
    //console.log("Region content:", regionContent);

    let result = !regionContent.includes(value);
    //console.log("Region placement valid:", result);
    return result;


  }

  solve(puzzleString) {
    // brute force solution
    this.recursiveSolveCounter = 0;
    return this.recursiveSolve(puzzleString);
 
   
  }

  getRowColFromPosition(position) {
    let row = String.fromCharCode(Math.floor(position / 9) + "A".charCodeAt(0));
    let column = (position % 9) + 1;
    return [row, column];
  }

  /** if no possible solution, returns "e"; if solution found, returns solution puzzle string */
  recursiveSolve(currentPuzString) {
    //console.log("*****************STARTING");
    this.recursiveSolveCounter++;
    if (this.recursiveSolveCounter > 500000) {
      console.log("STOPPING RECURSION AT", this.recursiveSolveCounter);
      return "e";
    }

    let currentPosition = currentPuzString.indexOf('.');

    if (currentPosition == -1) {
      console.log("SOLVED!", currentPuzString);
      return currentPuzString; // CORRECT SOLUTION WAS FOUND!
    }
    let currentRow;
    let currentCol;
    [currentRow, currentCol] = this.getRowColFromPosition(currentPosition);

    //console.log(this.recursiveSolveCounter, ": position:", currentPosition, currentRow, currentCol, ":", currentPuzString);


    for (let t = 1; t <= 9; t++) {
      let testRow = this.checkRowPlacement(currentPuzString, currentRow, currentCol, t); 
      let testCol = this.checkColPlacement(currentPuzString, currentRow, currentCol, t);
      let testReg = this.checkRegionPlacement(currentPuzString, currentRow, currentCol, t);
      if (testRow && testCol && testReg) {
        //console.log("All tests pass!!!!!!");
        // console.log("currentPosition", currentPosition, "1st substring:", currentPuzString.substring(0, currentPosition), "t", t);
        let newPuzString = "" + currentPuzString.substring(0, currentPosition) + t + currentPuzString.substring(currentPosition + 1);
        //console.log("New puz string", newPuzString);
        let result = this.recursiveSolve(newPuzString);
        if (result != "e") {
          return result;
        }
      }    
    }
    return "e"; // IMPOSSIBLE
  }
}

module.exports = SudokuSolver;

