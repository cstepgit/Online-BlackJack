export default class Round {
    constructor(deck) {
      this.deck = deck;
     
      this.playerHand = new Hand();
      this.dealerHand = new Hand();
      this.playerCardScore = 0;
      this.dealerCardScore = 0;
      this.dealerStartScore = 0;
      // 0 win status is dealer win, 1 win status is tie, 2 win status in player win.
      this.winStatus = 0;
    }
  
    getCard() {
      return this.playerHand.getPlayerCard(this.deck);
    }
  
    getDealerCard() {
      return this.dealerHand.getDealerCard(this.deck);
    }
  
    getDealerCardScore() {
      return this.dealerCardScore;
    }
    
    getPlayerScore() {
        return this.playerHand.calculateScore();
      }
    playRound() {
      // Check for Blackjack at the beginning
      if (this.playerHand.isBlackJack() && !this.dealerHand.isBlackJack()) {
        console.log("PLAYER WINS - BLACKJACK");
        this.displayScores();
      } else if (!this.playerHand.isBlackJack() && this.dealerHand.isBlackJack()) {
        console.log("DEALER WINS - BLACKJACK");
        this.displayScores();
      }
      //must display start scores bc player shouldnt see dealer full score
      this.displayStartScores();
      //start the players turn as they go first
      //this.playerTurn();
      //if the player busted theres no reason for the dealer to go
      // if (this.playerCardScore < 21) {
      //     this.dealerTurn();
      // }
      // if the dealer didn't bust and they ended up with a score close to 21 then the player
      // if ((this.dealerCardScore <= BLACKJACK && this.dealerCardScore > this.playerCardScore) || this.playerCardScore > 21) {
      //     //remember win status 0 is dealer win
      //     this.winStatus = 0;
      // } else if (this.dealerCardScore === this.playerCardScore) {
      //     //if they tied win status is 1
      //     this.winStatus = 1;
      // } else {
      //     // if neither of these things then player one and win status is 2
      //     this.winStatus = 2;
      // }
      //return win status for main game to process
      return this.winStatus;
    }
  
    //displays the full scores
    displayScores() {
      console.log("Player score: " + this.playerCardScore);
      console.log("Dealer score: " + this.dealerCardScore);
    }
  
    // prints out the players card score and then the dealers first card
    displayStartScores() {
      // console.log("Player score: " + this.playerCardScore);
      // console.log("Dealer score: " + this.dealerStartScore + " + ?");
    }
  
    // prints out the players card score and then the dealers first card
    
  
    // prints out the players card score and then the dealers first card
    getDealerScore() {
      return this.dealerHand.calculateScore();
    }
  
    // prints out the players card score and then the dealers first card
    getDealerStartScore() {
      return this.dealerStartScore;
    }
  
    // player algorithm
    playerTurn() {
      if (!(this.playerCardScore < BLACKJACK)) {
        return null;
      }
  
      const card = this.playerHand.getPlayerCard(this.deck);
      //calculate their new score
      this.playerCardScore = this.playerHand.calculateScore();
      //if that hit caused them to bust
      if (this.playerCardScore > BLACKJACK) {
        console.log("PLAYER BUST");
      }
      console.log("Player score: " + this.playerCardScore);
      this.displayScores();
      return card;
    }
  
    //dealer algorithm
    dealerTurn() {
      //while the dealer card score is less than the player cards score
      while (this.dealerCardScore < this.playerCardScore) {
        //while it's less than we need a card so give dealer the card
        this.dealerHand.getDealerCard(this.deck);
        console.log("Dealer Hit");
  
        //calculate the score with that new card
        this.dealerCardScore = this.dealerHand.calculateScore();
        //if the dealer busted then their turn is over
        console.log("Dealer score: " + this.dealerCardScore);
        if (this.dealerCardScore > BLACKJACK) {
          console.log("DEALER BUST");
          break;
        }
      }
    }
  }
  
  // Assuming you have a Hand class and a BLACKJACK constant defined elsewhere in your code.
  