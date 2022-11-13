const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

suite('UnitTests', () => {

    test('Logic handles a valid puzzle string of 81 characters', function(done) {
        let result = solver.validate("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..");
        assert.isTrue(result, "Valid puzzle string should return true");
        done();
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
        let result = solver.validate("..9.-5.1.85.4....2432......1..A69.83.9.....6.62.71...9......1945....4.37.4.3..6..");
        assert.isFalse(result, "Invalid puzzle string should return false");
        done();
    });

    test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
        let result = solver.validate("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......19");
        assert.isFalse(result, "Puzzle string that is not 81 characters long should return false");
        done();
    });

    test('Logic handles a valid row placement', function(done) {
        const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let result = solver.checkRowPlacement(puzzleString, 'G', 4, 6);
        assert.isTrue(result, "Valid row placement should return true");
        done();
    });

    test('Logic handles an invalid row placement', function(done) {
        const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let result = solver.checkRowPlacement(puzzleString, 'G', 4, 9);
        assert.isFalse(result, "Invalid row placement should return false");
        done();
    });

    test('Logic handles a valid column placement', function(done) {
        const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let result = solver.checkColPlacement(puzzleString, 'G', 1, 2);
        assert.isTrue(result, "Valid column placement should return true");
        done();
    });

    test('Logic handles an invalid column placement', function(done) {
        const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let result = solver.checkColPlacement(puzzleString, 'G', 1, 8);
        assert.isFalse(result, "Invalid column placement should return false");
        done();
    });

    test('Logic handles a valid region (3x3 grid) placement', function(done) {
        const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let result = solver.checkRegionPlacement(puzzleString, 'I', 8, 2);
        assert.isTrue(result, "Valid region placement should return true");
        done();
    });

    test('Logic handles an invalid region (3x3 grid) placement', function(done) {
        const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let result = solver.checkRegionPlacement(puzzleString, 'I', 8, 9);
        assert.isFalse(result, "Invalid region placement should return false");
        done();
    });
});
