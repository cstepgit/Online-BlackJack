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
    // 0 win status is dealer win, 1 win status is tie, 2 win status in player win.
    this.winStatus = 0;
    this.BLACKJACK = 21;
  }

  // gives a player a card and updates their total score
  getCard() {
    let card = this.playerHand.getPlayerCard(this.deck);
    this.playerCardScore = this.playerHand.calculateScore();
    return card;
  }

  //  gives a dealer a card and updates thier total score
  getDealerCard() {
    let card = this.dealerHand.getDealerCard(this.deck);
    this.dealerCardScore = this.dealerHand.calculateScore();
    return card;
  }

  // returns the dealers total score used for updating the screen
  getDealerCardScore() {
    return this.dealerCardScore;
  }

  // returns the players total score used for updating the screen
  getPlayerScore() {
    console.log(this.playerHand.calculateScore());
    return this.playerHand.calculateScore();

  }

  //sets initial scores from the first two cards delt
  playRound() {
    this.updateScoreDisplay();
  }

  //  displays the full scores
  displayScores() {
    console.log("Player score: " + this.playerCardScore);
    console.log("Dealer score: " + this.dealerCardScore);
  }

  updateScoreDisplay() {
    let dealerScoreText = document.getElementById('dealerCardTotal');
    let playerScoreText = document.getElementById('playerCardTotal');
    this.displayScores();
    dealerScoreText.innerHTML = this.dealerCardScore;
    playerScoreText.innerHTML = this.playerCardScore;
  }
  win(winner) {
    let newRoundButton = document.getElementById('newRound'); 
    newRoundButton.disabled = false; 
    console.log(winner, " WON");
  }

  dealerTurn() {
    let dealerCardsBox = document.getElementById('dealer');
    console.log("DEALER TURN");
    while (this.dealerCardScore < this.playerCardScore) {
      //while it's less than we need a card so give dealer the card
      this.createCardElement(this.getDealerCard(this.deck), dealerCardsBox );
      //calculate the score with that new card
      this.dealerCardScore = this.dealerHand.calculateScore();
      this.updateScoreDisplay();
      //if the dealer busted then their turn is over
      if (this.dealerCardScore > this.BLACKJACK) {
        this.win("Player");
        break;
      }
    }
  }
  //  Adds a card to either player or dealer card space
  createCardElement(card, container) {
    let img = document.createElement('img');
    img.src = card.cardName;
    img.classList.add('card');
    container.appendChild(img);
  }
  removeAllCards() {
    this.removeCardsFromContainer(document.getElementById('player'));
    this.removeCardsFromContainer(document.getElementById('dealer'));
  }
  removeCardsFromContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}


