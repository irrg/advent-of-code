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
 * @param {Array} stacksLines the unparsed stacks section of the data file
 * @param {Array} movesLines the unparsed moves section of the data file
 * @param {string} model CrateMover model, 9000 or 9001
 * @returns {Array} the stacks after the moves are run
 */
const runCrateMover = (stacksLines, movesLines, model) => {
  const stacks = parseStacks(stacksLines);
  const moves = parseMoves(movesLines);

  moves.forEach(({ count, from, to }) => {
    const fromStack = stacks[from - 1];
    const toStack = stacks[to - 1];
    const items = fromStack.splice(-count);

    if (model === 9000) {
      items.reverse();
    }

    toStack.push(...items);
  });

  return stacks;
};

/**
 * Get the "message" in the stacks
 *
 * @param {Array} stacks updated container stacks
 * @returns {string} the "message" in the stacks
 */
const getStacksMessage = (stacks) => stacks.map((stack) => stack.pop()).join('');

/**
 * Do the thing.
 */
const main = async () => {
  // the first half of the file before \n\n is the stack definitions;
  // the rest are the moves.
  const [stacksLines, movesLines] = (await readInputFile({
    filename: 'day-5',
    delimiters: ['\n\n'],
  }));

  const step1Stacks = runCrateMover(stacksLines, movesLines, 9000);
  const step2Stacks = runCrateMover(stacksLines, movesLines, 9001);

  console.log('step 1', getStacksMessage(step1Stacks));
  console.log('step 2', getStacksMessage(step2Stacks));
};

main();
