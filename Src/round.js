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
    this.startButton = document.getElementById('start');
    this.hitButton = document.getElementById('hit');
    this.standButton = document.getElementById('stand');
    this.newRoundButton = document.getElementById('newRound');

    // 0 win status is dealer win, 1 win status is tie, 2 win status in player win.
    this.winStatus = 0;
    this.BLACKJACK = 21;
  }

  // gives a player a card and updates their total score
  getCard() {
    if (this.deck.availableCards == 0) {
      this.deck.shuffleDiscard();
    }
    let card = this.playerHand.getPlayerCard(this.deck);
    this.playerCardScore = this.playerHand.calculateScore();
    return card;
  }

  //  gives a dealer a card and updates thier total score
  getDealerCard() {
    if (this.deck.availableCards == 0) {
      this.deck.shuffleDiscard();
    }
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

  //  displays the full scores
  displayScores() {
    console.log("Player score: " + this.playerCardScore);
    console.log("Dealer score: " + this.dealerCardScore);
  }

  updatePlayerScoreDisplay() {

    let playerScoreText = document.getElementById('playerCardTotal');
    this.displayScores();
    playerScoreText.innerHTML = this.playerCardScore;
  }
  updateDealerScoreDisplay() {
    let dealerScoreText = document.getElementById('dealerCardTotal');
    dealerScoreText.innerHTML = this.dealerCardScore;
  }
  updateDealerFirstScoreDisplay(value) {
    let dealerScoreText = document.getElementById('dealerCardTotal');
    dealerScoreText.innerHTML = value;
  }

  async win(winner) {
    await pause(1000);
    this.disableHitStandButtons();
    let winScreen = document.getElementById('winScreen');
    let newRoundButton = document.getElementById('newRound');
    let winDisplay = document.getElementById('winInfo');
    newRoundButton.disabled = false;

    winDisplay.innerText = winner + " won"

    winScreen.style.display = "Block";
    console.log(winner, " WON");

  }

  async push() {
    await pause(1000);
    this.disableHitStandButtons();
    let winScreen = document.getElementById('winScreen');
    let newRoundButton = document.getElementById('newRound');
    let winDisplay = document.getElementById('winInfo');
    newRoundButton.disabled = false;

    winDisplay.innerText = "It's a push"

    winScreen.style.display = "Block";
    console.log("It's a push!")
  }


  async revealDealerCard() {
    let dealerCardsBox = document.getElementById('dealer');
    let lastCard = dealerCardsBox.lastChild;
    if (lastCard) {
      dealerCardsBox.removeChild(lastCard);
    }
    let newCard = this.dealerHand.entityCards[1];

    this.createCardElement(newCard, dealerCardsBox);
    this.updateDealerScoreDisplay();
  }

  async dealerTurn() {
    let dealerCardsBox = document.getElementById('dealer');
    console.log("DEALER TURN");
    this.revealDealerCard();

    // Check if dealer has a blackjack
    if (this.dealerCardScore == this.BLACKJACK && this.playerCardScore != this.BLACKJACK) {
      this.win("Dealer");
      return;
    }

    // Check if player has a blackjack
    if (this.playerCardScore == this.BLACKJACK) {
      if (this.dealerCardScore == this.BLACKJACK) {
        // It's a tie if both dealer and player have blackjack
        this.push();
      } else {
        // Player wins with blackjack
        this.win("Player");
      }
      return;
    }

    while (this.dealerCardScore < this.playerCardScore) {
      await pause(1000);

      // Give the dealer a new card
      this.createCardElement(this.getDealerCard(this.deck), dealerCardsBox);

      // Update the dealer's score with the new card
      this.dealerCardScore = this.dealerHand.calculateScore();
      this.updateDealerScoreDisplay();

      // Check for bust
      if (this.dealerCardScore > this.BLACKJACK) {
        this.win("Player");
      } else if (this.dealerCardScore >= this.playerCardScore) {
        // If dealer has a score greater than or equal to player, dealer wins
        this.win("Dealer");
      }
    }

    // Check for a tie if both dealer and player have the same score
    if (this.dealerCardScore === this.playerCardScore) {
      this.push();
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
    this.deck.discard();
  }
  removeCardsFromContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
  disableHitStandButtons() {
    this.hitButton.disabled = true;
    this.standButton.disabled = true;
  }
}
async function pause(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}



