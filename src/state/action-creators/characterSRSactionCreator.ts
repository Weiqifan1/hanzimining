import {FlashCard} from "../../interfaces/flashcard";
import {FlashCardDeck} from "../../interfaces/flashcarddeck";
import {Dispatch} from "redux";
import {CharacterSRSaction} from "../actions/characterSRSactions";
import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
export const createSRSobject = (characterSRSobject: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.CREATESRSOBJECT,
            payload: {
                CharactersSRS: characterSRSobject,
                Tags: new Map(),
                Content: [{
                    cardNumber: 0,
                    cardName: "",
                    frontSide: "",
                    backSide: "",
                    primaryInfo: "",
                    secondaryInfo: "",
                    notableCards: [],
                    dateOfLastReview: "",
                    repetitionValue: 0,
                    repetitionHistory: [],
                    tags: []
                }]
            }
        })
    }
}

export const addNewTag = (updatedtags: Record<string, string>, characterSRSobject: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.ADDNEWTAG,
            payload: {
                CharactersSRS: characterSRSobject,
                Tags: updatedtags,
                Content: characterSRSobject.cards
            }
        })
    }
}

export const editSingleTag = (NewTag: string[], OldTagTitle: string, CharactersSRS: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.EDITSINGLETAG,
            payload: {
                NewTag: NewTag,
                OldTagTitle: OldTagTitle,
                CharactersSRS: CharactersSRS
            }
        })
    }
}

export const removeTag = (updatedtags: Record<string, string>, characterSRSobject: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.REMOVETAG,
            payload: {
                CharactersSRS: characterSRSobject,
                Tags: updatedtags,
                Content: characterSRSobject.cards
            }
        })
    }
}


export const editListItem = (listItem: FlashCard, characterSRSobject: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.EDITLISTITEM,
            payload: {
                CharactersSRS: characterSRSobject,
                Content: [listItem]
            }
        })
    }
}

export const editListItemInBulk = (listItemsInBulk: FlashCard[], characterSRSobject: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.EDITLISTITEMINBULK,
            payload: {
                CharactersSRS: characterSRSobject,
                Content: listItemsInBulk
            }
        })
    }
}

export const createDeck = (newCards: FlashCard[], characterSRSobject: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.CREATENEWDECK,
            payload: {
                CharactersSRS: characterSRSobject,
                Content: newCards
            }
        })
    }
}

export const addNewCardsToDeck = (newCards: FlashCard[], characterSRSobject: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.ADDNEWCARDSTODECK,
            payload: {
                CharactersSRS: characterSRSobject,
                Content: newCards
            }
        })
    }
}

export const deleteOrEditCardOrder = (toDelete: string, toChange: string, deck: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.DELETEOREDITCARDORDER,
            payload: {
                CharactersSRS: deck,
                CharsToBeDeleted: toDelete,
                OrderToBeChanged: toChange
            }
        })
    }
}

export const replacesettings_filtercardsbytag = (settingsToReplace: Record<string, string>, deck: FlashCardDeck) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.REPLACESETTINGS_FILTERCARDSBYTAG,
            payload: {
                CharactersSRS: deck,
                SettingsToReplace: settingsToReplace
            }
        })
    }
}
