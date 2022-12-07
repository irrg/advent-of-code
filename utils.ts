import { readFile } from 'fs/promises';

/**
 * Sum up the values in an array.
 *
 * @param {Array} values array of values
 * @returns {number} sum of the values in the array
 */
const getSum = (values: number[]) => values.reduce(
  (total, i) => total + Number(i),
  0,
);

/**
 * Get the highest n values from an array.
 *
 * @param {Array} values array of values
 * @param {number} n number of values we want
 * @returns {Array} found values
 */
const getNHighestValues = (values: number[], n: number) => getSum(
  values
    .sort((a, b) => a - b)
    .slice(-n),
);

/**
 * Recursively split an array of values based on one or more delimiters.
 *
 * @param {string} string string to manipulate
 * @param {Array} delimiters one or more delimiters
 * @param {boolean} parseNumbers should we parse numbers or leave (for strings)
 * @returns {Array} split up array
 */
const recursiveSplit = (
  string: string,
  delimiters: string[],
): any => 
    delimiters.length 
      ? string
        .split(delimiters[0]!)
        .map(
          (subString: string) => recursiveSplit(
            subString,
            delimiters.slice(1),
          ),
        )
      : string;

/**
 * Read a file in a promise and split it into an array based on one or more delimiters.
 *
 * @param {string} filename name of the file in the input folder
 * @param {Array} delimiters one or more delimiters
 * @param {boolean} parseNumbers should we parse numbers or leave (for strings)
 * @returns {Array} split file structure
 */
const readInputFile = async (
  filename: string,
  delimiters: string[] = ['\n'],
): Promise<string[]> => {
  try {
    const data: string = await readFile(`./input/${filename}.txt`, 'utf8');
    return recursiveSplit(
      data,
      delimiters,
    );
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Chunk an array up into sets of n
 *
 * @param {Array} array any array
 * @param {number} n number of array entries per set
 * @returns {Array} chunked up array
 */
const splitUpArray = (array: any[], n: number) => {
  const sourceArray = [...array];
  const targetArray = [];

  while (sourceArray.length) {
    targetArray.push(sourceArray.splice(0, n));
  }

  return targetArray;
};

/**
 * Transpose array helper, because these advents need this too much.
 *
 * @param {Array} array array to traverse
 * @returns {Array} transposed array
 */
const transposeArray = (array: any[]) => array[0]
  .map((_:any, index: number) => array
    .map((item) => item[index]));

export {
  getNHighestValues,
  getSum,
  readInputFile,
  recursiveSplit,
  splitUpArray,
  transposeArray,
};
