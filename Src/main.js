import Card from '../Src/card.js';
import Deck from '../Src/deck.js';
import Round from './round.js';



let myDeck = new Deck();
let round = new Round(myDeck);

let dealerCardsBox = document.getElementById('dealer');
let playerCardsBox = document.getElementById('player');
function roundSetUp() {

  

  shuffleArray(myDeck.cards);

  let card = round.getCard();
  createCardElement(card, playerCardsBox);

   card = round.getDealerCard();
   createCardElement(card, dealerCardsBox);

  card = round.getCard();
  createCardElement(card, playerCardsBox);

  card = round.getDealerCard();
  createCardElement(card, dealerCardsBox);

  round.playRound();
}

function createCardElement(card, container) {
  let img = document.createElement('img');
  img.src = card.cardName;
  img.classList.add('card');
  container.appendChild(img);
}


document.addEventListener('DOMContentLoaded', function () {
  // Add event listener after the DOM has loaded
  document.getElementById('start').addEventListener('click', roundSetUp);
});
document.addEventListener('DOMContentLoaded', function () {
  // Add event listener after the DOM has loaded
  document.getElementById('hit').addEventListener('click', playerHit);
});



function playerHit(){
  createCardElement(round.getCard(), playerCardsBox);
  round.getPlayerScore();
  round.setInitialScore();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}









