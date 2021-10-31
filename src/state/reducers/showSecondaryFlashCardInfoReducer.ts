import {FlashCard} from "../state-types/charactersrstypes";
import {ShowSecondaryFlashCardInfoAction} from "../actions/showSecondaryFlashCardInfoAction";
import previousCharactersReducer from "./previousCharactersReducer";
import {ShowSecondaryFlashCardInfoTypes} from "../action-types/showSecondaryFlashCardInfoTypes";

const initialState: boolean = true

const showSecondaryFlashCardInfoReducer = (state: boolean = initialState, action: ShowSecondaryFlashCardInfoAction): boolean => {
    switch (action.type) {
        case ShowSecondaryFlashCardInfoTypes.SHOWSECONDARYFLASHCARDINFO://CharacterSRSactionTypes.CREATESRSOBJECT:
            //return action.payload.Content
            return action.payload
        default:
            return state
    }
}
export default showSecondaryFlashCardInfoReducer