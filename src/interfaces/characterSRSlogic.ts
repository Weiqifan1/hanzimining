import {FlashCardDeck, FlashCard} from "../state/state-types/charactersrstypes";

export default interface characterSRSlogic {
    characterSRS: FlashCardDeck;
    currentContent: FlashCard | undefined;
    mostRecentContentObjects: FlashCard[];
    notEnoughCharacters: boolean
}