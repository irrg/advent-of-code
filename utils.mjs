import { readFile } from 'fs/promises';

/**
 * Sum up the values in an array.
 *
 * @param {Array} values
 * @returns {number}
 */
const getSum = (values) => values.reduce((total, i) => total + Number(i), 0);

/**
 * Get the highest n values from an array.
 *
 * @param {Array} values
 * @param {number} n
 * @returns {Array}
 */
const getNHighestValues = (values, n) => getSum(values.sort((a, b) => a - b).slice(-n));

/**
 * Recursively split an array of values based on one or more delimiters.
 *
 * @param {Object} payload
 * @param {string} payload.string
 * @param {Array} payload.delimiters
 * @param {boolean} payload.parseNumbers
 * @returns {Array}
 */
const recursiveSplit = (string, delimiters, parseNumber) => (delimiters.length
  ? string.split(delimiters[0]).map((x) => recursiveSplit(x, delimiters.slice(1), parseNumber))
  : parseNumber ? Number(string) : string);

/**
 * Read a file in a promise and split it into an array based on one or more delimiters.
 *
 * @param {string} fileName
 * @param {Array} delimiters
 * @returns {Array}
 */
const readInputFile = async ({
  filename,
  delimiters = ['\n'],
  parseNumbers = false,
}) => {
  try {
    const data = await readFile(`./input/${filename}.txt`, 'utf8');
    return recursiveSplit(data, delimiters, parseNumbers);
  } catch (err) {
    console.log(err);
    return '';
  }
};

/**
 * Chunk an array up into sets of n
 *
 * @param {Array} array
 * @param {number} n
 * @returns {Array}
 */
const splitUpArray = (array, n) => {
  const sourceArray = [...array];
  const targetArray = [];

  while (sourceArray.length) {
    targetArray.push(sourceArray.splice(0, n));
  }

  return targetArray;
};

export {
  getNHighestValues,
  getSum,
  readInputFile,
  recursiveSplit,
  splitUpArray,
};
