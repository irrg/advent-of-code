const { readFile } = require('fs/promises');

/**
 * Read a file in a promise and split it into lines.
 *
 * @param {number} day
 * @param {boolean} example
 * @returns Array
 */
const readInputFile = async (day, example = false, split = '\n') => {
  try {
    const data = await readFile(`./input/day-${day}${example ? '-example' : ''}.txt`, 'utf8');
    return data.split(split);
  }
  catch(err) {
    console.log(err);
  }
}

/**
 * Transpose array helper, because these advents need this too much. 
 * 
 * @param {Array} m
 * @returns Array
 */
 const transposeArray = (m) => m[0].map((x,i) => m.map(x => x[i]));

module.exports = { 
  readInputFile,
  transposeArray,
};