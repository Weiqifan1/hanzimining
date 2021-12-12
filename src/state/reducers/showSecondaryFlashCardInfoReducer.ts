
import {ShowSecondaryFlashCardInfoAction} from "../actions/showSecondaryFlashCardInfoAction";
import {ShowSecondaryFlashCardInfoTypes} from "../action-types/showSecondaryFlashCardInfoTypes";

const initialState: boolean = true

const showSecondaryFlashCardInfoReducer = (state: boolean = initialState, action: ShowSecondaryFlashCardInfoAction): boolean => {
    switch (action.type) {
        case ShowSecondaryFlashCardInfoTypes.SHOWSECONDARYFLASHCARDINFO:
            return action.payload
        default:
            return state
    }
}
export default showSecondaryFlashCardInfoReducer