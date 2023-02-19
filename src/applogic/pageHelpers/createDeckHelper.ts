import {FlashCardDeck} from "../../interfaces/flashcarddeck";
import {FlashCard} from "../../interfaces/flashcard";

function doGenerateCards(remainingRawText: string): string[][] {
    const maxUserSetFields = 7 //the user might set any of 8 fields
    var lookForNewLine = false
    var previousLineIsCurly = false
    var lineLimit: number = maxUserSetFields
    var lineIsCurly: boolean = false
    var currentStr: string = ""
    var currentCard: string[] = []
    var currentDeck: string[][] = []
    for (var i = 0; i < remainingRawText.length-1; i++) {
        if (currentDeck.length == 3 && currentCard.length == 0) {
            const stophere = ""
        }
        const currentChar = remainingRawText.charAt(i)
        const nextChar = remainingRawText.charAt(i+1)
        if (i == remainingRawText.length-2) {
            currentStr = currentStr + currentChar + nextChar
            currentCard.push(currentStr)
            currentDeck.push(currentCard)
            lookForNewLine = true
        }else if (currentCard.length == lineLimit) {
            currentDeck.push(currentCard)
            lookForNewLine = true
            currentCard = []
            currentStr = ''
            lineIsCurly = false
            //lineLimit = 8
        }
        if (lineIsCurly == false && currentChar == '\n' && previousLineIsCurly) {
            currentStr = ""
            previousLineIsCurly = false
        }else if (lineIsCurly == false && currentChar == '\n' && nextChar == '\n' && !(currentStr == "")) {
            lookForNewLine = true
            currentCard.push(currentStr)
            currentDeck.push(currentCard)
            currentCard = []
            currentStr = ""
        }else if (lineIsCurly == false && currentChar == '\n' && nextChar == '\n') {
            lookForNewLine = true
        }else if (lineIsCurly == false && !lookForNewLine && currentChar == '\n' && currentCard.length == lineLimit) {
            currentDeck.push(currentCard)
            currentCard = []
            lookForNewLine = true
        }else if (lineIsCurly == false && !lookForNewLine && currentChar == '\n' ) {
            currentCard.push(currentStr)
            currentStr = ""
            previousLineIsCurly = false
        }else if (currentStr.length == 0 && currentChar == '{') {
            lineIsCurly = true
            lookForNewLine = false
            //lineLimit = lineLimit + 1
        }else if (lineIsCurly == true && !lookForNewLine && currentChar == '}') {
            currentCard.push(currentStr)
            currentStr = ""
            lineIsCurly = false
            previousLineIsCurly = true
        }else if (!lookForNewLine) {
            currentStr = currentStr + currentChar
        }else {
            currentStr = currentStr
            lookForNewLine = false
        }
    }
    return currentDeck
}

function stringToListSplitBySpace(input: string): string[] {
    const result: string[] = input.trim().split(/\s+/)
    return result;
}

function stringToNumbersSplitBySpace(input: string, numberOfCards: number[]): number[] {
    const firstresult: string[] = stringToListSplitBySpace(input)
    const numbers: number[] = firstresult.filter(each => !isNaN(Number(each))).map(e => Number(e)).filter(ea => numberOfCards.includes(ea))
    return numbers;
}

function arrayToCard(each: string[], numberOfCards: number) {
    const numberRange: number[] = Array.from(Array(numberOfCards).keys()).map(x => x + 1)
    const cardName: string = each.length > 0 ? each[0] : ""
    const frontSide: string = each.length > 1 ? each[1] : ""
    const backSide: string = each.length > 2 ? each[2] : ""
    const primaryInfo: string = each.length > 3 ? each[3] : ""
    const secondaryInfo: string = each.length > 4 ? each[4] : ""
    const notable: number[] = each.length > 5 ? stringToNumbersSplitBySpace(each[5], numberRange) : []
    const tags: string[] = each.length > 6 ? stringToListSplitBySpace(each[6]) : []

    const cards: FlashCard = {
        cardNumber: 0,
        cardName: cardName.trim(),
        frontSide: frontSide.trim(),
        backSide: backSide.trim(),
        primaryInfo: primaryInfo.trim(),
        secondaryInfo: secondaryInfo.trim(),
        notableCards: notable,
        dateOfLastReview: "0001-01-01",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: tags
    }
    return cards
}

function generateCards(rawText: string): FlashCard[] {
    const result: string[][] = doGenerateCards(rawText)
    const cardList: FlashCard[] = result.map(each => arrayToCard(each, result.length))
    return cardList
}

export function generateAllLinesDeck(rawText: string, deckName: string, deckInfo: string): FlashCardDeck {
    //write a function that generate a deck based on tawText, deck name and deck info
    const cards: FlashCard[] = generateCards(rawText)
    var newtags: string[] = []
    for (var numbercard in cards) {
        const tagsfromcards: string[] = cards[numbercard].tags
        newtags = newtags.concat(tagsfromcards)
        //newtags. newtags.concat(cards[numbercard].tags)
    }
    //const tagNames = cards.map(each => newtags.concat(each.tags))//Array.from(new Set(cards.map(each => each.tags)))
    const tags: Record<string, string> = {}
    for (var name in newtags) {
        const restag: string = newtags[name]
        tags[restag] = restag
    }
    var updatedWithNums: FlashCard[] = []
    for (var i = 0; i < cards.length; i++) {
        const examp: FlashCard = cards[i]
        const updatedCard: FlashCard = {...examp, cardNumber: i+1}
        updatedWithNums.push(updatedCard)
    }
    const newFlash: FlashCardDeck = {
        deckName: deckName.trim(),
        deckInfo: deckInfo.trim(),
        settings: {},
        tags: tags,
        cards: updatedWithNums
    }
    return newFlash
}
