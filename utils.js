const { readFile } = require('fs/promises');

/**
 * Recursively split an array of values based on one or more delimiters.
 *
 * @param {string} string
 * @param {Array} delimiters
 * @returns Array
 */
const recursiveSplit = (string, delimiters) => {
  return delimiters.length
    ? string.split(delimiters[0]).map(x => recursiveSplit(x, delimiters.slice(1)))
    : string;
};

/**
 * Read a file in a promise and split it into an array based on one or more delimiters.
 *
 * @param {string} fileName
 * @param {Array} delimiters
 * @returns Array
 */
const readInputFile = async (fileName, delimiters = ['\n']) => {
  try {
    const data = await readFile(`./input/${fileName}.txt`, 'utf8');
    return delimiters.length
      ? recursiveSplit(data, delimiters)
      : data;
  }
  catch(err) {
    console.log(err);
  }
}

/**
 * Sum up the values in an array.
 *
 * @param {Array} values
 * @returns number
 */
const getSum = (values) => values.reduce((total, i) => total + parseInt(i), 0);

/**
 * Get the highest n values from an array.
 *
 * @param {Array} values
 * @param {number} n
 * @returns Array
 */
const getNHighestValues = (values, n) => getSum(values.sort((a, b) => a - b).slice(-n));

module.exports = {
  readInputFile,
  getSum,
  getNHighestValues,
};