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
                }]
            }
            /*
            deckName: string;
    cards: FlashCard[];
    previousCardsViewed: FlashCard[]

            cardNumber: number;
    cardName: string;
    frontSide: string;
    backSide: string;
    infoPrimary: string;
    infoSecondary: string;
    notableCards: number[];
    dateOfLastReview: string;
    repetitionValue: number;
            */
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