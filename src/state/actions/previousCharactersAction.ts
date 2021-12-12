
import {PreviousCharactersActionTypes} from "../action-types/previousCharactersActionTypes";
import {FlashCard} from "../../interfaces/flashcard";

interface addToPreviousCharacters {
    type: PreviousCharactersActionTypes.ADDTOPREVIOUSCHARACTERS
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