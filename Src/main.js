import Card from '../Src/card.js';
import Deck from '../Src/deck.js';

let dealerCardsBox = document.getElementById('dealer');
let playerCardsBox = document.getElementById('player');


function roundSetUp(){
  let myDeck = new Deck();
  let card

  shuffleArray(myDeck.cards);

  card = myDeck.givePlayerCard();  
  let img1 = document.createElement('img');
  img1.src = card.cardName;
  img1.classList.add('card');
  playerCardsBox.appendChild(img1); 

 card = myDeck.giveDealerCard();
  let img2 = document.createElement('img');
  img2.src = card.cardName;
  img2.classList.add('card');
  dealerCardsBox.appendChild(img2); 

  card = myDeck.givePlayerCard();  
  let img3 = document.createElement('img');
  img3.src = card.cardName;
  img3.classList.add('card');
  playerCardsBox.appendChild(img3); 

  card = myDeck.giveDealerCard();
  let img4 = document.createElement('img');
  img4.src = card.cardName;
  img4.classList.add('card');
  dealerCardsBox.appendChild(img4); 

  
}

document.addEventListener('DOMContentLoaded', function () {
  // Add event listener after the DOM has loaded
  //document.getElementById('hit').addEventListener('click', roundSetUp);
});
document.addEventListener('DOMContentLoaded', function () {
  // Add event listener after the DOM has loaded
  document.getElementById('start').addEventListener('click', roundSetUp);
});


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}









