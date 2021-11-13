import {CharacterSRSaction} from "../actions/characterSRSactions";
import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {FlashCard, FlashCardDeck} from "../state-types/charactersrstypes";

const initialState: FlashCardDeck = {
    deckName: '',
    deckInfo: '',
    settings: {} as Record<string, string>,
    tags: {} as Record<string, string>,
    cards: []
}

const editListItem = (newContent: FlashCard, characterSRSObject: FlashCardDeck): FlashCardDeck => {
    const characterList: FlashCard[] = characterSRSObject.cards
    const newContentNumber: number = newContent.cardNumber
    const index = characterList.map(function(e) { return e.cardNumber; }).indexOf(newContentNumber);

    const earlyIndexMembers: FlashCard[] = characterList.slice(0, index);
    const lateIndexMembers: FlashCard[] = characterList.slice(index+1, characterList.length)

    const newContentList: FlashCard[] = earlyIndexMembers
    newContentList.push(newContent)
    newContentList.push(...lateIndexMembers)

    const result: FlashCardDeck = {
        ...characterSRSObject,
        deckName: characterSRSObject.deckName,
        cards: newContentList
    }
    return result
}

const editListItemsInBulk = (newContentInBulk: FlashCard[], characterSRSObject: FlashCardDeck): FlashCardDeck => {
    //remove all charactersThatHasTheSameNumbers
    const allNewNumbers: number[] = newContentInBulk.map(each => each.cardNumber)
    const characterList: FlashCard[] = characterSRSObject.cards.filter(each => !allNewNumbers.includes(each.cardNumber))
    const redoneArray: FlashCard[] = characterList.concat(newContentInBulk)
    const result: FlashCardDeck = {
        ...characterSRSObject,
        deckName: characterSRSObject.deckName,
        cards: redoneArray
    }
    return result
}

const addNewTag = (updatedTags: Record<string, string>, characterSRSObject: FlashCardDeck): FlashCardDeck => {
    const result: FlashCardDeck = {
        ...characterSRSObject,
        tags: updatedTags
    }
    return result
}

const removeTag = (updatedTags: Record<string, string>, characterSRSObject: FlashCardDeck): FlashCardDeck => {
    const result: FlashCardDeck = {
        ...characterSRSObject,
        tags: updatedTags
    }
    return result
}


const characterSRSreducer = (state: FlashCardDeck = initialState, action: CharacterSRSaction): FlashCardDeck => {
    switch (action.type) {
        case CharacterSRSactionTypes.CREATESRSOBJECT:
            return action.payload.CharactersSRS
        case CharacterSRSactionTypes.ADDNEWTAG:
            return addNewTag(action.payload.Tags, action.payload.CharactersSRS)
        case CharacterSRSactionTypes.REMOVETAG:
            return removeTag(action.payload.Tags, action.payload.CharactersSRS)
        case CharacterSRSactionTypes.EDITLISTITEM:
            return editListItem(action.payload.Content[0], action.payload.CharactersSRS)
        case CharacterSRSactionTypes.EDITLISTITEMINBULK:
            return editListItemsInBulk(action.payload.Content, action.payload.CharactersSRS)
        default:
            return state
    }
}
export default characterSRSreducer