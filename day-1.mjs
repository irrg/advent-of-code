import {
  getSum,
  getNHighestValues,
  readInputFile,
} from './utils.mjs';

/**
 * Do the thing.
 */
const main = async () => {
  const values = (await readInputFile('day-1', ['\n\n', '\n']))
    .map((elf) => getSum(elf));

  console.log('Part 1', getNHighestValues(values, 1));
  console.log('Part 2', getNHighestValues(values, 3));
};

main();
