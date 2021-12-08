const utils = require('./utils.js');

/**
 * Convert the raw card data into something usable.
 * 
 * @param {string} rawCard 
 * @returns Array
 */
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

/**
 * Process the draw on a single card and pass it back, updated.
 * 
 * @param {object} card 
 * @param {number} draw 
 * @returns object
 */
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
 * Get the winning card's value
 * 
 * @param {object} card 
 * @param {number} draw 
 * @returns number
 */
const cardValue = (card, draw) => {
  let values = 0;

  card.drawn.forEach((row, rowIndex) => {
    row.forEach((entry, entryIndex) => {
      if (entry === 0) {
        values += card.card[rowIndex][entryIndex];
      }
    });
  });

  return values * draw;
};

/**
 * Run a bingo game while trying to win
 * 
 * @param {Array} draws 
 * @param {Array} cards 
 * @returns {object}
 */
const playToWin = (draws, cards) => {
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

  return cardValue(winningCard, draws[drawIndex]);
}

/**
 * Filter to all cards that have not yet won.
 * 
 * @param {Array} cards 
 * @returns Array
 */
const cardsThatHaveNotWon = (cards) => cards.filter((card) => !card.won);

/**
 * Figure out which card wins last
 * 
 * @param {Array} draws 
 * @param {Array} cards 
 * @returns {object}
 */
 const playToLose = (draws, cards) => {
  const leftCards = cardsThatHaveNotWon(cards);
  let cardsLeftCount = leftCards.length;
  let drawIndex = 0;
  let lastCard;

  while (cardsLeftCount > 1) {   
    leftCards.forEach((card) => {
      card = handleDraw(card, draws[drawIndex]);
    });

    cardsLeftCount = cardsThatHaveNotWon(cards).length;
    drawIndex++;
  };

  // this gives us the last not-winning card. Let's finish 'er.
  lastCard = cardsThatHaveNotWon(cards)[0];

  while (!lastCard.won) {
    handleDraw(lastCard, draws[drawIndex]);
    
    if (!lastCard.won) {
      drawIndex++;
    }
  }
  
  return cardValue(lastCard, draws[drawIndex]);
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

  console.log('Part 1', playToWin(draws, cards));
  console.log('Part 2', playToLose(draws, cards));
};

main();
