import {
  readInputFile,
} from './utils.mjs';

/**
 * Do the thing.
 */
const main = async () => {
  const crateFile = await readInputFile({
    filename: 'day-5',
    delimiters: ['\n\n'],
  });

  console.log(crateFile);
};

main();
