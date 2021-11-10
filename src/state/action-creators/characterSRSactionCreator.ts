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

export const addNewTag = (updatedtags: Map<string, string>, characterSRSobject: FlashCardDeck) => {
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