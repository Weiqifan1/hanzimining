import {Content} from "../../state/state-types/charactersrstypes";

//characters added to deck (reviewNumber > 0) and not forbidden, sorted by review priority
export const getReviewPriority = (allContentItems: Content[], forbiddenCharacters: Content[]): Content[] => {
    const forbiddenCharacterNumbers: number[] = forbiddenCharacters.map(eachContent => eachContent.number)
    const contentAddedToDeck: Content[] = allContentItems.filter(eachContent => eachContent.reviewValue > 0)
    const nonProhibited: Content[] = contentAddedToDeck.filter(eachContent => {
        return (forbiddenCharacterNumbers.indexOf(eachContent.number) > -1)
    })
    const nonProhibitedSorted: Content[] = calculateReviewPriority(nonProhibited)
    return nonProhibitedSorted
}

const calculateReviewPriority = (input: Content[]): Content[] => {
    const sortContent: Content[] = splitIntoReviewNumbers(input).map(eachByReview =>
        splitIntoDateStrings(eachByReview).map(eachByDate =>
            splitIntoCharacterNumbers(eachByDate).flat(1)
        ).flat(1)
    ).flat(1)
    return sortContent
}

const splitIntoReviewNumbers = (contentThatCanBePracticed: Content[]): Content[][] => {
    const allReviewNumbers: number[] = Array.from(new Set(contentThatCanBePracticed.map((item=> item.reviewValue)))).sort()
    const resultArray: Content[][] = allReviewNumbers.map(eachNumber => {
        return contentThatCanBePracticed.filter(item => item.reviewValue === eachNumber)
    })
    return resultArray;
}

const splitIntoDateStrings = (contentThatCanBePracticed: Content[]): Content[][] => {
    const allLastPracticedDatesString: string[] = Array.from(new Set(contentThatCanBePracticed.map((item=> item.dateOfLastReview))))
    const allLastPracticedDatesCorrectString: string[] = allLastPracticedDatesString.filter(eachDate => isCorrectDateString(eachDate))
    const allLastPracticedDatesSorted: Date[] = allLastPracticedDatesCorrectString.map(item => new Date(item)).sort()
    const backToString: string[] = allLastPracticedDatesSorted.map(eachDate => eachDate.toISOString().substr(0,10))
    const resultArray: Content[][] = backToString.map(eachDateString => {
        return contentThatCanBePracticed.filter(item => item.dateOfLastReview === eachDateString)
    })
    return resultArray;
}

const splitIntoCharacterNumbers = (contentThatCanBePracticed: Content[]): Content[][] => {
    const allCharacterNumbers: number[] = Array.from(new Set(contentThatCanBePracticed.map((item=> item.number)))).sort()
    const resultArray: Content[][] = allCharacterNumbers.map(eachNumber => {
        return contentThatCanBePracticed.filter(item => item.number === eachNumber)
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






