import characterSRSlogic from "../../interfaces/characterSRSlogic";
import {FlashCard} from "../../interfaces/flashcard";
import {getReviewPriority} from "../characterSRSlogic/calculateCharacterSRSorder/calculateContentReviewPriority";
import {FlashCardDeck} from "../../interfaces/flashcarddeck";
import {CreateDeckData} from "../../interfaces/createdeckdata";

/*
export interface FlashCardDeck {
    deckName: string;
    deckInfo: string;
    settings: Record<string, Record<string, string>>;
    tags:  Record<string, string>;
    cards: FlashCard[];
}
*/

export const generateNewDeck = (input: CreateDeckData): FlashCardDeck => {
    const res: FlashCardDeck = {
        deckName: "deckname",
        deckInfo: "deckinfo",
        settings: {},
        tags: {},
        cards: []
    };
    return res
}

