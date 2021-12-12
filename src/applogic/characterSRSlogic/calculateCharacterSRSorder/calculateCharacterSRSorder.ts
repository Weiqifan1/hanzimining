import characterSRSlogic from "../../../interfaces/characterSRSlogic";
import {FlashCard} from "../../../interfaces/flashcard";
import {getReviewPriority} from "./calculateContentReviewPriority";

export const doCalculateNextCharacter = (input: characterSRSlogic): characterSRSlogic => {
    const fiveMostRecent: FlashCard[] = getMostRecentlyPracticed(input, 10)
    const reviewPrioritySorted: FlashCard[] = getReviewPriority(input.characterSRS.cards, fiveMostRecent)
    if (reviewPrioritySorted.length === 0){
        //there are no characters that can be shown
        const returnObject: characterSRSlogic = {
            currentContent: input.currentContent,
            mostRecentContentObjects: input.mostRecentContentObjects,
            characterSRS: input.characterSRS,
            notEnoughCharacters: true
        }
        return returnObject
    }else {
        const firstPriority: FlashCard = reviewPrioritySorted[0]
        const returnObject: characterSRSlogic = {
            currentContent: firstPriority,
            mostRecentContentObjects: input.mostRecentContentObjects,
            characterSRS: input.characterSRS,
            notEnoughCharacters: false
        }
        return returnObject
    }
}

const getMostRecentlyPracticed = (input: characterSRSlogic, maxLengthInteger: number): FlashCard[] => {
    const recentlyPracticed: FlashCard[] = input.mostRecentContentObjects
    let result: FlashCard[] = new Array()
    if (!recentlyPracticed) {
        result = []
    }else if (recentlyPracticed.length < maxLengthInteger) {
        result = recentlyPracticed
    }else {
        result = recentlyPracticed.slice(0,maxLengthInteger)
    }
    return result
}




