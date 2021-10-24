

export interface FlashCard {
    number: number;
    character: string;
    keyword: string;
    story: string;
    dateOfLastReview: string;
    reviewValue: number;
}

export interface FlashCardDeck {
    characterset: string;
    content: FlashCard[];
    previousCharacters: FlashCard[]
}