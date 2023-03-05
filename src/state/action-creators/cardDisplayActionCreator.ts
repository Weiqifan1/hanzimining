import {Dispatch} from "redux";
import {CardDisplayAction} from "../actions/cardDisplayAction";
import {CardDisplayTypes} from "../action-types/cardDisplayTypes";
import CardDisplay from "../../interfaces/cardDisplay";

export const cardDisplayChangeState = (newState: CardDisplay, existingState: CardDisplay) => {
    return (dispatch: Dispatch<CardDisplayAction>) => {
        dispatch({
            type: CardDisplayTypes.CHANGESTATE,
            payload: {
                content: existingState,
                newContent: newState
            }
        })
    }
}