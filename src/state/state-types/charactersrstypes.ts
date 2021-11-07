

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

//case class HeisigCollection(deckName: String, tags:Map[String, String], cards: Array[HeisigObj])
export interface FlashCardDeck {
    deckName: string;
    deckInfo: string;
    settings: Map<string, string>;
    tags:  Map<string, string>;
    cards: FlashCard[];
}