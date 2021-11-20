
import React, {MouseEventHandler, ReactElement, useState} from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import Todos from "../components/Todos"
import {FlashCard} from "../state/state-types/charactersrstypes";

const DisplayAllHeisig: React.FunctionComponent<IPage> = props => {

    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )

    function prepareNumberToDisplaySize(data: number): number{
        return data > 100 ? 100 : data
    }
    const allCards: FlashCard[] = characterSRSstate.cards.sort(function sortByCardNumbers(a: FlashCard, b: FlashCard){if (a.cardNumber < b.cardNumber) {return -1; }if (a.cardNumber > b.cardNumber) {return 1;}return 0;})

    const [displayChars, setDisplayChars] = useState<FlashCard[]>([])
    const [numberToDisplay, setNumberToDisplay] = useState<number>(prepareNumberToDisplaySize(characterSRSstate.cards.length))
    const [tagSubstringSearchField, setTagSubstringSearchField] = useState("")
    const handleChangeToTagsubstringSearchField = (e: React.FormEvent<HTMLInputElement>) => {setTagSubstringSearchField(e.currentTarget.value)}

    
    function sortbyIndexNumberAscendingInclUnknown() {
        const sortedByNumber: FlashCard[] = allCards.sort(function sortSmallToLarge(a: FlashCard, b: FlashCard){if (a.cardNumber < b.cardNumber) {return -1; }if (a.cardNumber > b.cardNumber) {return 1;}return 0;})
        setDisplayChars(sortedByNumber.slice(0,numberToDisplay))
    }
    function removeUnknown(input: FlashCard[]): FlashCard[] {
        const onlyKnown: FlashCard[] = input.filter(x=>x.repetitionValue>0)
        return onlyKnown
    }


    function sortbyIndexNumberAscending() {
        const sortedByNumber: FlashCard[] = removeUnknown(allCards).sort(function sortSmallToLarge(a: FlashCard, b: FlashCard){if (a.cardNumber < b.cardNumber) {return -1; }if (a.cardNumber > b.cardNumber) {return 1;}return 0;})
        setDisplayChars(sortedByNumber.slice(0,numberToDisplay))
    }
    function sortbyIndexNumberDescending() {
        const sortedByNumber: FlashCard[] = removeUnknown(allCards).sort(function sortToLargeToSmall(a: FlashCard, b: FlashCard){if (a.cardNumber < b.cardNumber) {return 1; }if (a.cardNumber > b.cardNumber) {return -1;}return 0;})
        setDisplayChars(sortedByNumber.slice(0,numberToDisplay))
    }

    function sortByReviewNumberAscending() {
        const sortedByReviewValue: FlashCard[] = removeUnknown(allCards).sort(function sortSmallToLarge(a: FlashCard, b: FlashCard){if (a.repetitionValue < b.repetitionValue) {return -1; }if (a.repetitionValue > b.repetitionValue) {return 1;}return 0;})
        setDisplayChars(sortedByReviewValue.slice(0,numberToDisplay))
    }
    function sortByReviewNumberDescending() {
        const sortedByReviewValue: FlashCard[] = removeUnknown(allCards).sort(function sortLargeToSmall(a: FlashCard, b: FlashCard){if (a.repetitionValue < b.repetitionValue) {return 1; }if (a.repetitionValue > b.repetitionValue) {return -1;}return 0;})
        setDisplayChars(sortedByReviewValue.slice(0,numberToDisplay))
    }

    function sortByLastReviewDateAscending() {
        const sortedByLastReviewDate: FlashCard[] = removeUnknown(allCards).sort(function sortSmallToLarge(a: FlashCard, b: FlashCard){if (a.dateOfLastReview < b.dateOfLastReview) {return -1; }if (a.dateOfLastReview > b.dateOfLastReview) {return 1;}return 0;})
        setDisplayChars(sortedByLastReviewDate.slice(0,numberToDisplay))
    }
    function sortByLastReviewDateDescending() {
        const sortedByLastReviewDate: FlashCard[] = removeUnknown(allCards).sort(function sortLargeToSmall(a: FlashCard, b: FlashCard){if (a.dateOfLastReview < b.dateOfLastReview) {return 1; }if (a.dateOfLastReview > b.dateOfLastReview) {return -1;}return 0;})
        setDisplayChars(sortedByLastReviewDate.slice(0,numberToDisplay))
    }

    function clearData() {
        setDisplayChars([])
    }
    function toggleSize() {
        if (numberToDisplay < characterSRSstate.cards.length) {
            setNumberToDisplay(characterSRSstate.cards.length)
        }else {
            setNumberToDisplay(100)
        }
    }

    const displayByChosenTagTitleSubstring = () => {
        const stringToLookFor: string = tagSubstringSearchField//"ball"
        const result: FlashCard[] = displayChars.filter((eachCard) => {
            var substringIsFound: boolean[] = new Array()
            for (let eachArrayKey in eachCard.tags) {
                const eachTag: string = eachCard.tags[eachArrayKey]
                if (eachTag.toString().toLowerCase().includes(stringToLookFor)) {
                    substringIsFound.push(true)
                }
            }
            return substringIsFound.length>0
        })
        setDisplayChars(result.slice(0,numberToDisplay))
    }
    
    return <section>
        <h1> The display all heisig page </h1>
        <p>number of heisig items: {characterSRSstate.cards.length}</p>
        <button type="button" onClick={toggleSize}>toggleSize{numberToDisplay}</button>
        <button type="button" onClick={clearData}>clearData</button>
        <button type="button" onClick={sortbyIndexNumberAscendingInclUnknown}>sortAllCardsByCharNumberAscending</button>
        <p></p>
        <button type="button" onClick={sortbyIndexNumberAscending}>sortKnownCardsByCharNumberAscending</button>
        <button type="button" onClick={sortByReviewNumberAscending}>sortKnownCardsByReviewValueAscending</button>
        <button type="button" onClick={sortByLastReviewDateAscending}>sortKnownCardsByLastReviewDateAscending</button>
        <p></p>
        <button type="button" onClick={sortbyIndexNumberDescending}>sortKnownCardsByCharNumberDescending</button>
        <button type="button" onClick={sortByReviewNumberDescending}>sortKnownCardsByReviewValueDescending</button>
        <button type="button" onClick={sortByLastReviewDateDescending}>sortKnownCardsByLastReviewDateDescending</button>
        <p></p>
        <button type="button" onClick={() => displayByChosenTagTitleSubstring()}>filterByTagTitleSubstring</button>
        <input type="tagToRemove" value={tagSubstringSearchField} onChange={handleChangeToTagsubstringSearchField} />
        <Todos data={displayChars}/>
    </section>
};

export default DisplayAllHeisig;