const utils = require('./utils.js');

/**
 * Do the thing.
 */
const main = async () => {
  const values = (await utils.readInputFile('day-1', ['\n\n', '\n']))
    .map(elf => utils.getSum(elf));

  console.log('Part 1', utils.getNHighestValues(values, 1));
  console.log('Part 2', utils.getNHighestValues(values, 3));
};

main();