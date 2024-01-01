export default class Hand {
    constructor() {
      this.BLACKJACK = 21;
      this.entityCards = [];
    }
  
    calculateScore() {
      let totalScore = 0;
      let aces = 0;
      for (let card of this.entityCards) {
        totalScore += card.getValue();
        if (card.getValue() === 11) {
          aces++;
        }
      }
      while (totalScore > this.BLACKJACK && aces > 0) {
        totalScore -= 10;
        aces--;
      }
      return totalScore;
    }
  
    isBlackJack() {
      let isBlackJack = false;
      let score = this.calculateScore();
      if (score === this.BLACKJACK) {
        isBlackJack = true;
      }
      return isBlackJack;
    }
    
    getPlayerCard(deck) {
      let card = deck.givePlayerCard();
      this.entityCards.push(card);
      return card;
    }
  
    getDealerCard(deck) {
      let card = deck.giveDealerCard();
      this.entityCards.push(card);
      return card;
    }
  }
  
  // Assuming you have a Card class and a Deck class defined elsewhere in your code.
  