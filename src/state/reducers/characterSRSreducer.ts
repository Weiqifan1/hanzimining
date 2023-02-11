import {CharacterSRSaction} from "../actions/characterSRSactions";
import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {FlashCard} from "../../interfaces/flashcard";
import {FlashCardDeck} from "../../interfaces/flashcarddeck"

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

export const addNewCardToDeck = (newCards: FlashCard[], characterSRSObject: FlashCardDeck): FlashCardDeck => {
    const characterList: FlashCard[] = characterSRSObject.cards
    const redoneArray: FlashCard[] = insertCardsInDeck(newCards, characterList)
    const result: FlashCardDeck = {
        ...characterSRSObject,
        deckName: characterSRSObject.deckName,
        cards: redoneArray
    }
    return result
}

function insertCardsInDeck(newCards: FlashCard[], characterList: FlashCard[]): FlashCard[] {
    const sortedNewCards = newCards.sort((c1, c2) => c1.cardNumber - c2.cardNumber)
    const res: FlashCard[] = doInsertCardsInDeck(sortedNewCards, characterList)
    return res
}

function doInsertCardsInDeck(remainingCards: FlashCard[], characterList: FlashCard[]): FlashCard[] {
    if (remainingCards.length == 0) {
        return characterList
    }else {
        const [head, ...tail] = remainingCards;
        const updatedCharacterList = addSingleCardToList(head, characterList)
        const sortedCards = updatedCharacterList.sort((c1, c2) => c1.cardNumber - c2.cardNumber)
        return doInsertCardsInDeck(tail, sortedCards)
    }
}

function addSingleCardToList(flashCard: FlashCard, characterList: FlashCard[]): FlashCard[] {
    const result: FlashCard[] = doAddSingleCardToList(flashCard, flashCard.cardNumber, [], characterList)
    return result;
}

function doAddSingleCardToList(flashCard: FlashCard, cardNumber: number, updatedList: FlashCard[], characterList: FlashCard[]): FlashCard[] {
    if (characterList.length == 0 && updatedList.length == 0) {
        return [flashCard]
    } else if (characterList.length == 0) {
        const lastNewElem: FlashCard = updatedList[updatedList.length - 1]
        if (lastNewElem.cardNumber < cardNumber) {
            const savedCard = updateNotableCards(flashCard, cardNumber)
            updatedList.push(savedCard)
            return updatedList
        } else {
            return updatedList
        }
    } else if(characterList[0].cardNumber > cardNumber) {
        //increment the cardnumber
        const [head, ...tail] = characterList;
        //newCard: FlashCard = {...eachCard, repetitionValue: newRepetitionNumber}
        const newFlashcard: FlashCard = {...head, cardNumber: head.cardNumber + 1}
        const savedCard = updateNotableCards(newFlashcard, cardNumber)
        updatedList.push(savedCard)
        return doAddSingleCardToList(flashCard, cardNumber, updatedList, tail)
    } else if (characterList[0].cardNumber == cardNumber) {
        const savedCard = updateNotableCards(flashCard, cardNumber)
        updatedList.push(savedCard)
        const [head, ...tail] = characterList;
        const newFlashcard: FlashCard = {...head, cardNumber: head.cardNumber + 1}
        const savedCard2 = updateNotableCards(newFlashcard, cardNumber)
        updatedList.push(savedCard2)
        return doAddSingleCardToList(flashCard, cardNumber, updatedList, tail)
    } else {
        const [head, ...tail] = characterList;
        const savedCard = updateNotableCards(head, cardNumber)
        updatedList.push(savedCard)
        return doAddSingleCardToList(flashCard, cardNumber, updatedList, tail)
    }
}

function updateNotableCards(newFlashcard: FlashCard, cardNumber: number): FlashCard {
    const notableCards: number[] = newFlashcard.notableCards
    const result: FlashCard = doUpdateNotableCard(newFlashcard, cardNumber, [], notableCards)
    return result
}

function doUpdateNotableCard(newFlashcard: FlashCard, cardNumber: number, updatedNotableCards: number[], notableCards: number[]): FlashCard {
    if (notableCards.length == 0) {
        const updatedCard: FlashCard = {...newFlashcard, notableCards: updatedNotableCards}
        return updatedCard
    } else {
        const [head, ...tail] = notableCards;
        if (head < cardNumber) {
            updatedNotableCards.push(head)
            return doUpdateNotableCard(newFlashcard, cardNumber, updatedNotableCards, tail)
        } else {
            updatedNotableCards.push(head + 1)
            return doUpdateNotableCard(newFlashcard, cardNumber, updatedNotableCards, tail)
        }
    }
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
        var oldTitleInList: boolean = false
        for (let eachTagIndex in eachCard.tags) {
            if (eachCard.tags[eachTagIndex] === oldTagTitle) {
                oldTitleInList = true
            }
        }
        if (oldTitleInList) {
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
        case CharacterSRSactionTypes.ADDNEWCARDSTODECK:
            return addNewCardToDeck(action.payload.Content, action.payload.CharactersSRS)
        default:
            return state
    }
}
export default characterSRSreducer