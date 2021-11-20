import {FlashCardDeck, FlashCard} from "../state-types/charactersrstypes";
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

//editsingletag
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