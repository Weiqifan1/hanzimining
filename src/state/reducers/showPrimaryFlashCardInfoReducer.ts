
import {ShowPrimaryFlashCardInfoAction} from "../actions/showPrimaryFlashCardInfoAction";
import {ShowPrimaryFlashCardInfoTypes} from "../action-types/showPrimaryFlashCardInfoTypes";

const initialState: boolean = true

const showPrimaryFlashCardInfoReducer = (state: boolean = initialState, action: ShowPrimaryFlashCardInfoAction): boolean => {
    switch (action.type) {
        case ShowPrimaryFlashCardInfoTypes.SHOWPRIMARYFLASHCARDINFO:
            return action.payload
        default:
            return state
    }
}
export default showPrimaryFlashCardInfoReducer