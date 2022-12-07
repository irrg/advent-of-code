import {
  readInputFile,
  transposeArray,
} from './utils';

type Move = { 
  count: number, 
  from: number, 
  to: number,
};

/**
 * Convert the stack section of the file into something usable.
 *
 * @param {Array} stacks array of stack definitions from the file
 * @returns {Array} transformed parsed stacks
 */
const parseStacks = (stacksDefinitions: string): string[][] => {
  const parsedStacks: string[][] = [];
  const transposedStacks = transposeArray(
    stacksDefinitions
      .split('\n') // split into rows
      .map((stack: string) => stack.match(/.{1,4}/g) || []) // split into columns
      .reverse() // so that the bottom of the stack is the first column
      .map((row: string[]) => row
        .map((cell) => cell.replace(/\W/g, ''))), // strip spaces and brackets
  );

  transposedStacks.forEach((column: string[]) => {
    const newColumn = [...column];
    parsedStacks[Number(newColumn.shift()) - 1] = newColumn
      .filter((cell: string) => cell); // remove empty cells
  });

  return parsedStacks;
};

/**
 * Convert the moves section of the file into something usable.
 *
 * @param {Array} moves array of move definitions from the file
 * @returns {Array} cleaned and parsed moves
 */
const parseMoves = (movesDefinitions: string): Move[] => 
  movesDefinitions
    .split('\n')
    .map((move: string): Move[] => {
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
const runCrateMover = (
  stacks: string[][], 
  moves: Move[], 
  model: string 
) => {
  const localStacks = JSON.parse(JSON.stringify(stacks));

  moves.forEach(({ count, from, to }) => {
    const fromStack = localStacks[from - 1];
    const toStack = localStacks[to - 1];
    const items = fromStack.splice(-count);

    if (model === '9000') {
      items.reverse();
    }

    toStack.push(...items);
  });

  // find the "message" in the stacks
  return localStacks
    .map((stack: string[]) => stack.pop())
    .join('');
};

/**
 * Do the thing.
 */
const main = async () => {
  // the first half of the file before \n\n is the stack definitions;
  // the rest are the moves.
  const [ stacksDefinitions, movesDefinitions ]: [ stackDefinitions: string, movesDefinitions: string ] = await readInputFile(
    'day-5',
    ['\n\n'],
  );

  const stacks: string[][] = parseStacks(stacksDefinitions);
  const moves: Move[] = parseMoves(movesDefinitions);

  const step1Message = runCrateMover(
    stacks,
    moves,
    '9000',
  );
  const step2Message = runCrateMover(
    stacks,
    moves,
    '9001',
  );

  console.log('step 1', step1Message);
  console.log('step 2', step2Message);
};

main();
