const utils = require('./utils.js');

/**
 * Do the thing.
 */
const main = async () => {
  const values = (await utils.readInputFile(1)).map((v) => Number(v));

  console.log('async read values', values);
  console.log('Part 1', 'your answer here');
  console.log('Part 2', 'your answer here');
};

main();