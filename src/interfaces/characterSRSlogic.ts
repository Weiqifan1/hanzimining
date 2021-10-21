import {CharactersSRS, Content} from "../state/state-types/charactersrstypes";

export default interface characterSRSlogic {
    //attributes needed to conduct repetition
    characterSRS: CharactersSRS;
    currentContent: Content;
    mostRecentContentObjects: Content[];
    //attributes needed when repetition cant be conducted easily
    notEnoughCharacters: boolean
}