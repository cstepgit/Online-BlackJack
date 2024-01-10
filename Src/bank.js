export default class Bank {
    constructor(startingBank) {
        this.bankTotal = startingBank
        this.totalBet = 0;
        this.betdisplay = document.getElementById('betting_output');
        this.bankDisplay = document.getElementById('bankTotal'); 

        this.bet_5 = document.getElementById('bet_5');
        this.bet_10 = document.getElementById('bet_10');
        this.bet_25 = document.getElementById('bet_25');
        this.bet_50 = document.getElementById('bet_50');
        this.bet_100 = document.getElementById('bet_100');
        this.bet_500 = document.getElementById('bet_500');
        this.bet_submit = document.getElementById('bet_submit');
        this.bet_clear = document.getElementById('bet_clear');
        this.all_in = document.getElementById('all_in');
        this.possible_payout = document.getElementById('possiblePayout');

        this.PAYOUT_RATIO = 3/2

        this.bet_5.addEventListener('click', () => {
            this.bet_5.classList.add('active-button');
            this.placeBet(5);
            
        });

        this.bet_10.addEventListener('click', () => {
            this.bet_10.classList.add('active-button');
            this.placeBet(10);
          
        });

        this.bet_25.addEventListener('click', () => {
            this.bet_25.classList.add('active-button');
            this.placeBet(25);
            
        });

        this.bet_50.addEventListener('click', () => {
            this.bet_50.classList.add('active-button');
            this.placeBet(50);
            
        });

        this.bet_100.addEventListener('click', () => {
            this.bet_100.classList.add('active-button');
            this.placeBet(100);
       
        });

        this.bet_500.addEventListener('click', () => {
            this.bet_5.classList.add('active-button');
            this.placeBet(500);
       
        });

        this.bet_submit.addEventListener('click', () => {
            this.bet_submit.classList.add('active-button');
            console.log("Lock in bet")
        });

        this.bet_clear.addEventListener('click', () => {
            this.bet_clear.classList.add('active-button');
            console.log("clear Bet");
            this.betClear();
          
        });
        this.all_in.addEventListener('click', () => {
            this.all_in.classList.add('active-button');
            console.log("all in");
           this.allIn();
          
        });

        this.possiblePayout();
        this.displayBank();
    }
    displayBank(){
        this.bankDisplay.innerHTML = "Bank Total: " + this.bankTotal; 
    }
    betClear() {
        console.log("clear Bet");
        this.bankTotal += this.totalBet; 
        this.totalBet = 0;
        this.displayBank();
        this.displayBet();
        this.possiblePayout();
    }
    displayBet() {
        this.betdisplay.innerHTML = this.totalBet;
    }
    placeBet(bet) {
        if (bet <= this.bankTotal) {
            this.totalBet += bet;
            this.bankTotal -= bet;
            this.displayBet();
            this.displayBank(); 
            this.possiblePayout(bet);
        }
        else{
            console.log("not enough money"); 
        }
    }
    payout(winner) {
       if (winner == "Player") {
            this.bankTotal += this.totalBet * this.PAYOUT_RATIO;
        }
        else if(winner == "Push"){
            this.bankTotal += this.totalBet;
        }
        this.totalBet = 0;
        this.displayBet();
        this.displayBank();
        this.possiblePayout();
    }
    possiblePayout(){
        console.log(this.totalBet*3/2); 
        this.possible_payout.innerHTML = "Possible payout: " + this.totalBet * this.PAYOUT_RATIO
    }
    allIn(){
        this.totalBet+= this.bankTotal; 
        this.bankTotal = 0;
        this.displayBank();
        this.displayBet();
        this.possiblePayout();
    }

}