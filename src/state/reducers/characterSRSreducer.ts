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

const editSingleTag = (NewTag: string[], OldTagTitle: string, characterSRSObject: FlashCardDeck): FlashCardDeck => {
    const result: FlashCardDeck = privateEditSingleTagAndCreateNewDeck(NewTag, OldTagTitle, characterSRSObject)
    return result
}

const privateEditSingleTagAndCreateNewDeck = (NewTag: string[], OldTagTitle: string, characterSRSObject: FlashCardDeck): FlashCardDeck => {
    const cleanTitle: string = privateCleanTagTitle(NewTag[0])
    const newTag: string[] = [cleanTitle, NewTag[1]]

    if (cleanTitle.length > 0) {
        const updatedCardTagList: Record<string, string> = privateUpdateTagListOnDeck(characterSRSObject.tags, newTag, OldTagTitle)
        const updatetedFlashCardList: FlashCard[] = privateUpdateFlashCardList(characterSRSObject.cards, newTag, OldTagTitle)
        var newDeck: FlashCardDeck = {...characterSRSObject, tags: updatedCardTagList, cards: updatetedFlashCardList}
        return newDeck
    }
    return characterSRSObject
}

const privateUpdateFlashCardList = (oldCards: FlashCard[], newTag: string[], oldTagTitle: string): FlashCard[] => {
    var newCardList: FlashCard[] = new Array()
    oldCards.forEach(function (eachCard) {
        if (eachCard.tags.indexOf(oldTagTitle) > -1) {
            const updatedCard: FlashCard = privateUpdateTagListOnEachCard(eachCard, newTag, oldTagTitle)
            newCardList.push(updatedCard)
        }else {
            newCardList.push(eachCard)
        }
    });
    return newCardList
}

const privateUpdateTagListOnEachCard = (eachCard: FlashCard, newTag: string[], oldTagTitle: string) => {
    var newCardTagList: string[] = new Array()
    eachCard.tags.forEach(function (eachTag){
        if (eachTag != oldTagTitle) {
            newCardTagList.push(eachTag)
        }
    })
    newCardTagList.push(newTag[0])
    const newCard: FlashCard = {...eachCard, tags: newCardTagList}
    return newCard;
}

const privateUpdateTagListOnDeck = (deckTagList: Record<string, string>, newTag: string[], oldTagTitle: string): Record<string, string> => {
    var tagsMinusEditedTag: Record<string, string> = {}
    for (let key in deckTagList) {
        if (key != oldTagTitle) {
            const currentValue: string = deckTagList[key]
            tagsMinusEditedTag[key] = currentValue
        }
    }
    tagsMinusEditedTag[newTag[0]] = newTag[1]
    return tagsMinusEditedTag
}

const privateCleanTagTitle = (input: string): string => {
    if (input) {
        return input.replace(/ /g,'').replace(/,/g, "").trim();
    }
    return ""
}

const characterSRSreducer = (state: FlashCardDeck = initialState, action: CharacterSRSaction): FlashCardDeck => {
    switch (action.type) {
        case CharacterSRSactionTypes.CREATESRSOBJECT:
            return action.payload.CharactersSRS
        case CharacterSRSactionTypes.ADDNEWTAG:
            return addNewTag(action.payload.Tags, action.payload.CharactersSRS)
        case CharacterSRSactionTypes.REMOVETAG:
            return removeTag(action.payload.Tags, action.payload.CharactersSRS)
        case CharacterSRSactionTypes.EDITSINGLETAG:
            return editSingleTag(action.payload.NewTag, action.payload.OldTagTitle, action.payload.CharactersSRS)
        case CharacterSRSactionTypes.EDITLISTITEM:
            return editListItem(action.payload.Content[0], action.payload.CharactersSRS)
        case CharacterSRSactionTypes.EDITLISTITEMINBULK:
            return editListItemsInBulk(action.payload.Content, action.payload.CharactersSRS)
        default:
            return state
    }
}
export default characterSRSreducer