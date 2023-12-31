class Dealer {
    constructor() {
      this.totalCardScore = 0;
      this.dealerHand = new Hand();
    }
  
    getDealerHand() {
      return this.dealerHand;
    }
  
    setInitialScore() {
      this.totalCardScore = 0;
    }
  
    setScore(cardValue) {
      this.totalCardScore += cardValue;
    }
  
    getTotalCardScore() {
      return this.totalCardScore;
    }
  }
  
  // Assuming you have a Hand class defined elsewhere in your code.
  