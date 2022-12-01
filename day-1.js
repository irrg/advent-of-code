const utils = require('./utils.js');

const getNHighestValues = (values, n) =>
    values
      .sort(function(a, b) {
        return a - b;
      })
      .slice(-n)
      .reduce((total, i) => total + i, 0);

/**
 * Do the thing.
 */
const main = async () => {
  const values = (await utils.readInputFile('day-1', '\n\n'))
    .map((v) => {
      return v
        .split('\n')
        .reduce((a, subValue) => a + parseInt(subValue), 0);
    });

  console.log('Part 1', getNHighestValues(values, 1));
  console.log('Part 2', getNHighestValues(values, 3));
};

main();