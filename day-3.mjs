import {
  getSum,
  readInputFile,
  splitUpArray,
} from './utils.mjs';

/**
 * Get the point value for a letter
 *
 * @param {string) letter
 */
const getPointValue = (letter) => {
  const charCode = letter.charCodeAt(0);
  // puzzle points:
  // Lowercase item types a through z have priorities 1 through 26.
  // ASCII value of lowercase alphabets – 97 to 122.
  // Uppercase item types A through Z have priorities 27 through 52.
  // ASCII value of uppercase alphabets – 65 to 90. 
  return charCode < 96 
    ? (charCode - 64) + 26 // uppercase
    : (charCode - 96) // lowercase
}

/**
 * Get the badge for the elf team.
 *
 * @param {Array} team
 * @returns string
 */
const findTeambadge = (team) => team[0]
  .filter(symbol => team[1].includes(symbol))
  .filter(symbol => team[2].includes(symbol))[0];

/**
 * Find the item that should be in one compartment of the rucksack but is in both.
 *
 * @param {Array} team
 * @returns string
 */
const findMisplacedItem = (rucksack) => {
  const secondCompartment = [...rucksack];
  const firstCompartment = secondCompartment
    .splice(0, secondCompartment.length / 2);
  return secondCompartment
    .filter(symbol => firstCompartment.includes(symbol))[0];
};

/**
 * Do the thing.
 */
const main = async () => {
  const rucksacks = await readInputFile('day-3', ['\n', '']);
  const teams = splitUpArray(rucksacks, 3);

  console.log('Part 1', getSum(
    rucksacks.map((rucksack) => getPointValue(findMisplacedItem(rucksack)))
  ));
  console.log('Part 2', getSum(
    teams.map((team) => getPointValue(findTeambadge(team)))
  ));
};

main();
