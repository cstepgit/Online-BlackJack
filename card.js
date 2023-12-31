export default class Card {
    constructor(valueSet, suitSet, cardNameSet){
      
    
        this.dealerHand = false;
        this.playerHand = false;
        this.discard = false;
        this.suit = suitSet;
        this.value = valueSet;
        this.cardName = cardNameSet;
    }
    get fileName(){
        console.log(this.cardName);
        return this.cardName; 
        
    }
}