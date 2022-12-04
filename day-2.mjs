import {
  getSum,
  readInputFile,
} from './utils.mjs';

/**
 * Get the points for a round of the game using the uh, interesting interpretation of the playbook.
 *
* @param {Array} shapes
 * @param {string} shapes[0] opponentShape
 * @param {string} shapes[1] playerShape
 * @returns {number}
 */
const getRoundOneScore = ([opponentShape, playerShape]) => {
  // Round One assumes A, X: Rock; B, Y: Paper, C, Z: Scissors
  const shapePoints = {
    X: 1, // Rock 1
    Y: 2, // Paper 2
    Z: 3, // Scissors 3
  };
  const playPoints = {
    AX: 3, // Rock rock, tie
    AY: 6, // Rock paper, player wins
    AZ: 0, // Rock scissors, opponent wins
    BX: 0, // Paper rock, opponent wins
    BY: 3, // Paper paper, tie
    BZ: 6, // Paper scissors, player wins
    CX: 6, // Scissors rock, player wins
    CY: 0, // Scissors paper, opponent wins
    CZ: 3, // Scissors scissors, tie
  };
  return playPoints[`${opponentShape}${playerShape}`] + shapePoints[playerShape];
};

/**
 * Get the points for a round of the game using the uh, even more interesting interpretation
 * of the playbook. Who writes these things?
 *
* @param {Array} shapes
 * @param {string} shapes[0] opponentShape
 * @param {string} shapes[1] playerShape
 * @returns {number}
 */
const getRoundTwoScore = ([opponentShape, intendedOutcome]) => {
  // Round Two assumes X: Lose, Y: Draw, Z: Win
  const shapePoints = {
    A: 1, // Rock 1
    B: 2, // Paper 2
    C: 3, // Scissors 3
  };
  const playPoints = {
    AA: 3, // Rock rock, tie
    AB: 6, // Rock paper, player wins
    AC: 0, // Rock scissors, opponent wins
    BA: 0, // Paper rock, opponent wins
    BB: 3, // Paper paper, tie
    BC: 6, // Paper scissors, player wins
    CA: 6, // Scissors rock, player wins
    CB: 0, // Scissors paper, opponent wins
    CC: 3, // Scissors scissors, tie
  };
  const counterShapes = {
    AX: 'C', // opponent plays rock, player needs to lose, so player plays scissors
    AY: 'A', // opponent plays rock, player needs ot tie, so player plays rock
    AZ: 'B', // opponent plays rock, player needs to win, so player plays paper
    BX: 'A', // opponent plays paper, player needs to lose, so player plays rock
    BY: 'B', // opponent plays paper, player needs to draw, so player plays paper
    BZ: 'C', // opponent plays paper, player needs to win, so player plays scissors
    CX: 'B', // opponent plays scissors, player needs to lose, so player plays paper
    CY: 'C', // opponent plays scissors, player needs to draw, so player plays scissors
    CZ: 'A', // opponent plays scissors, player needs to win, so player plays rock
  };
  const playerShape = counterShapes[`${opponentShape}${intendedOutcome}`];
  return playPoints[`${opponentShape}${playerShape}`] + shapePoints[playerShape];
};

/**
 * Do the thing.
 */
const main = async () => {
  const values = await readInputFile('day-2', ['\n', ' ']);
  const partOneScore = getSum(values.map((game) => getRoundOneScore(game)));
  const partTwoScore = getSum(values.map((game) => getRoundTwoScore(game)));

  console.log('Part 1', partOneScore);
  console.log('Part 2', partTwoScore);
};

main();
