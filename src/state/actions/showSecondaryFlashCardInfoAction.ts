
import {ShowSecondaryFlashCardInfoTypes} from "../action-types/showSecondaryFlashCardInfoTypes";

interface addToPreviousCharacters {
    type: ShowSecondaryFlashCardInfoTypes.SHOWSECONDARYFLASHCARDINFO
    payload: boolean
}

export type ShowSecondaryFlashCardInfoAction = addToPreviousCharacters