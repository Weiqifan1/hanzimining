import {FlashCardDeck, FlashCard} from "../state/state-types/charactersrstypes";

export default interface characterSRSlogic {
    //attributes needed to conduct repetition
    characterSRS: FlashCardDeck;
    currentContent: FlashCard | undefined;
    mostRecentContentObjects: FlashCard[];
    //attributes needed when repetition cant be conducted easily
    notEnoughCharacters: boolean
}