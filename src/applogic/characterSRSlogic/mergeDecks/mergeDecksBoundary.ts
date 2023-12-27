
import {FlashCardDeck} from "../../../interfaces/flashcarddeck";
export const mergeDecksNoAbstraction_accreteOccurrenceOfTagsAndInfo_Main = (input: FlashCardDeck[],
                                                deckName: string,
                                                deckInfo: string): FlashCardDeck => {
    return emptydeck();
}

export const mergeDecksNoAbstraction_copyFirstOccurrenceOfTagsAndDeckInfo_Main = (input: FlashCardDeck[],
                                            deckName: string,
                                            deckInfo: string): FlashCardDeck => {
    return emptydeck();
}

export const mergeDecksHigherAbstraction_accreteOccurrenceOfTagsAndInfo_Main = (input: FlashCardDeck[],
                                                deckName: string,
                                                deckInfo: string): FlashCardDeck => {
    return emptydeck();
}

export const mergeDecksHigherAbstraction_copyFirstOccurrenceOfTagsAndDeckInfo_Main = (input: FlashCardDeck[],
                                                deckName: string,
                                                deckInfo: string): FlashCardDeck => {
    return emptydeck();
}

const emptydeck = (): FlashCardDeck => {
    var tempDeck: FlashCardDeck = {
        deckName: "",
        deckInfo: "",
        settings: {},
        tags: {},
        cards: []
    };
    return tempDeck;
}

