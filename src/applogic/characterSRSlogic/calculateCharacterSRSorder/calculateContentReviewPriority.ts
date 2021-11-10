import {FlashCard} from "../../../state/state-types/charactersrstypes";

//characters added to deck (reviewNumber > 0) and not forbidden, sorted by review priority
export const getReviewPriority = (allContentItems: FlashCard[], forbiddenCharacters: FlashCard[]): FlashCard[] => {
    const forbiddenCharacterNumbers: number[] = forbiddenCharacters.map(eachContent => eachContent.cardNumber)
    const contentThatCanBepracticed: FlashCard[] = allContentItems.filter(eachContent => eachContent.repetitionValue > 0)
    const nonProhibited: FlashCard[] = contentThatCanBepracticed.filter(eachContent => {
        return (forbiddenCharacterNumbers && forbiddenCharacterNumbers.indexOf(eachContent.cardNumber) === -1)
    })
    const nonProhibitedSorted: FlashCard[] = calculateReviewPriority(nonProhibited)
    return nonProhibitedSorted
}

const calculateReviewPriority = (input: FlashCard[]): FlashCard[] => {
    const sortContent: FlashCard[] = splitIntoReviewNumbers(input).map(eachByReview =>
        splitIntoDateStrings(eachByReview).map(eachByDate =>
            splitIntoCharacterNumbers(eachByDate).flat(1)
        ).flat(1)
    ).flat(1)
    return sortContent
}

const splitIntoReviewNumbers = (contentThatCanBePracticed: FlashCard[]): FlashCard[][] => {
    const allReviewNumbers: number[] = Array.from(new Set(contentThatCanBePracticed.map((item=> item.repetitionValue)))).sort()
    const resultArray: FlashCard[][] = allReviewNumbers.map(eachNumber => {
        return contentThatCanBePracticed.filter(item => item.repetitionValue === eachNumber)
    })
    return resultArray;
}

const splitIntoDateStrings = (contentThatCanBePracticed: FlashCard[]): FlashCard[][] => {
    const allLastPracticedDatesString: string[] = Array.from(new Set(contentThatCanBePracticed.map((item=> item.dateOfLastReview))))
    const allLastPracticedDatesCorrectString: string[] = allLastPracticedDatesString.filter(eachDate => isCorrectDateString(eachDate))
    const allLastPracticedDatesSorted: Date[] = allLastPracticedDatesCorrectString.map(item => new Date(item)).sort()
    const backToString: string[] = allLastPracticedDatesSorted.map(eachDate => eachDate.toISOString().substr(0,10))
    const resultArray: FlashCard[][] = backToString.map(eachDateString => {
        return contentThatCanBePracticed.filter(item => item.dateOfLastReview === eachDateString)
    })
    return resultArray;
}

const splitIntoCharacterNumbers = (contentThatCanBePracticed: FlashCard[]): FlashCard[][] => {
    const allCharacterNumbers: number[] = Array.from(new Set(contentThatCanBePracticed.map((item=> item.cardNumber)))).sort()
    const resultArray: FlashCard[][] = allCharacterNumbers.map(eachNumber => {
        return contentThatCanBePracticed.filter(item => item.cardNumber === eachNumber)
    })
    return resultArray;
}

//dateString format: yyyy-mm-dd
const isCorrectDateString = (dateString: string): boolean => {
    if (!dateString) {return false}
    if (!(dateString.length === 10)) {return false}
    if (!(dateString.substr(4,1) === "-")) {return false}
    if (!(dateString.substr(7,1) === "-")) {return false}
    if (!Number(dateString.substr(0,4))) {return false}
    if (!Number(dateString.substr(5,2))) {return false}
    if (!Number(dateString.substr(8,2))) {return false}
    return true
}





