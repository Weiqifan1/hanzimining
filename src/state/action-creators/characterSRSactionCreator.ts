import {CharactersSRS} from "../state-types/charactersrstypes";
import {Dispatch} from "redux";
import {CharacterSRSaction} from "../actions/characterSRSactions";
import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";


export const createSRSobject = (characterSRSobject: CharactersSRS) => {
    return (dispatch: Dispatch<CharacterSRSaction>) => {
        dispatch({
            type: CharacterSRSactionTypes.CREATESRSOBJECT,
            payload: {
                CharactersSRS: characterSRSobject,
                Content: {
                    number: 0,
                    character: "",
                    keyword: "",
                    story: "",
                    dateOfLastReview: "",
                    reviewValue: 0,
                }
            }
        })
    }
}