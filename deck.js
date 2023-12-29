import { Card } from './card.js';

export class Deck {
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
          fileName = `PNG-cards-1.3/${value}_of_${suit}.png`;
          const card = new Card(value, suit, fileName);
          this.cards.push(card);
        }
      }
  
      // for each suit, add 4 values of 10
      for (let k = 0; k <= 2; k++) {
        for (const suit of suits) {
          fileName = `PNG-cards-1.3/${faceCards[k]}_of_${suit}.png`;
          console.log(fileName);
          const card = new Card(10, suit, fileName);
          this.cards.push(card);
        }
      }
  
      // for each suit, add a value 11
      for (const suit of suits) {
        fileName = `PNG-cards-1.3/ace_of_${suit}.png`;
        const card = new Card(11, suit, fileName);
        this.cards.push(card);
      }
    }
  }
  