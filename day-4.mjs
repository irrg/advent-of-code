import {
  getSum,
  readInputFile,
} from './utils.mjs';

/**
 * Determine if for two ranges, one completely contains the other.
 * P.S. The jsdoc below feels like i'm abusing jsdoc.
 *
 * @param {Array} team
 * @param {Array} team[0] range1
 * @param {Array} team[0][0] range1Start
 * @param {Array} team[0][1] range1End
 * @param {Array} team[1] range2
 * @param {Array} team[1][0] range2Start
 * @param {Array} team[1][1] range2End
 * @returns {number}
 */

const findFullyContainedAssignments = ([
  [range1Start, range1End],
  [range2Start, range2End],
]) => ((
  range1Start >= range2Start
    && range1End <= range2End
) || (
  range2Start >= range1Start
    && range2End <= range1End
)
  ? 1
  : 0);

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
  const teams = await readInputFile('day-4', ['\n', ',', '-'], true);

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
