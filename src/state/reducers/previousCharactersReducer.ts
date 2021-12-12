import {FlashCard} from "../../interfaces/flashcard";
import {PreviousCharactersActionTypes} from "../action-types/previousCharactersActionTypes";
import {PreviousCharacterAction} from "../actions/previousCharactersAction";

const initialState: [FlashCard[], FlashCard[], FlashCard[]] = [[],[],[]]

const addToPreviousCharacters = (newContent: FlashCard, exixtingState: [FlashCard[], FlashCard[], FlashCard[]]): [FlashCard[], FlashCard[], FlashCard[]] => {
    const newState: [FlashCard[], FlashCard[], FlashCard[]] =  [[...exixtingState[0], newContent], exixtingState[1], [...exixtingState[2], newContent]]
    return newState;
}

function substractFromPreviousCharacters(newContent: FlashCard, exixtingState: [FlashCard[], FlashCard[], FlashCard[]]) {
    const newState: [FlashCard[], FlashCard[], FlashCard[]] =  [exixtingState[0], [...exixtingState[1], newContent], [...exixtingState[2], newContent]]
    return newState;
}

const previousCharactersReducer = (state: [FlashCard[], FlashCard[], FlashCard[]] = initialState, action: PreviousCharacterAction): [FlashCard[], FlashCard[], FlashCard[]] => {

    switch (action.type) {
        case PreviousCharactersActionTypes.ADDTOPREVIOUSCHARACTERS:
            return addToPreviousCharacters(action.payload.newContent, action.payload.Content)
        case PreviousCharactersActionTypes.SUBSTRACTFROMPREVIOUSCHARACTERS:
            return substractFromPreviousCharacters(action.payload.newContent, action.payload.Content)
        default:
            return state
    }
}
export default previousCharactersReducer