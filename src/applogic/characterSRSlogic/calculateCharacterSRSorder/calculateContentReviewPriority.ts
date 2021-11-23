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
            splitIntoRandomSorted(eachByDate).flat(1)
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
function shuffle(array: number[], seed: number): number[] {                // <-- ADDED ARGUMENT
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(random(seed) * m--);        // <-- MODIFIED LINE

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        ++seed                                     // <-- ADDED LINE
    }

    return array;
}

function random(seed: number): number {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function shuffleRANDOM(array: number[]): number[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
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






