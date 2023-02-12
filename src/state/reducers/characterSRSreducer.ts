import {CharacterSRSaction} from "../actions/characterSRSactions";
import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {FlashCard} from "../../interfaces/flashcard";
import {FlashCardDeck} from "../../interfaces/flashcarddeck"
import {addNewCardsToDeck} from "../action-creators/characterSRSactionCreator";

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

const createDeck = (newContentInBulk: FlashCard[], characterSRSObject: FlashCardDeck): FlashCardDeck => {
    const result: FlashCardDeck = {
        ...characterSRSObject,
        cards: newContentInBulk
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
    const sortedCharacterList = characterList.sort((c1, c2) => c1.cardNumber - c2.cardNumber)
    const res: FlashCard[] = doInsertCardsInDeck(sortedNewCards, sortedCharacterList)
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
    const largestCardNumber: number = characterList.map(each => each.cardNumber).sort()[characterList.length-1]
    const updatedFlashCard: FlashCard = adjustCardNumber(flashCard, largestCardNumber)
    const result: FlashCard[] = doAddSingleCardToList(updatedFlashCard, updatedFlashCard.cardNumber, [], characterList)
    return result;
}

function adjustCardNumber(flashCard: FlashCard, largestCardNumber: number): FlashCard {
    const cardnumber = flashCard.cardNumber
    if (cardnumber < 1 || cardnumber > largestCardNumber) {
        const newCard: FlashCard = {...flashCard, cardNumber: largestCardNumber + 1}
        return newCard
    } else {
        return flashCard
    }
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

export function deleteOrEditCardOrder(CharsToBeDeleted: string, OrderToBeChanged: string, CharactersSRS: FlashCardDeck): FlashCardDeck {
    const charsToBeDeletedRange: number[] = validateCharsToBeDeleted(CharsToBeDeleted)
    const orderToBeChangedTuple: [number, number] = validateOrderToBeChanged(OrderToBeChanged)
    if (OrderToBeChanged == "" && charsToBeDeletedRange.length > 0) {
        const resDelete = deleteCards(charsToBeDeletedRange, CharactersSRS)
        return resDelete
    }else if (CharsToBeDeleted == "" && !isNaN(orderToBeChangedTuple[0]) && !isNaN(orderToBeChangedTuple[1])) {
        const resEdit: FlashCardDeck = editCardOrder(orderToBeChangedTuple, CharactersSRS)
        return resEdit
    }else {
        return CharactersSRS
    }
}

function deleteCards(input: number[], CharactersSRS: FlashCardDeck): FlashCardDeck {
    if (input == null || input.length == 0) {
        return CharactersSRS
    }
    const allNums: number[] = CharactersSRS.cards.map(each => each.cardNumber)
    if (allNums.length == 0) {
        return CharactersSRS
    }
    const numsToSetToNums: number[] = Array.from(new Set(allNums)).sort()
    const firstnum: number = numsToSetToNums[0]
    const lastnum: number = numsToSetToNums[numsToSetToNums.length-1]
    if (firstnum != 1 || lastnum != numsToSetToNums.length || numsToSetToNums.length != allNums.length) {
        return CharactersSRS
    }

    const validInput: number[] = input.filter(each => allNums.indexOf(each) > -1)
    if (validInput.length == 0) {
        return CharactersSRS
    }

    const cardsWithoutDeleted: FlashCard[] = CharactersSRS.cards.filter(each => validInput.indexOf(each.cardNumber) == -1)

    const newNums: number[] = cardsWithoutDeleted.map(each => each.cardNumber)
    const newRange: number[] = Array.from(Array(newNums.length).keys()).map(each => each + 1)
    const oldToNew: [number, number][] = newRange.map(each => [newNums[each-1],each])

    var updatedCards: FlashCard[] = updateCardListAfterDeleted(oldToNew, cardsWithoutDeleted)
    const updatedDeck: FlashCardDeck = {...CharactersSRS, cards: updatedCards}
    return updatedDeck;
}

function updateCardListAfterDeleted(oldToNew: [number, number][], cardsWithoutDeleted: FlashCard[]) {
    var newCardList: FlashCard[] = []
    const oldCardNums: number[] = cardsWithoutDeleted.map(each => each.cardNumber)
    for (const [key, value] of Object.entries(cardsWithoutDeleted)) {
        const oldCard: FlashCard = value
        const updatedOld_notableCards: FlashCard = {...oldCard, notableCards: replaceNotable(oldToNew, oldCard.notableCards)}
        const newNumberOnCard: number[] = oldToNew.filter(each => each[0] == updatedOld_notableCards.cardNumber).map(e => e[1])
        if (newNumberOnCard.length == 0) {
            newCardList.push(updatedOld_notableCards)
        }else {
            const newNum: number = newNumberOnCard[0]
            const updatedCard: FlashCard = {...updatedOld_notableCards, cardNumber: newNum}
            newCardList.push(updatedCard)
        }
    }
    return newCardList;
}

function replaceNotable(oldToNew: [number, number][], notableCards: number[]): number[] {
    const newCards: number[] = oldToNew.filter(each => notableCards.indexOf(each[0]) > -1).map(e => e[1])
    return newCards
}

function editCardOrder(input: [number, number], CharactersSRS: FlashCardDeck): FlashCardDeck {
    const cardToDelete: FlashCard = CharactersSRS.cards[input[0]-1]
    var newCardNumber: number = 0
    var cardNumToDelete: number = 0
    if (input[1] > input[0]) {
        newCardNumber = input[1] + 1
        cardNumToDelete = input[0]
    }else {
        newCardNumber = input[1]
        cardNumToDelete = input[0] + 1
    }
    const updatedCardToDelete: FlashCard = {...cardToDelete, cardNumber: newCardNumber}
    const rawaddedCards: FlashCard[] = insertCardsInDeck([updatedCardToDelete], CharactersSRS.cards)
    const addedCardsWithUpdatedNotable: FlashCard[] = rawaddedCards.map(each => updatedNotableCards(cardNumToDelete, newCardNumber, each))
    const rawaddedDeck: FlashCardDeck = {...CharactersSRS, cards: addedCardsWithUpdatedNotable}

    const deckWithMovedCardDeleted: FlashCardDeck = deleteCards([cardNumToDelete], rawaddedDeck)
    return deckWithMovedCardDeleted
}

function updatedNotableCards(cardNumToDelete: number, newCardNumber: number, rawaddedCards: FlashCard) {
    var newCards: number[] = []
    const oldCards: number[] = rawaddedCards.notableCards
    for (let i = 0; i < oldCards.length; i++) {
        newCards.push(oldCards[i])
        if (oldCards[i] == cardNumToDelete) {
            newCards.push(newCardNumber)
        }
    }
    const result: FlashCard = {...rawaddedCards, notableCards: newCards.sort()}
    return result;
}

function validateCharsToBeDeleted(CharsToBeDeleted: string): number[] {
    if (CharsToBeDeleted == null || CharsToBeDeleted == "") {
        return []
    }
    if (!isNaN(+CharsToBeDeleted)) {
        return [+CharsToBeDeleted]
    }
    const splitBySpace: string[] = CharsToBeDeleted.split("-")
    if (splitBySpace.length != 2 || isNaN(+splitBySpace[0]) || isNaN(+splitBySpace[1])) {
        return []
    }
    const num1: number = +splitBySpace[0]
    const num2: number = +splitBySpace[1]
    if (!Number.isInteger(num1) || !Number.isInteger(num2)) {
        return []
    }
    if (num1 > num2) {
        return []
    }else if (num1 == num2) {
        return [num1]
    }else {
        const res: number[] = Array.from({length: ((num2+1) - num1)}, (v, k) => k + num1);
        return res
    }
    return []
}

function validateOrderToBeChanged(OrderToBeChanged: string): [number, number] {
    if (OrderToBeChanged == null || OrderToBeChanged == "") {
        return [0, 0]
    }
    const splitBySpace: string[] = OrderToBeChanged.split(",")
    if (splitBySpace.length != 2 || isNaN(+splitBySpace[0]) || isNaN(+splitBySpace[1])) {
        return [0,0]
    }
    const num1: number = +splitBySpace[0]
    const num2: number = +splitBySpace[1]
    if (!Number.isInteger(num1) || !Number.isInteger(num2)) {
        return [0,0]
    }
    if (num1 > num2) {
        return [num1, num2]
    }else if (num1 == num2) {
        return [0,0]
    }else {
        return [num1, num2]
    }
    return [0,0]
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
        case CharacterSRSactionTypes.CREATENEWDECK:
            return createDeck(action.payload.Content, action.payload.CharactersSRS)
        case CharacterSRSactionTypes.DELETEOREDITCARDORDER:
            return deleteOrEditCardOrder(action.payload.CharsToBeDeleted, action.payload.OrderToBeChanged, action.payload.CharactersSRS)
        default:
            return state
    }
}
export default characterSRSreducer