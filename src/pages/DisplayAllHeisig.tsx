
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
    //const dispatch = useDispatch();
    //const {createSRSobject} = bindActionCreators(characterSRSactionCreators, dispatch)

    function prepareNumberToDisplaySize(data: number): number{
        return data > 100 ? 100 : data
    }

    const [displayChars, setDisplayChars] = useState<FlashCard[]>([])
    const [numberToDisplay, setNumberToDisplay] = useState<number>(prepareNumberToDisplaySize(characterSRSstate.cards.length))

    function sortbyIndexNumberAscending() {
        const sortedByNumber: FlashCard[] = characterSRSstate.cards.sort(function sortSmallToLarge(a: FlashCard, b: FlashCard){if (a.cardNumber < b.cardNumber) {return -1; }if (a.cardNumber > b.cardNumber) {return 1;}return 0;})
        setDisplayChars(sortedByNumber.slice(0,numberToDisplay))
    }
    function sortbyIndexNumberDescending() {
        const sortedByNumber: FlashCard[] = characterSRSstate.cards.sort(function sortToLargeToSmall(a: FlashCard, b: FlashCard){if (a.cardNumber < b.cardNumber) {return 1; }if (a.cardNumber > b.cardNumber) {return -1;}return 0;})
        setDisplayChars(sortedByNumber.slice(0,numberToDisplay))
    }

    function sortByReviewNumberAscending() {
        const sortedByReviewValue: FlashCard[] = characterSRSstate.cards.sort(function sortSmallToLarge(a: FlashCard, b: FlashCard){if (a.repetitionValue < b.repetitionValue) {return -1; }if (a.repetitionValue > b.repetitionValue) {return 1;}return 0;})
        setDisplayChars(sortedByReviewValue.slice(0,numberToDisplay))
    }
    function sortByReviewNumberDescending() {
        const sortedByReviewValue: FlashCard[] = characterSRSstate.cards.sort(function sortLargeToSmall(a: FlashCard, b: FlashCard){if (a.repetitionValue < b.repetitionValue) {return 1; }if (a.repetitionValue > b.repetitionValue) {return -1;}return 0;})
        setDisplayChars(sortedByReviewValue.slice(0,numberToDisplay))
    }

    function sortByLastReviewDateAscending() {
        const sortedByLastReviewDate: FlashCard[] = characterSRSstate.cards.sort(function sortSmallToLarge(a: FlashCard, b: FlashCard){if (a.dateOfLastReview < b.dateOfLastReview) {return -1; }if (a.dateOfLastReview > b.dateOfLastReview) {return 1;}return 0;})
        setDisplayChars(sortedByLastReviewDate.slice(0,numberToDisplay))
    }
    function sortByLastReviewDateDescending() {
        const sortedByLastReviewDate: FlashCard[] = characterSRSstate.cards.sort(function sortLargeToSmall(a: FlashCard, b: FlashCard){if (a.dateOfLastReview < b.dateOfLastReview) {return 1; }if (a.dateOfLastReview > b.dateOfLastReview) {return -1;}return 0;})
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

    return <section>
        <h1> The display all heisig page </h1>
        <p>number of heisig items: {characterSRSstate.cards.length}</p>
        <button type="button" onClick={toggleSize}>toggleSize{numberToDisplay}</button>
        <button type="button" onClick={clearData}>clearData</button>
        <p></p>
        <button type="button" onClick={sortbyIndexNumberAscending}>sortByCharNumberAscending</button>
        <button type="button" onClick={sortByReviewNumberAscending}>sortByReviewValueAscending</button>
        <button type="button" onClick={sortByLastReviewDateAscending}>sortByLastReviewDateAscending</button>
        <p></p>
        <button type="button" onClick={sortbyIndexNumberDescending}>sortByCharNumberDescending</button>
        <button type="button" onClick={sortByReviewNumberDescending}>sortByReviewValueDescending</button>
        <button type="button" onClick={sortByLastReviewDateDescending}>sortByLastReviewDateDescending</button>
        <Todos data={displayChars}/>
    </section>
    //return <h1> The display all heisig page </h1>
};

export default DisplayAllHeisig;