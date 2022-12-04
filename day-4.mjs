import {
  getSum,
  readInputFile,
} from './utils.mjs';

/**
 * Determine if for two ranges, one completely contains the other.
 * P.S. The jsdoc below feels like i'm abusing jsdoc.
 *
 * @param {Array} team team of two elves
 * @param {number} team."0" range 1
 * @param {number} team."1" range 2
 * @returns {number} number-based bool result
 */
const findFullyContainedAssignments = ([
  [range1Start, range1End],
  [range2Start, range2End],
]) => ((range1Start >= range2Start && range1End <= range2End)
  || (range2Start >= range1Start && range2End <= range1End)
  ? 1
  : 0);

/**
 * Determine if for two ranges overlap.
 * P.S. The jsdoc below feels like i'm abusing jsdoc.
 *
 * @param {Array} team team of two elves
 * @param {number} team."0" range 1
 * @param {number} team."1" range 2
 * @returns {number} number-based bool result
 */
const findOverlappingAssignments = ([
  [range1Start, range1End],
  [range2Start, range2End],
]) => ((
  (range1End >= range2Start)
  && (range1Start <= range2Start)
) || (
  (range2End >= range1Start)
  && (range2Start <= range1Start)
)
  ? 1
  : 0);

/**
 * Do the thing.
 */
const main = async () => {
  const teams = await readInputFile({
    filename: 'day-4',
    delimiters: ['\n', ',', '-'],
    parseNumbers: true,
  });

  const fullyContainedAssignments = getSum(teams.map(
    (team) => findFullyContainedAssignments(team),
  ));

  const overlappingAssignments = getSum(teams.map(
    (team) => findOverlappingAssignments(team),
  ));

  console.log('round 1', fullyContainedAssignments);
  console.log('round 2', overlappingAssignments);
};

main();
