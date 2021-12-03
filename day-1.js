const utils = require('./utils.js');

/**
 * You don't actually have to check if your slice has 3 values, because for this puzzle,
 * the sum of only two rolling values will be a lot lower than the last value so it'll
 * get eliminated that way.
 */
const generateWindowValues = (values) => values.reduce((windowValues, currentValue, currentIndex) => {
    windowValues.push(
      values
        .slice(currentIndex, currentIndex + 3)
        .reduce((sum, value) => sum += value, 0)
    );

    return windowValues;
  },
  []
);

/**
 * Compare values to determine how often the set values increase
 */
const compareValues = (values) => values.reduce((count, currentValue, currentIndex) => count + (values[currentIndex - 1] < currentValue ? 1 : 0), 0);

const main = async () => {
  const values = (await utils.readInputFile(1)).map((v) => Number(v));
  const windowValues = generateWindowValues(values);

  console.log('Part 1', compareValues(values));
  console.log('Part 2', compareValues(windowValues));
};

main();