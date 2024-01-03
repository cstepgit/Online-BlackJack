import Deck from '../Src/deck.js';
import Round from './round.js';

// 1 is dealer win 2 is player win
export default class Game {
    constructor() {
        //  Constructs new deck, shuffles it, and gets element ids for where 
        //  Player and dealer cards will be displayed
        this.myDeck = new Deck();
        this.myDeck.shuffleDeck();
        this.round = new Round(this.myDeck);
        this.dealerCardsBox = document.getElementById('dealer');
        this.playerCardsBox = document.getElementById('player');
    
        //  Gets references to the buttons on screen
        this.startButton = document.getElementById('start');
        this.hitButton = document.getElementById('hit');
        this.standButton = document.getElementById('stand');
        this.newRoundButton = document.getElementById('newRound');

        // Disables buttons that can't be clicked until start of round
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
        this.newRoundButton.disabled = true;
        this.startButton.disabled = false;


        //  Event Listener for start button
        this.startButton.addEventListener('click', () => {
            //  Deals and displays two cards for each player and dealer
            this.roundSetUp();
            // Enables the hit and stand button once round has started 
            this.hitButton.disabled = false;
            this.standButton.disabled = false;
            this.startButton.disabled = true;

        });

        // Event listeners for the hit and stand buttons
        this.hitButton.addEventListener('click', () => {
            this.hitButton.classList.add('active-button');
            this.playerHit();
        });

        this.standButton.addEventListener('click', () => {
            this.standButton.classList.add('active-button');
            this.playerStand();
        });

        this.newRoundButton.addEventListener('click', () => {
            this.standButton.classList.add('active-button');
            this.newRound();
        });
    }
    //  Sets up the initial dealing
    roundSetUp() {
        this.myDeck.shuffleDeck();
        console.log(this.myDeck); 
        let card = this.round.getCard();
        this.round.createCardElement(card, this.playerCardsBox);

        card = this.round.getDealerCard();
        this.round.createCardElement(card, this.dealerCardsBox);

        card = this.round.getCard();
        this.round.createCardElement(card, this.playerCardsBox);

        card = this.round.getDealerCard();
        this.round.createCardElement(card, this.dealerCardsBox);

        this.round.playRound();
        console.log('Round set up');
        if(this.round.playerCardScore == this.round.BLACKJACK){
            this.playerStand();
        }
        else if (this.round.dealerCardScore == this.round.BLACKJACK){
            this.round.win("Dealer"); 
        }

    }

    //  Called when player clicks hit
    playerHit() {
        console.log("Player hit");
        if(this.myDeck.availableCards == 0){
            this.myDeck.shuffleDiscard();
        }
        this.round.createCardElement(this.round.getCard(), this.playerCardsBox);
        this.round.getPlayerScore();
        this.round.updateScoreDisplay();
        if (this.round.playerCardScore > this.round.BLACKJACK) {
            console.log("Player Bust");
            this.round.win("Dealer");
        }
        else if (this.round.playerCardScore == this.round.BLACKJACK) {
            this.round.dealerTurn();
        }
    }
    //  Called when player clicks stand 
    playerStand() {
        console.log("Player stand");
        this.round.disableHitStandButtons();
        this.round.dealerTurn();
    }

    newRound() {
     
        //  Deals and displays two cards for each player and dealer
        this.round.removeAllCards();
        // Enables the hit and stand button once round has started 
        this.hitButton.disabled = false;
        this.standButton.disabled = false;
        this.startButton.disabled = true;
        this.newRoundButton.disabled = true;
        this.round = new Round(this.myDeck);
      
        this.roundSetUp();
        this.round.updateScoreDisplay();
       
    }


}
