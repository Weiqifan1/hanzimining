import {CharacterSRSaction} from "../actions/characterSRSactions";
import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {CharactersSRS, Content} from "../state-types/charactersrstypes";

const initialState: CharactersSRS = {
    characterset: '',
    content: []
}

const editListItem = (newContent: Content, characterSRSObject: CharactersSRS): CharactersSRS => {
    const characterList: Content[] = characterSRSObject.content
    const newContentNumber: number = newContent.number
    const index = characterList.map(function(e) { return e.number; }).indexOf(newContentNumber);

    const earlyIndexMembers: Content[] = characterList.slice(0, index);
    const lateIndexMembers: Content[] = characterList.slice(index+1, characterList.length)

    const newContentList: Content[] = earlyIndexMembers
    newContentList.push(newContent)
    newContentList.push(...lateIndexMembers)

    const result: CharactersSRS = {
        characterset: characterSRSObject.characterset,
        content: newContentList
    }
    return result
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