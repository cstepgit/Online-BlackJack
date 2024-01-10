import Hand from './hand.js';

export default class Round {
  constructor(deck, bank) {
    this.deck = deck;
    this.bank = bank;
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

  async win(winner = null) {
    this.disableHitStandButtons();
    await pause(500);
    let winScreen = document.getElementById('winScreen');
    let newRoundButton = document.getElementById('newRound');
    let winDisplay = document.getElementById('winInfo');
    let playerScore = document.getElementById('playerScore');
    let dealerScore = document.getElementById("dealerScore");
    newRoundButton.disabled = false;

    if (winner === null) {
      winDisplay.innerText = "It's a push";
      this.winner = "Push"
      playerScore.innerText = "Player Score: " + this.playerCardScore;
      dealerScore.innerText = "Dealer Score: " + this.dealerCardScore;
    } else {
      winDisplay.innerText = winner + " won";
      playerScore.innerText = "Player Score: " + this.playerCardScore;
      dealerScore.innerText = "Dealer Score: " + this.dealerCardScore;
      console.log(winner, " WON");
    }
    this.roundWinner = winner;
    winScreen.style.display = "Block";
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



