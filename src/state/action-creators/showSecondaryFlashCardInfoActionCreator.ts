import {Dispatch} from "redux";
import {ShowSecondaryFlashCardInfoAction} from "../actions/showSecondaryFlashCardInfoAction";
import {ShowSecondaryFlashCardInfoTypes} from "../action-types/showSecondaryFlashCardInfoTypes";

export const setShowSecondaryFlashCardInfo = (newState: boolean) => {
    return (dispatch: Dispatch<ShowSecondaryFlashCardInfoAction>) => {
        dispatch({
            type: ShowSecondaryFlashCardInfoTypes.SHOWSECONDARYFLASHCARDINFO,
            payload: newState
        })
    }
}