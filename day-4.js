const utils = require('./utils.js');

const buildCardStructure = (rawCard) => {
  const card = rawCard
  .split('\n')
  .map((row) => row
    .split(' ')
    .filter((value) => value !== '')
    .map((value) => Number(value))
  );

  const cardStructure = {
    card,
    drawn: [],   
    cardFlat: [],
    won: false,
  }; 
  
  card.forEach((row, rowIndex) => {
    cardStructure.drawn[rowIndex] = [];

    row.forEach((entry, entryIndex) => {
      cardStructure.drawn[rowIndex][entryIndex] = false;
      cardStructure.cardFlat.push(entry);
    });
  });

  return cardStructure;
};

const handleDraw = (card, draw) => {
  // no need to do all that work if the number isn't on the card.
  if (!card.cardFlat.includes(draw)) {
    return false;
  } 

  card.card.forEach((row, rowIndex) => {
    row.forEach((entry, entryIndex) => {
      if (entry === draw) {
        card.drawn[rowIndex][entryIndex] = true;
      }
    });
    if (row.every((value) => value === true)) {
      card.won = true;
    }
  });


  // if the normal version doesn't have a winner, let's transpose.
  if (!card.won) {
    const cardTransposed = utils.transposeArray(card.drawn);
    cardTransposed.forEach((row) => {
      if (row.every((value) => value === true)) {
        card.won = true;
      }
    });    
  }

  return card;
};

/**
 * Do the thing.
 */
const main = async () => {
  let draws;
  let cards;
  let cardObjects = {};
  let hasBingo = false;
  let drawIndex = 0;

  // parse data because this one's…special
  [draws, ...cards] = await utils.readInputFile(4, true, '\n\n');
  draws = draws.split(',').map((value) => Number(value));
  cards = cards.map((card) => buildCardStructure(card));

  while (!hasBingo) {
    const draw = draws[drawIndex];
    console.log(`Drawing ${draw}`);

    cards.forEach((card) => {
      card = handleDraw(card, draw);
      
      if (card.won) {
        hasBingo = true;
        console.log(card);
      }
    });

    if (!hasBingo) {
      drawIndex++;
    }
  };

  console.log('Part 1');
};

main();
