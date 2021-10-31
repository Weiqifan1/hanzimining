/*export const editListItem = (listItem: FlashCard, characterSRSobject: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.EDITLISTITEM,
            payload: {
                CharactersSRS: characterSRSobject,
                Content: [listItem]
            }
        })
    }
}*/

import {FlashCard} from "../state-types/charactersrstypes";
import {CharacterSRSaction} from "../actions/characterSRSactions";
import {PreviousCharactersActionTypes} from "../action-types/previousCharactersActionTypes";
import {PreviousCharacterAction} from "../actions/previousCharactersAction";
import {Dispatch} from "redux";

export const addToPreviousCharacters = (newItem: FlashCard, existingState: FlashCard[]) => {
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