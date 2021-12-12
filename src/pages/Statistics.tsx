import IPage from "../interfaces/page";

import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State} from '../state/index';
import {FlashCard} from "../interfaces/flashcard";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import {editListItemInBulk} from "../state/action-creators/characterSRSactionCreator";

const Statistics : React.FunctionComponent<IPage> = props => {
    const dispatch = useDispatch();
    const {editListItemInBulk} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate: FlashCardDeck = useSelector(
        (state: State) => state.characterSRS
    )

    const countCardNumbers = (input: FlashCard[]): number[] => {
        var result: number[] = []
        const allNumbers: number[] = input.map(each => each.repetitionValue).sort()
        const largestNum: number = allNumbers.reverse()[0]+1
        for (let i = 0; i < largestNum; i++) {
            const allOfThese: number = allNumbers.filter(eachNum => eachNum===i).length
            result.push(allOfThese)
        }
        return result
    }

    const generateCountingDisplay = (input: FlashCard[]): string[] => {
        var result: string[] = []
        const countedNumbers: number[] = countCardNumbers(input)
        for (let i = 0; i < countedNumbers.length; i++) {
            const currentLine: string = 'reviewNumber: ' + i + ' count: ' + countedNumbers[i]
            result.push(currentLine)
        }
        return result
    }

    const reviewNumbersCount: string[] = generateCountingDisplay(characterSRSstate.cards)

    const addToAllKnownReviewNumbers = (oldReviewNumber: number, numberToAdd: number): number => {
        if (oldReviewNumber === 0) {
            return oldReviewNumber
        }else if (oldReviewNumber === 1) {
            return oldReviewNumber
        }else if (oldReviewNumber > 0){
            return oldReviewNumber+numberToAdd
        }else {
            return oldReviewNumber
        }
    }

    function reducePositiveReviewNumbersByOne() {
        const allFlashCards: FlashCard[] = characterSRSstate.cards
        const reduceByOne: FlashCard[] = allFlashCards.map(eachCard => {
            const eachRepetitionNumber: number = eachCard.repetitionValue
            const newRepetitionNumber: number = addToAllKnownReviewNumbers(eachRepetitionNumber, -1)
            var newCard: FlashCard = {...eachCard, repetitionValue: newRepetitionNumber}
            return newCard
        })
        editListItemInBulk(reduceByOne, characterSRSstate)
    }

    function increasePositiveReviewNumbersByOne() {
        const allFlashCards: FlashCard[] = characterSRSstate.cards
        const reduceByOne: FlashCard[] = allFlashCards.map(eachCard => {
            const eachRepetitionNumber: number = eachCard.repetitionValue
            const newRepetitionNumber: number = addToAllKnownReviewNumbers(eachRepetitionNumber, 1)
            var newCard: FlashCard = {...eachCard, repetitionValue: newRepetitionNumber}
            return newCard
        })
        editListItemInBulk(reduceByOne, characterSRSstate)
    }

    return <div>
        <h1> The Statistics page </h1>
        <button type="button" onClick={increasePositiveReviewNumbersByOne}>increaseByOne</button>
        <button type="button" onClick={reducePositiveReviewNumbersByOne}>reduceByOne</button>
        <ul>
            {reviewNumbersCount.map(each => {
                return <li>{each}</li>
            })}
        </ul>
        </div>
};

export default Statistics;