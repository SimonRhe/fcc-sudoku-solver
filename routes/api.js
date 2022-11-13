'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      console.log("POST TO /api/check");

      /* If the object submitted to /api/check is missing puzzle, coordinate or value, the returned value 
      will be { error: Required field(s) missing } */
      if (req.body.puzzle == undefined  || req.body.coordinate == undefined || req.body.value == undefined) {
        console.log("error Required field(s) missing: req.body: ", req.body);
        return res.json({ error: "Required field(s) missing" });
      }

      let puzzleString = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;
      console.log("puzzleString length:", puzzleString.length, "; string:", puzzleString, "\nCoordinate", coordinate, "; value", value);
      



      /* If the puzzle submitted to /api/check is greater or less than 81 characters, the returned value 
         will be { error: 'Expected puzzle to be 81 characters long' } */
      if (puzzleString.length != 81) {
        console.log("error: 'Expected puzzle to be 81 characters long'");
        return res.json({error: 'Expected puzzle to be 81 characters long' });
      }

      /* If the puzzle submitted to /api/check contains values which are not numbers or periods, the returned value 
         will be { error: 'Invalid characters in puzzle' } */
      let validPuzzle = solver.validate(puzzleString);
      console.log("validPuzzle", validPuzzle);
      if (!validPuzzle) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }    

      /* If the coordinate submitted to api/check does not point to an existing grid cell, the returned value 
      will be { error: 'Invalid coordinate'} */
      let cRow = coordinate.charAt(0);
      let cColumn = parseInt(coordinate.charAt(1));
      console.log("column", coordinate.charAt(1), "parseInt(column)", cColumn);
      let cRowNumber = solver.getRowNumber(cRow);
      if ( isNaN(cColumn) || cColumn < 1 || cColumn > 9 || cRowNumber < 1 || cRowNumber > 9) {
        return res.json({ error: 'Invalid coordinate' });
      }

      /* If the value submitted to /api/check is not a number between 1 and 9, the returned values 
         will be { error: 'Invalid value' } */
      const validValues = /^[1-9]{1}$/;
      if ( !validValues.test(value)) {
        return res.json({ error: 'Invalid value' });
      }
      

      /* If value submitted to /api/check is already placed in puzzle on that coordinate, the returned value will
      be an object containing a valid property with true if value is not conflicting. */
      if (solver.getValueAt(puzzleString, cRow, cColumn) == value) {
        return res.json({valid: true});
      }

      /* The return value from the POST to /api/check will be an object containing a valid property, which is true 
      if the number may be placed at the provided coordinate and false if the number may not. If false, the 
      returned object will also contain a conflict property which is an array containing the strings "row", 
      "column", and/or "region" depending on which makes the placement invalid. */
      let resultRow = solver.checkRowPlacement(puzzleString, cRow, cColumn, value);
      let resultCol = solver.checkColPlacement(puzzleString, cRow, cColumn, value);
      let resultReg = solver.checkRegionPlacement(puzzleString, cRow, cColumn, value);

      let conflicts = [];
      if (!resultRow) conflicts.push("row");
      if (!resultCol) conflicts.push("column");
      if (!resultReg) conflicts.push("region");

      if (conflicts.length == 0) {
        return res.json({valid: true});
      }

      return res.json({valid: false, conflict: conflicts});

      /* 
      You can POST to /api/check an object containing puzzle, coordinate, and value where the coordinate is the letter A-I indicating the row, followed by a number 1-9 indicating the column, and value is a number from 1-9.








      */




    });
    
  app.route('/api/solve')
    .post((req, res) => {
      //console.log("POST TO /api/solve");
      let puzzleString = req.body.puzzle;
      //console.log("puzzleString length:", puzzleString.length, "; string:", puzzleString);
      let validPuzzle = solver.validate(puzzleString);
      //console.log("validPuzzle", validPuzzle);

      let result = solver.solve(puzzleString);
      return res.json({solution: result});


    });
};
