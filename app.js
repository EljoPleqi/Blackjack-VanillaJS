const btn = document.querySelector('.draw-card-btn');
const winBtn = document.querySelector('.check-winner-btn');
const newGameBtn = document.querySelector('.new-game');

const scoreBoard = document.querySelector('.score-board-sub');
const displayPlayerPoints = document.querySelector('.current-player-points');
const cardsContainer = document.querySelector('.cards');
const houseCardsContainer = document.querySelector('.house-cards');
const faceDownCard = document.querySelector('.face-down');

const heartsIcon = `<i class="ph-heart-straight"></i>`;
const spadesIcon = `<i class="ph-spade"></i>`;
const clovesIcon = `<i class="ph-club"></i>`;
const diamondsIcon = `<i class="ph-diamond"></i>`;
const cards = ['a', 2, 3, 4, 5, 6, 7, 8, 9, '10', 'j', 'q', 'k'];
const cardSymbol = ['Spades_', 'Hearts_', 'Diamonds_', 'Clovers_'];

// make the deck

const createDeck = (cards, arr) => {
  const b = [];
  for (sign of arr) {
    for (card of cards) {
      const x = sign + card;
      b.push(x);
    }
  }
  return b;
};

const deck = createDeck(cards, cardSymbol);

let symbol;

// draw card
const generateCard = () => Math.floor(Math.random() * 53);

function calcHand(arr) {
  arr.forEach((card) => {
    if (card === 'j' || card === 'q' || card === 'k' || card === 'a') {
      arr.push(10);
    } else {
      const cardNumber = Number(card);
      arr.push(cardNumber);
    }
  });
  arr.splice(0, 2);
  return arr;
}

// initial hand
const playerHand = [deck[generateCard()], deck[generateCard()]];
const houseHand = [deck[generateCard()], deck[generateCard()]];

const extractCardValues = (arr) =>
  (cardValues = arr.map((card) => card.split('_').pop()));

extractCardValues(playerHand);

const exportIcons = (arr) => {
  const playerCard = arr.map((card) => card.split('_').shift());
  const cardType = [...playerCard];
  return cardType;
};

const playerCardIcons = exportIcons(playerHand);
const houseCardIcons = exportIcons(houseHand);

let cardValueString = [...cardValues];

let playerPoints = calcHand(cardValues);

let playerTotalPoints = playerPoints.reduce((acc, curr) => acc + curr);

console.log(playerPoints, playerTotalPoints);

// house hand

const houseCardValue = houseHand.map((card) => card.split('_').pop());

let housePoints = calcHand(houseCardValue);

let houseTotalPoints = housePoints.reduce((acc, curr) => acc + curr);

// `if (houseTotalPoints <= 15 && houseTotalPoints >= 11) {
//   houseTotalPoints += Math.floor(Math.random() * 7);
// }
// if (houseTotalPoints <= 10) {
//   houseTotalPoints += Math.floor(Math.random() * 10) + 3;
// }

// Player draws extra card

const playerDrawsCard = () => {
  playerHand.push(deck[generateCard()]);
};

// RENDERING CARDS

function findSymbol(card) {
  if (card === 'Spades') {
    symbol = spadesIcon;
  } else if (card === 'Hearts') {
    symbol = heartsIcon;
  } else if (card === 'Diamonds') {
    symbol = diamondsIcon;
  } else if (card === 'Clovers') {
    symbol = clovesIcon;
  }
}

function renderHouseCards(arr) {
  arr.forEach((card) => {
    findSymbol(card);
    const houseCardHTML = `<div class="card"><p class=" card-value">${houseCardValue.shift()}</p><div class="card-icon">${symbol}</div></div>`;
    houseCardsContainer.insertAdjacentHTML('beforeend', houseCardHTML);
  });
  houseCardsContainer.lastChild.classList.add('face-down');
}
if (faceDownCard) {
}
renderHouseCards(houseCardIcons);

function renderPlayerIcons(card) {
  findSymbol(card);
  const cardHTML = `<div class="card"><p class=" card-value">${cardValueString
    .shift()
    .toUpperCase()}</p><div class="card-icon">${symbol}</div></div>`;

  cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
}

playerCardIcons.forEach((card) => renderPlayerIcons(card));

displayPlayerPoints.textContent = `POINTS: ${playerTotalPoints} `;

// render erd card

const getExtraCard = () => {
  playerDrawsCard();

  extraCardIcon = exportIcons(playerHand).pop();
  extractCardValues(playerHand);

  cardValueString = [...cardValues.slice().pop()];

  renderPlayerIcons(extraCardIcon);

  x = calcHand(cardValues);
  for (let i = 2; i < x.length; i++) x.splice(0, 1);
  playerTotalPoints = x.reduce((acc, curr) => acc + curr);

  displayPlayerPoints.textContent = `POINTS: ${playerTotalPoints} `;
  const pointsHTML = `<p class="points">Player Points: ${playerTotalPoints}</p><p class="points">House Points: ${houseTotalPoints}</p>`;

  if (playerTotalPoints > 21) {
    displayPlayerPoints.textContent = `You lost by exceeding 21 points`;
    scoreBoard.insertAdjacentHTML('beforeend', pointsHTML);
  }
};

//  CHECKING THE WINNER

const checkWinner = () => {
  btn.classList.add('hidden');
  winBtn.classList.add('hidden');
  const pointsHTML = `<p class="points">Player Points: ${playerTotalPoints}</p><p class="points">House Points: ${houseTotalPoints}</p>`;

  houseCardsContainer.lastChild.classList.remove('face-down');

  if (playerTotalPoints < houseTotalPoints) {
    displayPlayerPoints.textContent = `The house won with ${houseTotalPoints} points`;
    scoreBoard.insertAdjacentHTML('beforeend', pointsHTML);
  } else if (playerTotalPoints <= 21 && playerTotalPoints > houseTotalPoints) {
    displayPlayerPoints.textContent = `You won with ${playerTotalPoints} points`;
    scoreBoard.insertAdjacentHTML('beforeend', pointsHTML);
  }
};

const startNewGame = () => {
  window.location.reload();
};

// EVENT LISTENERS
btn.addEventListener('click', getExtraCard);
winBtn.addEventListener('click', checkWinner);
newGameBtn.addEventListener('click', startNewGame);
