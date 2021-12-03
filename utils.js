const { readFile } = require('fs/promises');

/**
 * Read a file in a promise and split it into lines.
 *
 * @param {Number} day
 * @param {Boolean} example
 * @returns Array
 *
 * You don't actually have to check if your slice has 3 values, because for this puzzle,
 * the sum of only two rolling values will be a lot lower than the last value so it'll
 * get eliminated that way.
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