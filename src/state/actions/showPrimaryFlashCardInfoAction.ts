
import {ShowPrimaryFlashCardInfoTypes} from "../action-types/showPrimaryFlashCardInfoTypes";

interface addToPreviousCharacters {
    type: ShowPrimaryFlashCardInfoTypes.SHOWPRIMARYFLASHCARDINFO
    payload: boolean
}

export type ShowPrimaryFlashCardInfoAction = addToPreviousCharacters