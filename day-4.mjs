import {
  getSum,
  readInputFile,
} from './utils.mjs';

const findFullyContainedAssignments = ([
  [range1Start, range1End],
  [range2Start, range2End],
]) => ((
  Number(range1Start) >= Number(range2Start)
    && Number(range1End) <= Number(range2End)
) || (
  Number(range2Start) >= Number(range1Start)
    && Number(range2End) <= Number(range1End)
)
  ? 1
  : 0);

const findOverlappingAssignments = ([
  [range1Start, range1End],
  [range2Start, range2End],
]) => ((
  Number(range1End) >= Number(range2Start)
    && Number(range1Start) <= Number(range2Start)
) || (
  Number(range2End) >= Number(range1Start)
    && Number(range2Start) <= Number(range1Start)
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
