
import React, {ReactElement, useState} from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import Todos from "../components/Todos"
import {Content} from "../state/state-types/charactersrstypes";

const DisplayAllHeisig: React.FunctionComponent<IPage> = props => {

    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )
    //const dispatch = useDispatch();
    //const {createSRSobject} = bindActionCreators(characterSRSactionCreators, dispatch)

    function prepareNumberToDisplaySize(data: number): number{
        return data > 100 ? 100 : data
    }

    const [displayChars, setDisplayChars] = useState<Content[]>([])
    const [numberToDisplay, setNumberToDisplay] = useState<number>(prepareNumberToDisplaySize(characterSRSstate.content.length))

    function sortbyIndexNumber() {
        const sortedByNumber: Content[] = characterSRSstate.content.sort(function sortSmallToLarge(a: Content, b: Content){if (a.number < b.number) {return -1; }if (a.number > b.number) {return 1;}return 0;})
        setDisplayChars(sortedByNumber.slice(0,numberToDisplay))
    }
    function sortByReviewNumber() {
        const sortedByReviewValue: Content[] = characterSRSstate.content.sort(function sortSmallToLarge(a: Content, b: Content){if (a.reviewValue < b.reviewValue) {return -1; }if (a.reviewValue > b.reviewValue) {return 1;}return 0;})
        setDisplayChars(sortedByReviewValue.slice(0,numberToDisplay))
    }
    function sortByLastReviewDate() {
        const sortedByLastReviewDate: Content[] = characterSRSstate.content.sort(function sortSmallToLarge(a: Content, b: Content){if (a.dateOfLastReview < b.dateOfLastReview) {return -1; }if (a.dateOfLastReview > b.dateOfLastReview) {return 1;}return 0;})
        setDisplayChars(sortedByLastReviewDate.slice(0,numberToDisplay))
    }

    function clearData() {
        setDisplayChars([])
    }
    function toggleSize() {
        if (numberToDisplay < characterSRSstate.content.length) {
            setNumberToDisplay(characterSRSstate.content.length)
        }else {
            setNumberToDisplay(100)
        }
    }

    return <section>
        <h1> The display all heisig page </h1>
        <p>number of heisig items: {characterSRSstate.content.length}</p>
        <button type="button" onClick={toggleSize}>toggleSize{numberToDisplay}</button>
        <button type="button" onClick={clearData}>clearData</button>
        <button type="button" onClick={sortbyIndexNumber}>sortByCharNumber</button>
        <button type="button" onClick={sortByReviewNumber}>sortByReviewValue</button>
        <button type="button" onClick={sortByLastReviewDate}>sortByLastReviewDate</button>
        <Todos data={displayChars}/>
    </section>
    //return <h1> The display all heisig page </h1>
};

export default DisplayAllHeisig;