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
      cardStructure.drawn[rowIndex][entryIndex] = 0;
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
        card.drawn[rowIndex][entryIndex] = 1;
      }
    });
    if (card.drawn[rowIndex].every((value) => value > 0)) {
      card.won = true;
    }
  });


  // if the normal version doesn't have a winner, let's transpose.
  if (!card.won) {
    const cardTransposed = utils.transposeArray(card.drawn);
    cardTransposed.forEach((row, rowIndex) => {
      if (cardTransposed[rowIndex].every((value) => value > 0)) {
        card.won = true;
      };    
    });
  }

  return card;
};

/**
 * Run a bingo game
 * 
 * @param {Array} draws 
 * @param {Array} cards 
 * @returns {object}
 */
const runDraw = (draws, cards) => {
  let winningCard = null;
  let drawIndex = 0;
  let values = 0;

  while (!winningCard) {
    cards.forEach((card) => {
      card = handleDraw(card, draws[drawIndex]);
      
      if (card.won) {
        winningCard = card;
      }
    });

    if (!winningCard) {
      drawIndex++;
    }
  };

  winningCard.drawn.forEach((row, rowIndex) => {
    row.forEach((entry, entryIndex) => {
      if (entry === 0) {
        values += winningCard.card[rowIndex][entryIndex];
      }
    });
  });

  return values * draws[drawIndex];
}

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
  [draws, ...cards] = await utils.readInputFile(4, false, '\n\n');
  draws = draws.split(',').map((value) => Number(value));
  cards = cards.map((card) => buildCardStructure(card));

  console.log('Part 1', runDraw(draws, cards));
};

main();
