import {FlashCard} from "../state-types/charactersrstypes";
import {PreviousCharactersActionTypes} from "../action-types/previousCharactersActionTypes";
import {PreviousCharacterAction} from "../actions/previousCharactersAction";

const initialState: FlashCard[] = []

const addToPreviousCharacters = (newContent: FlashCard, exixtingState: FlashCard[]): FlashCard[] => {
    const newState: FlashCard[] =  [...exixtingState, newContent];
    return newState;
}

const previousCharactersReducer = (state: FlashCard[] = initialState, action: PreviousCharacterAction): FlashCard[] => {
    switch (action.type) {
        case PreviousCharactersActionTypes.ADDTOPREVIOUSCHARACTERS://CharacterSRSactionTypes.CREATESRSOBJECT:
            //return action.payload.Content
            return addToPreviousCharacters(action.payload.newContent, action.payload.Content)
        default:
            return state
    }
}
export default previousCharactersReducer