import {CharacterSRSaction} from "../actions/characterSRSactions";
import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {CharactersSRS} from "../state-types/charactersrstypes";

const initialState: CharactersSRS = {
    characterset: '',
    content: []
}

const characterSRSreducer = (state: CharactersSRS = initialState, action: CharacterSRSaction): CharactersSRS => {
    switch (action.type) {
        case CharacterSRSactionTypes.CREATESRSOBJECT:
            return action.payload
        default:
            return state
    }
}
export default characterSRSreducer