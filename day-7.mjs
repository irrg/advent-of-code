import {
  readInputFile,
} from './utils.mjs';

/**
 * Parse the whole transcript into a directory/file hierarchy.
 *
 * @param {Array} transcript array of lines from the transcript
 * @returns {Array} parsed transcript
 */
const parseTranscript = (transcript) => transcript;

/**
 * Do the thing.
 */
const main = async () => {
  // the first half of the file before \n\n is the stack definitions;
  // the rest are the moves.
  const lineArray = (await readInputFile({
    filename: 'day-7-example',
    delimiters: ['\n'],
  }))[0];

  const parsedTranscript = parseTranscript(lineArray);
  console.log(parsedTranscript);

  const partOneResult = true;
  const partTwoResult = true;

  console.log('part 1', partOneResult);
  console.log('part 2', partTwoResult);
};

main();
