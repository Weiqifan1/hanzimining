import {FlashCard} from "../interfaces/flashcard";
import {FlashCardDeck} from "../interfaces/flashcarddeck";

export default interface characterSRSlogic {
    characterSRS: FlashCardDeck;
    currentContent: FlashCard | undefined;
    mostRecentContentObjects: FlashCard[];
    notEnoughCharacters: boolean
}