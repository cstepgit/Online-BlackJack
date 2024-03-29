import Deck from '../Src/deck.js';
import Bank from './bank.js';
import Round from './round.js';

export default class Game {
    constructor() {
        //  Constructs new deck, shuffles it, and gets element ids for where 
        //  Player and dealer cards will be displayed
        this.myDeck = new Deck();
        this.myDeck.shuffleDeck();
        this.bank = new Bank(500);
        this.round = new Round(this.myDeck,this.bank);
      
        this.dealerCardsBox = document.getElementById('dealer');
        this.playerCardsBox = document.getElementById('player');
    
        //  Gets references to the buttons on screen
        this.startButton = document.getElementById('start');
        this.hitButton = document.getElementById('hit');
        this.standButton = document.getElementById('stand');
        this.newRoundButton = document.getElementById('newRound');
        this.betButton = document.getElementById('bet_submit');

        // Disables buttons that can't be clicked until start of round
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
        this.newRoundButton.disabled = true;
        this.startButton.disabled = false;

        this.bank.displayBank();
        this.bank.displayBet();
        //  Event Listener for start button
        this.startButton.addEventListener('click', () => {
            //  Deals and displays two cards for each player and dealer
            let modal = document.getElementById("introScreen");
            modal.style.display = "none";
            // Enables the hit and stand button once round has started 
        });

        this.betButton.addEventListener('click', () => {
            //  Deals and displays two cards for each player and dealer
            this.newRound();
            const modal = document.getElementById("betting_pannel");
            const overlay = document.querySelector(".overlay"); 
            modal.classList.add("hidden");
            overlay.classList.add("hidden"); 

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
            this.newRoundButton.classList.add('active-button');
            let winScreen = document.getElementById('winScreen');
            winScreen.style.display = "none"; 
            const modal = document.getElementById("betting_pannel");
            const overlay = document.querySelector(".overlay"); 
            modal.classList.remove("hidden");
            overlay.classList.remove("hidden"); 
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
        let dealerValue = this.round.getDealerCardScore();
        card = this.round.getCard();
        this.round.createCardElement(card, this.playerCardsBox);

        card = this.round.getDealerCard();
        let img = document.createElement('img');
        img.src = "./Cards/card back red.png";
        img.classList.add('card');
        this.dealerCardsBox.appendChild(img);
        
        this.round.updatePlayerScoreDisplay();
        this.round.updateDealerFirstScoreDisplay(dealerValue); 
        console.log('Round set up');
        if(this.round.playerCardScore == this.round.BLACKJACK){
            this.playerStand();
        }
        else if (this.round.dealerCardScore == this.round.BLACKJACK){
            this.round.revealDealerCard();
            this.round.win("Dealer"); 
            this.bank.payout("Dealer");
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
        this.round.updatePlayerScoreDisplay();
        if (this.round.playerCardScore > this.round.BLACKJACK) {
            console.log("Player Bust");
            this.round.win("Dealer"); 
            this.bank.payout("Dealer"); 
            this.round.revealDealerCard();
            // Player busted so the dealer wins
        
        }
        // player got blackjack so now send to dealer for tie attempt
        else if (this.round.playerCardScore == this.round.BLACKJACK) {
            this.dealerTurn();
        }
    }
    //  Called when player clicks stand 
    playerStand() {
        // player stood so send to dealer turn 
        console.log("Player stand");
        this.round.disableHitStandButtons();
        this.dealerTurn();        
    }

    async dealerTurn(){
        let dealerCardsBox = document.getElementById('dealer');
        console.log("NEW DEALER TURN");
        this.round.revealDealerCard();

        // Check for dealer blackjack
        if(this.round.dealerCardScore == this.round.BLACKJACK && this.round.playerCardScore != this.round.BLACKJACK){
            this.round.win("Dealer"); 
            this.bank.payout("Dealer"); 
            return;
        }

        // Check if dealer just beat players score
        if(this.round.dealerCardScore > this.round.playerCardScore){
            this.round.win("Dealer");
            this.bank.payout("Dealer"); 
            return; 
        }
        // Check if player has a blackjack
    if (this.round.playerCardScore == this.round.BLACKJACK) {
        if (this.round.dealerCardScore == this.round.BLACKJACK) {
          // It's a tie if both dealer and player have blackjack
          this.round.win();
          this.bank.payout("Push"); 
        } else {
          // Player wins with blackjack
          this.round.win("Player");
          this.bank.payout("Player"); 
        }
        return;
      }
  
      while (this.round.dealerCardScore < this.round.playerCardScore) {
        await pause(1000);
  
        // Give the dealer a new card
        this.round.createCardElement(this.round.getDealerCard(this.deck), dealerCardsBox);
  
        // Update the dealer's score with the new card
        this.round.dealerCardScore = this.round.dealerHand.calculateScore();
        this.round.updateDealerScoreDisplay();
  
        // Check for bust
        if (this.round.dealerCardScore > this.round.BLACKJACK) {
          this.round.win("Player");
          this.bank.payout("Player"); 
        } else if (this.round.dealerCardScore > this.round.playerCardScore) {
          // If dealer has a score greater than or equal to player, dealer wins
          this.round.win("Dealer");
          this.bank.payout("Dealer"); 
        }
      }
 
      // Check for a tie if both dealer and player have the same score
      if (this.round.dealerCardScore === this.round.playerCardScore) {
        this.round.win();
        this.bank.payout("Push");
      }

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
        this.round.updatePlayerScoreDisplay();
       
    }


}
async function pause(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
