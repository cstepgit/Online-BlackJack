import Deck from '../Src/deck.js';
import Round from './round.js';


export default class Game {
    constructor() {
        this.myDeck = new Deck();
        this.myDeck.shuffleDeck();
        this.round = new Round(this.myDeck);
        this.dealerCardsBox = document.getElementById('dealer');
        this.playerCardsBox = document.getElementById('player');

        // Get references to the buttons
        this.startButton = document.getElementById('start');
        this.hitButton = document.getElementById('hit');
        this.standButton = document.getElementById('stand');

        // Disable hit and stand buttons initially
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
        this.startButton.disabled = false;

        // Event listener for the "start" button
        this.startButton.addEventListener('click', () => {
            this.roundSetUp();

            // Enable hit and stand buttons after starting the round
            this.hitButton.disabled = false;
            this.standButton.disabled = false;
        });

        // Event listeners for the "hit" and "stand" buttons
        this.hitButton.addEventListener('click', () => {
            this.hitButton.classList.add('active-button');
            this.playerHit();
        });
        this.standButton.addEventListener('click', () => {
            this.standButton.classList.add('active-button');
            this.playerStand();
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
        console.log("Player hit");
        this.createCardElement(this.round.getCard(), this.playerCardsBox);
        this.round.getPlayerScore();
        this.round.setInitialScore();
    }

    createCardElement(card, container) {
        let img = document.createElement('img');
        img.src = card.cardName;
        img.classList.add('card');
        container.appendChild(img);
    }

    playerStand() {
        console.log("Player stand");
    }
}
