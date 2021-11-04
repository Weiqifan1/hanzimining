import {FlashCard, FlashCardDeck} from "../../../state/state-types/charactersrstypes";

export const getFlashCard = (cardNumber: number, currentState: FlashCardDeck): FlashCard => {
    if (currentState.cards.length > 0) {
        return currentState.cards[0]
    }else {
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
