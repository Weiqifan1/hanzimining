import {CharacterSRSaction} from "../actions/characterSRSactions";
import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {CharactersSRS, Content} from "../state-types/charactersrstypes";

const initialState: CharactersSRS = {
    characterset: '',
    content: []
}

const editListItem = (newContent: Content, characterSRSObject: CharactersSRS): CharactersSRS => {
    console.log("editListItem-reducer")
    return characterSRSObject
}

const characterSRSreducer = (state: CharactersSRS = initialState, action: CharacterSRSaction): CharactersSRS => {
    switch (action.type) {
        case CharacterSRSactionTypes.CREATESRSOBJECT:
            return action.payload.CharactersSRS
        case CharacterSRSactionTypes.EDITLISTITEM:
            return editListItem(action.payload.Content, action.payload.CharactersSRS)
        default:
            return state
    }
}
export default characterSRSreducer