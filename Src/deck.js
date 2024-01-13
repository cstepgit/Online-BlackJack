import Card from './card.js';

export default class Deck {
  constructor() {
    this.cards = [];
    const suits = ['hearts', 'clubs', 'diamonds', 'spades'];
    const faceCards = ['jack', 'queen', 'king'];
    this.availableCards = 52;
    this.totalCards = 52;
    this.usedCards = 0; 
    this.discardedCards = 0;
    this.cardsOnTable = 0; 

    faceCards.splice(0, 0, 'jack', 'king', 'queen');


    let fileName;
    // for values 2-9 of each suit
    for (let value = 2; value <= 10; value++) {
      for (const suit of suits) {
        fileName = `../Cards/${value}_of_${suit}.png`;
        let card = new Card(value, suit, fileName);

        this.cards.push(card);
      }
    }

    // for each suit, add 4 values of 10
    for (let k = 0; k <= 2; k++) {
      for (const suit of suits) {
        fileName = `../Cards/${faceCards[k]}_of_${suit}.png`;

        let card = new Card(10, suit, fileName);
        this.cards.push(card);
      }
    }

    // for each suit, add a value 11
    for (const suit of suits) {
      fileName = `../Cards/ace_of_${suit}.png`;
      let card = new Card(11, suit, fileName);

      this.cards.push(card);
    }
  }

  giveDealerCard() {
    let cardGiven = false;
    let index = 0;
    let dealerCard;
    while (!cardGiven && index < this.totalCards) {
      if (this.availableCard(this.cards[index])) {
        this.cards[index].dealerHand = true;
        //duplicated card being given to player to add to the player array
        dealerCard = new Card(
          this.cards[index].value,
          this.cards[index].suit,
          this.cards[index].cardName
        );
        //displays card being given to entity
        cardGiven = true;
        this.availableCards--;
        this.usedCards++; 
        this.cardsOnTable++;
      } else index++;
    }
    return dealerCard;
  }

  givePlayerCard() {
    let cardGiven = false;
    let index = 0;
    let playerCard;

    while (!cardGiven && index < this.totalCards) {
      if (this.availableCard(this.cards[index])) {
        this.cards[index].playerHand = true;
        // Duplicated card being given to the player to add to the player array
        playerCard = new Card(
          this.cards[index].value,
          this.cards[index].suit,
          this.cards[index].cardName,
        );
        playerCard.playerHand = true;
        // Displays the card being given to the entity
        cardGiven = true;
        this.availableCards--;
        this.usedCards++;
        this.cardsOnTable++; 
      } else {
        index++;
      }
    }
   
    return playerCard;
  }

  availableCard(card) {
    return !card.playerHand && !card.dealerHand && !card.discard;
  }
  
  shuffleDeck() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  discard(){
    console.log("Discarding Cards"); 
    for(let i = 0; i < this.cards.length; i++){
      if(this.cards[i].dealerHand || this.cards[i].playerHand){
        this.cards[i].discard = true; 
        this.cards[i].dealerHand = false; 
        this.cards[i].playerHand = false; 
        this.discardedCards++; 
        this.cardsOnTable--; 
      }
    }
  }
  shuffleDiscard() {
    console.log("Shuffle Cards"); 
    // Filter cards with discard attribute set to true
    const discardableCards = this.cards.filter(card => card.discard === true);
   
    // Shuffle only the discardable cards
    for (let i = discardableCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [discardableCards[i], discardableCards[j]] = [discardableCards[j], discardableCards[i]];
    }
    console.log(discardableCards);
    // Update the original array with shuffled discardable cards
    let discardableIndex = 0;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].discard === true) {
        this.cards[i] = discardableCards[discardableIndex];
        discardableIndex++;
        this.cards[i].discard = false; 
      }
    }
    this.usedCards = 0;
    this.availableCards = this.totalCards - (this.usedCards - this.discardedCards); 
    this.discardedCards = 0;
  }
  
}





