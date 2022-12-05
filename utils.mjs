import { readFile } from 'fs/promises';

/**
 * Sum up the values in an array.
 *
 * @param {Array} values array of values
 * @returns {number} sum of the values in the array
 */
const getSum = (values) => values.reduce((total, i) => total + Number(i), 0);

/**
 * Get the highest n values from an array.
 *
 * @param {Array} values array of values
 * @param {number} n number of values we want
 * @returns {Array} found values
 */
const getNHighestValues = (values, n) => getSum(values.sort((a, b) => a - b).slice(-n));

/**
 * Recursively split an array of values based on one or more delimiters.
 *
 * @param {object} payload object payload
 * @param {string} payload.string string to manipulate
 * @param {Array} payload.delimiters one or more delimiters
 * @param {boolean} payload.parseNumbers should we parse numbers or leave (for strings)
 * @returns {Array} split up array
 */
const recursiveSplit = ({
  string,
  delimiters,
  parseNumbers,
}) => {
  console.log(string, delimiters.length, parseNumbers);
  return (delimiters.length 
    ? string.split(delimiters[0]).map((x) => recursiveSplit(x, delimiters.slice(1), parseNumbers))
    : parseNumbers ? Number(string) : string);
};

  // const recursiveSplit = ({
  //   string,
  //   delimiters,
  //   parseNumbers,
  // }) => (delimiters.length
  //   ? string.split(delimiters[0]).map((x) => recursiveSplit(x, delimiters.slice(1), parseNumbers))
  //   : parseNumbers ? Number(string) : string);
  
/**
 * Read a file in a promise and split it into an array based on one or more delimiters.
 *
 * @param {object} payload object payload
 * @param {string} payload.filename name of the file in the input folder
 * @param {Array} payload.delimiters one or more delimiters
 * @param {boolean} payload.parseNumbers should we parse numbers or leave (for strings)
 * @returns {Array} split file structure
 */
const readInputFile = async ({
  filename,
  delimiters = ['\n'],
  parseNumbers = false,
}) => {
  try {
    const data = await readFile(`./input/${filename}.txt`, 'utf8');
    const split = recursiveSplit({
      string: data,
      delimiters,
      parseNumbers,
    });
    console.log(split);
    return split;
  } catch (err) {
    console.log(err);
    return '';
  }
};

/**
 * Chunk an array up into sets of n
 *
 * @param {Array} array any array
 * @param {number} n number of array entries per set
 * @returns {Array} chunked up array
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
