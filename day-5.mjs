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
const parseStacks = (stacks) => transposeArray(
  stacks
    .split('\n') // split into rows
    .map((stack) => stack.match(/.{1,4}/g) || []) // split into columns
    .reverse() // so that the bottom of the stack is the first column
    .map((row) => row
      .map((cell) => cell.replace(/\W/g, ''))), // strip spaces and brackets
)
  .map((column) => {
    const newColumn = [...column];
    return {
      column: Number(newColumn.shift()), // first item is the column number
      items: newColumn.filter((cell) => cell), // remove empty cells
    };
  });

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
 * Do the thing.
 */
const main = async () => {
  // the first half of the file before \n\n is the stack definitions;
  // the rest are the moves.
  const [stacks, moves] = (await readInputFile({
    filename: 'day-5-example',
    delimiters: ['\n\n'],
  }));

  const stacksParsed = parseStacks(stacks);
  const movesParsed = parseMoves(moves);

  console.log(stacksParsed, movesParsed);
};

main();
