import {FlashCard} from "../../interfaces/flashcard";
import {FlashCardDeck} from "../../interfaces/flashcarddeck";

export const getCardSimpleDisplayInfo = (cardNumber: number, currentState: FlashCardDeck): string => {
    const cardExists: boolean = cardExistInDeck(cardNumber, currentState)
    if (cardExists) {
        const card = getFlashCard(cardNumber, currentState)
        if (card.frontSide.length > 10) {
            return cardNumber.toString()+"_"+card.frontSide.slice(0,9)+"..."
        }else {
            return cardNumber.toString()+"_"+card.frontSide
        }
    }else {
        return cardNumber.toString()
    }
}

export const getTagFromDeck = (tagName: String, characterSRSstate: FlashCardDeck): String => {
    const record: Record<string, string> = characterSRSstate.tags
    const primitiveString: string = tagName.toString()
    const tagdata: String = record[primitiveString]
    if (tagdata && tagdata.length > 0) {
        return tagdata
    }
    return ""
}

export const cardExistInDeck = (cardNumber: number, currentState: FlashCardDeck): boolean => {
    const cardCandidates: FlashCard[]  = currentState.cards.filter(x=>{
        return (x.cardNumber === cardNumber)
    })
    if (cardCandidates.length > 0) {
        return true
    }else {
        return false
    }
}

export const getFlashCard = (cardNumber: number, currentState: FlashCardDeck): FlashCard => {
    const cardCandidates: FlashCard[] = currentState.cards.filter(x => {
        return (x.cardNumber === cardNumber)
    })
    if (cardCandidates.length > 0) {
        return cardCandidates[0]
    } else {
        const newCard: FlashCard = {
            cardNumber: 0,
            cardName: "",
            frontSide: "",
            backSide: "",
            primaryInfo: "",
            secondaryInfo: "",
            notableCards: [],
            dateOfLastReview: "",
            repetitionValue: 0,
            repetitionHistory: [],
            tags: []
        }
        return newCard
    }
}

export function mapkeys<K>(m: Map<K, any>): K[]
export function mapkeys(m: { [key: string]: any }): string[]
export function mapkeys (m: any): any {
    if (m instanceof Map) return Array.from(m.keys())
    return Object.keys(m)
}