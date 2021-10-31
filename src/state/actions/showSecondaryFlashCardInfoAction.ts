
import {ShowSecondaryFlashCardInfoTypes} from "../action-types/showSecondaryFlashCardInfoTypes";

interface addToPreviousCharacters {
    type: ShowSecondaryFlashCardInfoTypes.SHOWSECONDARYFLASHCARDINFO//CharacterSRSactionTypes.EDITLISTITEMINBULK
    payload: boolean
}

export type ShowSecondaryFlashCardInfoAction = addToPreviousCharacters