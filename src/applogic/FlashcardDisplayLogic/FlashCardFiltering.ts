import {FlashCard} from "../../interfaces/flashcard";
import {isSortingValue} from "../../interfaces/types/sortingValue";
import {FlashCardDeck} from "../../interfaces/flashcarddeck";

export const getSettings_filtercardsbytag_numbers = (currentState: FlashCardDeck): Set<number> => {
    const cards: FlashCard[] = filterByTags(currentState.cards, dogetSettings_filtercardsbytag(currentState))
    const cardnumbers: Set<number> = new Set(cards.map(each => each.cardNumber))
    return cardnumbers
}

export const getSettings_filtercardsbytag = (currentState: FlashCardDeck): FlashCard[] => {
    return filterByTags(currentState.cards, dogetSettings_filtercardsbytag(currentState))
}

export const dogetSettings_filtercardsbytag = (currentState: FlashCardDeck): Record<string, string> => {
    const subcategoryname: string = "filtercardsbytag"
    const settings:  Record<string, Record<string, string>> = currentState.settings
    var subcategory: Record<string, string> = {}
    if (settings[subcategoryname]) {
        subcategory = settings[subcategoryname]
    }
    return subcategory
}

export function filterByTags(inp: FlashCard[], localTagsFilter: Record<string, string>): FlashCard[] {
    const cardsToUse: number[] = calculateFilter(inp, localTagsFilter)
    const filteredCards: FlashCard[] = inp.filter(eachCard => cardsToUse.includes(eachCard.cardNumber))
    return filteredCards;
}

export const calculateFilter = (inp: FlashCard[], localTagsFilter: Record<string, string>):　number[] => {
    var cardsToUse: number[] = []
    const allNumbersFromRecord: number[] = Object.keys(localTagsFilter).map(Number).sort()
    var stringsToHandle: string[] = []
    for (var num in allNumbersFromRecord) {
        const str: string = localTagsFilter[allNumbersFromRecord[num].toString()]
        stringsToHandle.push(str)
    }

    var updatedCardsLists: [FlashCard[], FlashCard[]] = [[], inp]
    for (var str in stringsToHandle) {
        const eachstr: string = stringsToHandle[str]
        updatedCardsLists = handleFilterString(eachstr, updatedCardsLists[0], updatedCardsLists[1])
    }

    //merge certain and uncertain
    const secureCardNum: number[] = updatedCardsLists[0].map(eachCard => eachCard.cardNumber)
    const uncertainNum: number[] = updatedCardsLists[1].map(eachCard => eachCard.cardNumber)
    cardsToUse.push(...secureCardNum)
    cardsToUse.push(...uncertainNum)
    var resultSet = new Set(cardsToUse)
    var result: number[] = Array.from(resultSet.values()).sort();
    return result
}

function handleFilterString(eachstr: string, secureCardList: FlashCard[], uncertainCardList: FlashCard[]): [FlashCard[], FlashCard[]] {
    var newSecure: FlashCard[] = secureCardList
    var newUncertain: FlashCard[] = []
    const tagAndType: string[] = eachstr.split(" ")
    const tag: string = tagAndType[0]
    const filterLogic: string = tagAndType[1]

    if (isSortingValue(filterLogic) && filterLogic == "INCLUDE") {
        const cardsWithRelevantTag: FlashCard[] = uncertainCardList.filter(eachCard => hasTag(tag, eachCard))
        newSecure.push(...cardsWithRelevantTag)
        newUncertain = uncertainCardList.filter(eachCard => !hasTag(tag, eachCard))
    }else if (isSortingValue(filterLogic) && filterLogic == "EXCLUDE") {
        newUncertain = uncertainCardList.filter(eachCard => !hasTag(tag, eachCard))
    }else if (isSortingValue(filterLogic) && filterLogic == "ONLY") {
        newUncertain = uncertainCardList.filter(eachCard => hasTag(tag, eachCard))
    }else {
        newUncertain = uncertainCardList
    }
    return [newSecure, newUncertain];
}

const hasTag = (tag: string, flashCard: FlashCard): boolean => {
    try {
        if (flashCard && flashCard.tags && flashCard.tags?.includes(tag)) {
            return true
        }else {
            return false
        }
    }catch (e) {
        return false
    }
}