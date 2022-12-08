import {
  readInputFile,
} from './utils.mjs';

const parseItem = (line) => {
  const [sizeOrType, name] = line.split(' ');
  const item = { name };
  item.type = sizeOrType === 'dir' ? 'dir' : 'file';
  if (sizeOrType !== 'dir') {
    item.size = sizeOrType;
  }

  if (item.type === 'file') {
    item.size = Number(sizeOrType);
  }
  if (item.type === 'dir') {
    item.items = [];
  }

  return item;
};

/**
 * Parse the whole transcript into a directory/file hierarchy.
 *
 * @param {Array} transcript array of lines from the transcript
 * @param startPosition
 * @param stratSize
 * @returns {Array} parsed transcript
 */
const parseTranscript = (transcript, startPosition = 0) => {
  const parsedItems = [];
  let position = startPosition;
  let size = 0;

  if (startPosition === 0) {
    // we're at the root, so let's create a root item.
    parsedItems.push({
      name: '/',
      type: 'dir',
      items: [],
    });
  }

  while (position < transcript.length) {
    const line = transcript[position];

    // commands start with $
    if (line.charAt(0) === '$') {
      const [, command, arg] = line.split(' ');
      // command; always cd, really.
      // ls is pointless, basically a comment, so we ignore it.
      if (command === 'cd') {
        if (arg === '..') {
          // we are done with this level
          return {
            items: parsedItems,
            nextPosition: position,
          };
        }

        // any other arg
        const dir = parsedItems.find((item) => item.type === 'dir' && item.name === arg);

        const itemsInDir = parseTranscript(transcript, position + 1);
        console.log(itemsInDir);
        dir.items = itemsInDir.items;
        dir.size = Number(itemsInDir.size);
        position = itemsInDir.nextPosition;
      }
    } else {
      // everything else is a line of ls output
      const item = parseItem(line);
      size += item.size;
      parsedItems.push(item);
    }
    position += 1;
  }

  return {
    items: parsedItems,
    nextPosition: position,
    size,
  };
};

const displayTree = (array, indent = 0) => {
  array.forEach((item) => {
    const output = `${' '.repeat(indent)}- ${item.name} (${item.type}, size=${item.size})`;
    console.log(output);
    if (item.items) {
      displayTree(item.items, indent + 2);
    }
  });
};

/**
 * Do the thing.
 */
const main = async () => {
  // the first half of the file before \n\n is the stack definitions;
  // the rest are the moves.
  const lineArray = (await readInputFile({
    filename: 'day-7-example',
    delimiters: ['\n'],
  }));

  const { items: treeItems } = parseTranscript(lineArray);
  displayTree(treeItems);

  const partOneResult = true;
  const partTwoResult = true;

  console.log('part 1', partOneResult);
  console.log('part 2', partTwoResult);
};

main();
