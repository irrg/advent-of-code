const { readFile } = require('fs/promises');

/**
 * Read a file in a promise and split it into lines.
 *
 * @param {Number} day
 * @param {Boolean} example
 * @returns Array
 */
const readInputFile = async (day, example = false) => {
  try {
    const data = await readFile(`./input/day-${day}${example ? '-example' : ''}.txt`, 'utf8');
    return data.split('\n');
  }
  catch(err) {
    console.log(err);
  }
}

module.exports = { readInputFile };