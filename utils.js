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

module.exports = {
  readInputFile,
};