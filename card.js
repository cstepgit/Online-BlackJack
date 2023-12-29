export class Card {
    constructor(valueSet, suitSet, cardNameSet){
        let dealerHand;
        let playerHand;
        let discard;
        let suit;
        let value;
        let cardName;
    
        dealerHand = false;
        playerHand = false;
        discard = false;
        suit = suitSet;
        value = valueSet;
        cardName = cardNameSet;
    }
}