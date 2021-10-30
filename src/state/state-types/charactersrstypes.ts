

export interface FlashCard {
    cardNumber: number;
    cardName: string;
    frontSide: string;
    backSide: string;
    primaryInfo: string;
    secondaryInfo: string;
    notableCards: number[];
    dateOfLastReview: string;
    repetitionValue: number;
}

export interface FlashCardDeck {
    deckName: string;
    deckInfo: string;
    settings: Map<string, string>;
    cards: FlashCard[];
}