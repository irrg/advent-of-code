const utils = require('./utils.js');

/**
 * Slice off just the bit you want to example across all values
 */
const getBitsAtPosition = (values, position) => v = values.map((value) => value.substr(position, 1));

const compareBits = (bits, type) => {
  const zeroCount = bits.filter((bit) => bit == 0).length;
  const oneCount = bits.length - zeroCount;

  if (type === 'epsilon') {
    return oneCount < zeroCount ? '1' : '0';
  } else {
    return oneCount > zeroCount ? '1' : '0';
  }
};

/**
 * Get the rate of a specific type for a set of diagnostic values
 */
const getRate = (values, type) => {
  const positions = [...Array(values[0].length).keys()];
  let resultRate = '';

  positions.forEach(position => {
    const bits = getBitsAtPosition(values, position);
    resultRate += compareBits(bits, type);
  });

  return parseInt(resultRate, 2);
};

const main = async () => {
  const values = await utils.readInputFile(3);

  console.log('Part 1', getRate(values, 'gamma') * getRate(values, 'epsilon'));
  // console.log('Part 1', calculatePosition(values));
  // console.log('Part 2', calculatePosition(values, true));
};

main();
