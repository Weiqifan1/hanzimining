import characterSRSlogic from "../../interfaces/characterSRSlogic";
import {Content} from "../../state/state-types/charactersrstypes";
import {getReviewPriority} from "./calculateContentReviewPriority";


export const calculateNextCharacter = (input: characterSRSlogic): characterSRSlogic => {
    const fiveMostRecent: Content[] = getMostRecentlyPracticed(input, 5)
    const reviewPrioritySorted: Content[] = getReviewPriority(input.characterSRS.content, fiveMostRecent)
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
        const updatedMostRecentlyPracticed: Content[] = addCurrentContentToPreviousContentList(input)
        const firstPriority: Content = reviewPrioritySorted[0]
        const returnObject: characterSRSlogic = {
            currentContent: firstPriority,
            mostRecentContentObjects: input.mostRecentContentObjects,
            characterSRS: input.characterSRS,
            notEnoughCharacters: false
        }
        return returnObject
    }
}


const getMostRecentlyPracticed = (input: characterSRSlogic, maxLengthInteger: number): Content[] => {
    const recentlyPracticed: Content[] = input.mostRecentContentObjects
    let result: Content[] = new Array()
    if (!recentlyPracticed) {
        result = []
    }else if (recentlyPracticed.length < maxLengthInteger) {
        result = recentlyPracticed
    }else {
        result = recentlyPracticed.slice(0,maxLengthInteger)
    }
    return result
}


const addCurrentContentToPreviousContentList = (input: characterSRSlogic): Content[] => {
    if (input.currentContent){
        const listToBeUpdated: Content[] = input.mostRecentContentObjects
        listToBeUpdated.unshift(input.currentContent)
        return listToBeUpdated
    }else {
        return input.mostRecentContentObjects
    }
}



