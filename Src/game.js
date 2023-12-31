import Deck from '../Src/deck.js';
import Round from './round.js';


export default class Game {
    constructor() {
        this.myDeck = new Deck();
        this.myDeck.shuffleDeck();
        this.round = new Round(this.myDeck);
        this.dealerCardsBox = document.getElementById('dealer');
        this.playerCardsBox = document.getElementById('player');

        // Event listener for the "start" button
        document.addEventListener('DOMContentLoaded', () => {
            // Event listener for the "hit" button
            document.getElementById('start').addEventListener('click', () => {
                this.roundSetUp();
            });
            document.getElementById('hit').addEventListener('click', () => {
                this.playerHit();
            });
        });
    }

    roundSetUp() {
        // Implementation for the round setup
        
  this.myDeck.shuffleDeck();
  let card = this.round.getCard();
  this.createCardElement(card, this.playerCardsBox);

   card = this.round.getDealerCard();
   this.createCardElement(card, this.dealerCardsBox);

  card = this.round.getCard();
  this.createCardElement(card, this.playerCardsBox);

  card = this.round.getDealerCard();
  this.createCardElement(card, this.dealerCardsBox);

  this.round.playRound();
    console.log('Round set up');
    }
    playerHit() {
        // Implementation for the player hit
        this.createCardElement(this.round.getCard(), this.playerCardsBox);
        this.round.getPlayerScore();
        this.round.setInitialScore();
        console.log("Player hit");
    }
    createCardElement(card, container) {
        let img = document.createElement('img');
        img.src = card.cardName;
        img.classList.add('card');
        container.appendChild(img);
      }
}
