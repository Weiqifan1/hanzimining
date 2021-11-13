

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
    repetitionHistory: number[];
    tags: string[];
}

export interface FlashCardDeck {
    deckName: string;
    deckInfo: string;
    settings: Record<string, string>;
    tags:  Record<string, string>;
    cards: FlashCard[];
}