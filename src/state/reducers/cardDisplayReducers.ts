import {CardDisplayAction} from "../actions/cardDisplayAction";
import {CardDisplayTypes} from "../action-types/cardDisplayTypes";
import CardDisplay from "../../interfaces/cardDisplay";

const initialState: CardDisplay = {
    showPrimaryCardInfo: false,
    showSecondaryCardInfo: false,
    readAloud: false
}

const changeStateReducer = (state: CardDisplay = initialState, action: CardDisplayAction): CardDisplay => {
    switch (action.type) {
        case CardDisplayTypes.CHANGESTATE:
            return action.payload.newContent
        default:
            return state
    }
}
export default changeStateReducer