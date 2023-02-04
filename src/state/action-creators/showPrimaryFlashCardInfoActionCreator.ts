import {Dispatch} from "redux";
import {ShowPrimaryFlashCardInfoAction} from "../actions/showPrimaryFlashCardInfoAction";
import {ShowPrimaryFlashCardInfoTypes} from "../action-types/showPrimaryFlashCardInfoTypes";

export const setShowPrimaryFlashCardInfo = (newState: boolean) => {
    return (dispatch: Dispatch<ShowPrimaryFlashCardInfoAction>) => {
        dispatch({
            type: ShowPrimaryFlashCardInfoTypes.SHOWPRIMARYFLASHCARDINFO,
            payload: newState
        })
    }
}