import {
  readInputFile,
  getSum,
} from './utils.mjs';

/**
 * Parse the whole transcript into a directory/file hierarchy.
 *
 * @param {Array} transcript array of lines from the transcript
 * @param {number} startPosition position in the array to start at
 * @returns {Array} file tree
 */
const parseFileTree = (transcript, startPosition = 0) => {
  const items = [];
  let position = startPosition;
  let size = 0;

  if (startPosition === 0) {
    // we're at the root, so let's create a root item.
    // all datasets start by ls-ing the root so we need a starter item.
    items.push({
      name: '/',
      type: 'dir',
      items: [],
      size: 0,
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
          // we are done with this level; return.
          return {
            items,
            nextPosition: position,
            size,
          };
        }

        // any other arg
        const dir = items.find(
          (item) => item.type === 'dir' && item.name === arg,
        );

        // the next x lines will be the contents of the dir
        // a cd .. command will finish it.
        const itemsInDir = parseFileTree(transcript, position + 1);
        dir.items = itemsInDir.items;
        dir.size += itemsInDir.size;
        position = itemsInDir.nextPosition;
        size += dir.size;
      }
    } else {
      // everything else is a line of ls output
      const [sizeOrType, name] = line.split(' ');
      const item = {
        name,
        size: 0,
      };
      item.type = sizeOrType === 'dir' ? 'dir' : 'file';
      if (item.type !== 'dir') {
        item.size = Number(sizeOrType);
      } else {
        item.items = [];
      }
      size += item.size;
      items.push(item);
    }
    position += 1;
  }

  // the last level doesn't return since there's no cd ..
  return {
    items,
    nextPosition: position,
    size,
  };
};

/**
 * Find directories with sizes between a range
 *
 * @param {Array} array
 * @param {number} min minimum size to filter on
 * @param {number} max maximum size to filter on
 * @param items
 * @returns
 */
const findDirectories = (items, min = 0, max = 99999999) => {
  let results = [];

  items.forEach((item) => {
    if (item.type === 'dir') {
      if (item.size > min && item.size < max) {
        results.push(item.size);
      }

      results = results.concat(
        findDirectories(item.items, min, max),
      );
    }
  });

  // sort isn't needed for both rounds, but, why not?
  return results.sort((a, b) => a - b);
};

/**
 * Do the thing.
 */
const main = async () => {
  const { items } = parseFileTree(
    await readInputFile({
      filename: 'day-7',
      delimiters: ['\n'],
    })
  );

  const partOneResult = getSum(findDirectories(items, 0, 100000));
  const partTwoResult = findDirectories(items, items[0].size - 40000000)[0];

  console.log('part 1', partOneResult);
  console.log('part 2', partTwoResult);
};

main();
