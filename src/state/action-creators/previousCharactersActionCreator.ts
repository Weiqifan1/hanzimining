
import {FlashCard} from "../../interfaces/flashcard";
import {PreviousCharactersActionTypes} from "../action-types/previousCharactersActionTypes";
import {PreviousCharacterAction} from "../actions/previousCharactersAction";
import {Dispatch} from "redux";

export const addToPreviousCharacters = (newItem: FlashCard, existingState: [FlashCard[], FlashCard[], FlashCard[]]) => {
    return (dispatch: Dispatch<PreviousCharacterAction>) => {
        dispatch({
            type: PreviousCharactersActionTypes.ADDTOPREVIOUSCHARACTERS,
            payload: {
                Content: existingState,
                newContent: newItem
            }
        })
    }
}

export const substractFromPreviousCharacters = (newItem: FlashCard, existingState: [FlashCard[], FlashCard[], FlashCard[]]) => {
    return (dispatch: Dispatch<PreviousCharacterAction>) => {
        dispatch({
            type: PreviousCharactersActionTypes.SUBSTRACTFROMPREVIOUSCHARACTERS,
            payload: {
                Content: existingState,
                newContent: newItem
            }
        })
    }
}