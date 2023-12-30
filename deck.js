import Card from './card.js';

export default class Deck{
    constructor() {
      this.cards = [];
      const suits = ['hearts', 'clubs', 'diamonds', 'spades'];
      const faceCards = ['jack', 'queen', 'king'];
      let availableCards = 52;
      let totalCards = 52;
  
      faceCards.splice(0, 0, 'jack', 'king', 'queen');
  
      let fileName;
  
      // for values 2-9 of each suit
      for (let value = 2; value <= 10; value++) {
        for (const suit of suits) {
          fileName = `Cards/${value}_of_${suit}.png`;
          let card = new Card(value, suit, fileName);
          console.log(fileName);
          this.cards.push(card);
        }
      }
  
      // for each suit, add 4 values of 10
      for (let k = 0; k <= 2; k++) {
        for (const suit of suits) {
          fileName = `Cards/${faceCards[k]}_of_${suit}.png`;
          console.log(fileName);
          let card = new Card(10, suit, fileName);
          this.cards.push(card);
        }
      }
  
      // for each suit, add a value 11
      for (const suit of suits) {
        fileName = `Cards/ace_of_${suit}.png`;
        let card = new Card(11, suit, fileName);
        console.log(fileName);
        this.cards.push(card);
      }
    }
  }
  export function givePlayerCard() {
    let cardGiven = false;
    let index = 0;
    let playerCard;
    while (!cardGiven && index < totalCards) {
        if (availableCard(cards.get(index))) {
            Deck.cards.get(index).setPlayerHand(true);
            //duplicated card being given to player to add to the player array
            playerCard = new Card(Deck.cards.get(index).getValue(), Deck.cards.get(index).getSuit(),  Deck.cards.get(index).getCardName());
            //displays card being given to entity
            cardGiven = true;
            Deck.availableCards = Deck.availableCards-1; 
        } else index++;
    }
    return playerCard;
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
 export function printCardNames(cards) {
  cards.forEach(card => {
    console.log(card.fileName);
  });
}





  