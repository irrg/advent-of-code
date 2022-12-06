import {
  readInputFile,
} from './utils.mjs';

/**
 * Find a marker inside some elf gobledegook message.
 *
 * @param {Array} lineArray array of symbols in a single data burst
 * @param {number} markerSize number of symbols in the marker we're looking for
 * @returns {number} the index of the marker, or -1 if not found
 */
const findMarker = (lineArray, markerSize = 4) => {
  for (let i = 0; i < lineArray.length; i += 1) {
    const snippet = new Set(lineArray.slice(i, i + markerSize));
    if (snippet.size === markerSize) {
      return i + markerSize;
    }
  }
  return -1;
};

/**
 * Do the thing.
 */
const main = async () => {
  // the first half of the file before \n\n is the stack definitions;
  // the rest are the moves.
  const lineArray = (await readInputFile({
    filename: 'day-6',
    delimiters: ['\n', ''],
  }))[0];

  const partOneResult = findMarker(lineArray);
  const partTwoResult = findMarker(lineArray, 14);

  console.log('part 1', partOneResult);
  console.log('part 2', partTwoResult);
};

main();
