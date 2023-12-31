class Player {
  constructor() {
    this.totalScore = 0;
    this.playerHand = new Hand();
    this.name = "DEFAULT_USERNAME";
  }

  getHand() {
    return this.playerHand;
  }

  setHand(hand) {
    this.playerHand = hand;
  }

  setName(name) {
    this.name = name === "" ? "DEFAULT_USERNAME" : name;
  }

  getName() {
    return this.name;
  }

  setInitialScore() {
    this.totalScore = 0;
  }

  setScore(cardValue) {
    this.totalScore += cardValue;
  }

  getTotalScore() {
    return this.totalScore;
  }
}

// Assuming you have a Hand class defined elsewhere in your code.
