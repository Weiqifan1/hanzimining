import {CardDisplayTypes} from "../action-types/cardDisplayTypes";
import CardDisplay from "../../interfaces/cardDisplay";

interface changeStateAction {
    type: CardDisplayTypes.CHANGESTATE
    payload: {
        content: CardDisplay,
        newContent: CardDisplay
    }
}

// @ts-ignore
export type CardDisplayAction = changeStateAction