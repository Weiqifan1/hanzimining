import {FlashCardDeck} from "../../interfaces/flashcarddeck";
import {FlashCard} from "../../interfaces/flashcard";

function doGenerateCards(remainingRawText: string): string[][] {
    const maxUserSetFields = 8 //the user might set any of 8 fields
    var lookForNewLine = false
    var previousLineIsCurly = false
    var lineLimit: number = 8
    var lineIsCurly: boolean = false
    var currentStr: string = ""
    var currentCard: string[] = []
    var currentDeck: string[][] = []
    for (var i = 0; i < remainingRawText.length-1; i++) {
        if (currentDeck.length == 6) {
            const stophere = ""
        }
        const currentChar = remainingRawText.charAt(i)
        const nextChar = remainingRawText.charAt(i+1)
        if (i == remainingRawText.length-2) {
            currentStr = currentStr + currentChar + nextChar
            currentCard.push(currentStr)
            currentDeck.push(currentCard)
        }else if (currentCard.length == lineLimit) {
            currentDeck.push(currentCard)
            currentCard = []
            currentStr = ''
            lineIsCurly = false
            lineLimit = 8
        }
        if (lineIsCurly == false && currentChar == '\n' && previousLineIsCurly) {
            currentStr = ""
            previousLineIsCurly = false
        }else if (lineIsCurly == false && currentChar == '\n' && nextChar == '\n') {
            lookForNewLine = true
            currentCard.push(currentStr)
            currentDeck.push(currentCard)
            currentCard = []
            currentStr = ""
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

function generateCards(rawText: string): FlashCard[] {
    const result: string[][] = doGenerateCards(rawText)
    const cards: FlashCard = {
        cardNumber: 0,
        cardName: "",
        frontSide: "string",
        backSide: "string",
        primaryInfo: "string",
        secondaryInfo: "string",
        notableCards: [],
        dateOfLastReview: "string",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: []
    }
    return [cards];
}

export function generateAllLinesDeck(rawText: string, deckName: string, deckInfo: string): FlashCardDeck {
    //write a function that generate a deck based on tawText, deck name and deck info
    const cards: FlashCard[] = generateCards(rawText)
    const splitByRegex = rawText.split(/(?=[\{\}])/g)  //"1、2、3".split(/(?=、)/g)
    const newFlash: FlashCardDeck = {
        deckName: "deckName",
        deckInfo: "deckInfo",
        settings: {},
        tags: {},
        cards: []
    }
    return newFlash
}
