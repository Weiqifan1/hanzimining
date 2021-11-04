import {FlashCard, FlashCardDeck} from "../../../state/state-types/charactersrstypes";

export const cardExistInDeck = (cardNumber: number, currentState: FlashCardDeck): boolean => {
    const cardCandidates: FlashCard[]  = currentState.cards.filter(x=>{
        return (x.cardNumber === cardNumber)
    })
    if (cardCandidates.length > 0) {
        return true
    }else {
        return false
    }
}

export const getFlashCard = (cardNumber: number, currentState: FlashCardDeck): FlashCard => {
   const cardCandidates: FlashCard[]  = currentState.cards.filter(x=>{
       return (x.cardNumber === cardNumber)
   })
   if (cardCandidates.length > 0) {
       return cardCandidates[0]
   } else {
       const newCard: FlashCard = {
           backSide: "",
           cardName: "",
           cardNumber: 0,
           dateOfLastReview: "",
           frontSide: "",
           notableCards: [],
           primaryInfo: "",
           repetitionValue: 0,
           secondaryInfo: ""
       }
       return newCard
   }
}


//cardNumber: number;
//cardName: string;
//frontSide: string;
//backSide: string;
//primaryInfo: string;
//secondaryInfo: string;
//notableCards: number[];
//dateOfLastReview: string;
//repetitionValue: number;
