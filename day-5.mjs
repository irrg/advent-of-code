import {
  readInputFile,
  transposeArray,
} from './utils.mjs';

/**
 * Convert the stack section of the file into something usable.
 *
 * @param {Array} stacks array of stack definitions from the file
 * @returns {Array} transformed parsed stacks
 */
const parseStacks = (stacks) => {
  const parsedStacks = [];
  const transposedStacks = transposeArray(
    stacks
      .split('\n') // split into rows
      .map((stack) => stack.match(/.{1,4}/g) || []) // split into columns
      .reverse() // so that the bottom of the stack is the first column
      .map((row) => row
        .map((cell) => cell.replace(/\W/g, ''))), // strip spaces and brackets
  );

  transposedStacks.forEach((column) => {
    const newColumn = [...column];
    parsedStacks[newColumn.shift() - 1] = newColumn.filter((cell) => cell); // remove empty cells
  });

  return parsedStacks;
};

/**
 * Convert the moves section of the file into something usable.
 *
 * @param {Array} moves array of move definitions from the file
 * @returns {Array} cleaned and parsed moves
 */
const parseMoves = (moves) => moves
  .split('\n')
  .map((move) => {
    const [count, from, to] = move
      .replace(/[^\d.\s]/g, '') // remove the words
      .trim() // remove remaining before/after whitespace
      .split('  ') // split into 3 columns
      .map((number) => Number(number)); // cast to numbers
    return {
      count,
      from,
      to,
    };
  });

/**
 *
 * @param {object} payload the entire payload
 * @param {Array} payload.stacks the parsed stacks section of the data file
 * @param {Array} payload.moves the parsed moves section of the data file
 * @param {string} payload.model CrateMover model, 9000 or 9001
 * @returns {Array} the stacks after the moves are run
 */
const runCrateMover = ({
  stacks,
  moves,
  model,
}) => {
  const localStacks = JSON.parse(JSON.stringify(stacks));

  moves.forEach(({ count, from, to }) => {
    const fromStack = localStacks[from - 1];
    const toStack = localStacks[to - 1];
    const items = fromStack.splice(-count);

    if (model === 9000) {
      items.reverse();
    }

    toStack.push(...items);
  });

  // find the "message" in the stacks
  return localStacks
    .map((stack) => stack.pop())
    .join('');
};

/**
 * Do the thing.
 */
const main = async () => {
  // the first half of the file before \n\n is the stack definitions;
  // the rest are the moves.
  const [
    stacksDefinitions,
    movesDefinitions,
  ] = (await readInputFile({
    filename: 'day-5',
    delimiters: ['\n\n'],
  }));

  const stacks = parseStacks(stacksDefinitions);
  const moves = parseMoves(movesDefinitions);

  const step1Message = runCrateMover({
    stacks,
    moves,
    model: 9000,
  });
  const step2Message = runCrateMover({
    stacks,
    moves,
    model: 9001,
  });

  console.log('step 1', step1Message);
  console.log('step 2', step2Message);
};

main();
