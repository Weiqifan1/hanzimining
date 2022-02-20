import {FlashCard} from "../../../interfaces/flashcard";

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
    const sortContent: FlashCard[] = splitIntoReviewNumbers(input)
        .map(eachByReview =>
            splitIntoHistoryValues(eachByReview)
                .map(eachByHistory =>
                    splitIntoDateStrings(eachByHistory)
                        .map(eachByDate =>
                            splitIntoRandomSorted(eachByDate).flat(1)
                        ).flat(1)
                ).flat(1)
        ).flat(1)
    return sortContent
}

const splitIntoReviewNumbers = (contentThatCanBePracticed: FlashCard[]): FlashCard[][] => {
    var allReviewNumbers: number[] = Array.from(
        new Set(contentThatCanBePracticed.map((item=> item.repetitionValue))))
    var sortedReviewNumbers: number[] = allReviewNumbers.sort((n1,n2) => n1 - n2);
    var resultArray: FlashCard[][] = sortedReviewNumbers.map(eachNumber => {
        return contentThatCanBePracticed.filter(item => item.repetitionValue === eachNumber)
    })
    return resultArray;
}

const splitIntoHistoryValues = (contentThatCanBePracticed: FlashCard[]): FlashCard[][] => {
    var allHistorySums: number[] = Array.from(new Set(contentThatCanBePracticed.map((item => getSumOfHistory(item)))))
    var sortedHustorySums: number[] = allHistorySums.sort((n1,n2) => n1 - n2);
    var resultArray: FlashCard[][] = sortedHustorySums.map(eachNumber => {
        return contentThatCanBePracticed.filter(item => getSumOfHistory(item) === eachNumber)
    })
    return resultArray;
}

function getSumOfHistory(item: FlashCard): number {
    const history: number[] = item.repetitionHistory
    if (history === null ||
        history === undefined ||
        history.length == 0) {
        return 0
    }else {
        try {
            const result: number = history.reduce((sum,current) => sum + current, 0)
            return result
        }catch (e) {
            return 0
        }
    }
}

const splitIntoDateStrings = (contentThatCanBePracticed: FlashCard[]): FlashCard[][] => {
    const allLastPracticedDatesString: string[] = Array.from(new Set(contentThatCanBePracticed.map((item=> item.dateOfLastReview))))
    const allLastPracticedDatesCorrectString: string[] = allLastPracticedDatesString.filter(eachDate => isCorrectDateString(eachDate))
    const allLastPracticedDatesSorted: Date[] = allLastPracticedDatesCorrectString.sort().map(item => new Date(item))
    const backToString: string[] = allLastPracticedDatesSorted.map(eachDate => eachDate.toISOString().substr(0,10))
    const resultArray: FlashCard[][] = backToString.map(eachDateString => {
        return contentThatCanBePracticed.filter(item => item.dateOfLastReview === eachDateString)
    })
    return resultArray;
}

const splitIntoRandomSorted = (contentThatCanBePracticed: FlashCard[]): FlashCard[][] => {
    const seed: number = getSeedFromFlashCards(contentThatCanBePracticed)
    const charNumbers: number[] = Array.from(new Set(contentThatCanBePracticed.map((item=> item.cardNumber))))//.sort()
    const randomSortedNumbers = shuffle(charNumbers, seed)
    const resultArray: FlashCard[][] = randomSortedNumbers.map(eachNumber => {
        return contentThatCanBePracticed.filter(item => item.cardNumber === eachNumber)
    })
    return resultArray;
}

function getSeedFromFlashCards(contentThatCanBePracticed: FlashCard[]): number {
    const sumOfReviewNumbers: number = contentThatCanBePracticed.map(item => item.repetitionValue).reduce(function (a, b) {
        return a + b;
    }, 0);
    return sumOfReviewNumbers;
}

//Fisher-Yates
//https://stackoverflow.com/questions/16801687/javascript-random-ordering-with-seed
function shuffle(array: number[], seed: number): number[] {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(random(seed) * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        ++seed
    }
    return array;
}

function random(seed: number): number {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
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






