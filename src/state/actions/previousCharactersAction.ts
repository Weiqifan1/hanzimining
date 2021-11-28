
import {PreviousCharactersActionTypes} from "../action-types/previousCharactersActionTypes";
import {FlashCard} from "../state-types/charactersrstypes";

interface addToPreviousCharacters {
    type: PreviousCharactersActionTypes.ADDTOPREVIOUSCHARACTERS//CharacterSRSactionTypes.EDITLISTITEMINBULK
    payload: {
        Content: [FlashCard[], FlashCard[], FlashCard[]],
        newContent: FlashCard
    }
}

interface substractFromPreviousCharacters {
    type: PreviousCharactersActionTypes.SUBSTRACTFROMPREVIOUSCHARACTERS
    payload: {
        Content: [FlashCard[], FlashCard[], FlashCard[]],
        newContent: FlashCard
    }
}

export type PreviousCharacterAction = addToPreviousCharacters | substractFromPreviousCharacters