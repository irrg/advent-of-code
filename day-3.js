const utils = require('./utils.js');

/**
 * Slice off just the bit you want to example across all values
 *
 * @param {Array} values
 * @param {number} position
 * @returns Array
 */
const getBitsAtPosition = (values, position) => v = values.map((value) => value.substr(position, 1));

/**
 * Compare this bits in a single slice and determine the total number of 1 and 0 values.
 * @param {Array} bits
 * @returns object
 */
const compareBits = (bits) => {
  const zeroCount = bits.filter((bit) => bit == 0).length;

  return {
    zeroCount,
    oneCount: bits.length - zeroCount,
  };
};

/**
 * Get the gamma or epsilon rate for a set of diagnostic values
 *
 * @param {Array} values
 * @param {string} type - 'gamma', 'epsilon'
 * @returns number
 */
const getPowerConsumptionRate = (values, type) => {
  const positions = [...Array(values[0].length).keys()];
  let resultRate = '';

  positions.forEach(position => {
    const { zeroCount, oneCount } = compareBits(getBitsAtPosition(values, position));

    if (type === 'epsilon') {
      resultRate += oneCount < zeroCount ? '1' : '0';
    } else {
      resultRate += oneCount > zeroCount ? '1' : '0';
    }
  });

  return parseInt(resultRate, 2);
};

/**
 * Get the life support rating for oxygen or CO2
 *
 * @param {Array} values
 * @param {string} type - 'oxygen', 'CO2'
 * @returns number
 */
const getLifeSupportRating = (values, type) => {
  const positions = [...Array(values[0].length).keys()];
  let localValues = [...values];

  positions.forEach(position => {
    const { zeroCount, oneCount } = compareBits(getBitsAtPosition(localValues, position));

    if (localValues.length > 1) {
      if (oneCount === zeroCount) {
        decidingBit = type === 'CO2' ? '0' : '1';
      } else if (type === 'CO2') {
        decidingBit = oneCount < zeroCount ? '1' : '0';
      } else {
        decidingBit = oneCount > zeroCount ? '1' : '0';
      }

      localValues = localValues.filter((value) => value.substr(position, 1) === decidingBit);
    }
  });

  return parseInt(localValues[0], 2);
};

/**
 * Do the thing.
 */
const main = async () => {
  const values = await utils.readInputFile(3);

  console.log('Part 1', getPowerConsumptionRate(values, 'gamma') * getPowerConsumptionRate(values, 'epsilon'));
  console.log('Part 2', getLifeSupportRating(values, 'oxygen') * getLifeSupportRating(values, 'CO2'));
};

main();
