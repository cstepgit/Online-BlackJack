import Hand from './hand.js';
import Card from './card.js';
import Deck from './deck.js';

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
      let card = this.playerHand.getPlayerCard(this.deck);
      this.playerCardScore= this.playerHand.calculateScore();
      return card;
    }
  
    getDealerCard() {
      let card = this.dealerHand.getDealerCard(this.deck);
      this.dealerCardScore = this.dealerHand.calculateScore();
      return card;
    }
  
    getDealerCardScore() {
      return this.dealerCardScore;
    }
    
    getPlayerScore() {
      console.log(this.playerHand.calculateScore());
        return this.playerHand.calculateScore();

      }
    playRound() {
      this.setInitialScore();
    }
  
    //displays the full scores
    displayScores() {
      console.log("Player score: " + this.playerCardScore);
      console.log("Dealer score: " + this.dealerCardScore);
    }
  
    getDealerStartScore() {
      return this.dealerStartScore;
    }
    setInitialScore(){
      let dealerScoreText = document.getElementById('dealerCardTotal');
      let playerScoreText = document.getElementById('playerCardTotal');
      this.displayScores();
      dealerScoreText.innerHTML = this.dealerCardScore;
      playerScoreText.innerHTML = this.playerCardScore;
    }

    playerHit(){
      console.log("TEst");
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
  } 



    