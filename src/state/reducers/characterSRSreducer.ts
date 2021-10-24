import {CharacterSRSaction} from "../actions/characterSRSactions";
import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {FlashCardDeck, FlashCard} from "../state-types/charactersrstypes";

const initialState: FlashCardDeck = {
    previousCharacters: [],
    characterset: '',
    content: []
}

const editListItem = (newContent: FlashCard, characterSRSObject: FlashCardDeck): FlashCardDeck => {
    const characterList: FlashCard[] = characterSRSObject.content
    const newContentNumber: number = newContent.number
    const index = characterList.map(function(e) { return e.number; }).indexOf(newContentNumber);

    const earlyIndexMembers: FlashCard[] = characterList.slice(0, index);
    const lateIndexMembers: FlashCard[] = characterList.slice(index+1, characterList.length)

    const newContentList: FlashCard[] = earlyIndexMembers
    newContentList.push(newContent)
    newContentList.push(...lateIndexMembers)

    const result: FlashCardDeck = {
        ...characterSRSObject,
        characterset: characterSRSObject.characterset,
        content: newContentList
    }
    return result
}

const editListItemsInBulk = (newContentInBulk: FlashCard[], characterSRSObject: FlashCardDeck): FlashCardDeck => {
    //remove all charactersThatHasTheSameNumbers
    const allNewNumbers: number[] = newContentInBulk.map(each => each.number)
    const characterList: FlashCard[] = characterSRSObject.content.filter(each => !allNewNumbers.includes(each.number))
    const redoneArray: FlashCard[] = characterList.concat(newContentInBulk)
    const result: FlashCardDeck = {
        ...characterSRSObject,
        characterset: characterSRSObject.characterset,
        content: redoneArray
    }
    return result
}

const characterSRSreducer = (state: FlashCardDeck = initialState, action: CharacterSRSaction): FlashCardDeck => {
    switch (action.type) {
        case CharacterSRSactionTypes.CREATESRSOBJECT:
            return action.payload.CharactersSRS
        case CharacterSRSactionTypes.EDITLISTITEM:
            return editListItem(action.payload.Content[0], action.payload.CharactersSRS)
        case CharacterSRSactionTypes.EDITLISTITEMINBULK:
            return editListItemsInBulk(action.payload.Content, action.payload.CharactersSRS)
        default:
            return state
    }
}
export default characterSRSreducer