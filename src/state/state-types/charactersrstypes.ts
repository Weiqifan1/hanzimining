

export interface FlashCard {
    cardNumber: number;
    cardName: string;
    frontSide: string;
    backSide: string;
    infoPrimary: string;
    infoSecondary: string;
    notableCards: number[];
    dateOfLastReview: string;
    repetitionValue: number;
}

export interface FlashCardDeck {
    deckName: string;
    cards: FlashCard[];
    previousCardsViewed: FlashCard[]
}