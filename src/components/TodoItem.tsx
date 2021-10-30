import classes from "./TodoItem.module.css"
import {FormEvent, PropsWithChildren} from "react";
import React from "react";
import IPage from "../interfaces/page";
import {FlashCardDeck, FlashCard} from "../state/state-types/charactersrstypes";
import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';

const TodoItem: React.FC<{content: FlashCard, show: boolean}> = (props: PropsWithChildren<{content: FlashCard, show: boolean}>) => {//PropsWithChildren<{content: Content}>
    const content: FlashCard = props.content
    var tempReviewValue: number = props.content.repetitionValue
    var tempDateOfLastReview: string = props.content.dateOfLastReview
    var tempKeyword: string = props.content.frontSide
    var tempStory: string = props.content.primaryInfo

    const dispatch = useDispatch();
    const {editListItem} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )

    const saveEdit = () => {
        var changesMade: boolean = false
        if (!(tempReviewValue === props.content.repetitionValue)) {changesMade = true}
        if (!(tempDateOfLastReview === props.content.dateOfLastReview)) {changesMade = true}
        if (!(tempKeyword === props.content.frontSide)) {changesMade = true}
        if (!(tempStory === props.content.primaryInfo)) {changesMade = true}
        const newContentObject: FlashCard = {
            cardNumber: props.content.cardNumber,
            cardName: props.content.cardName,
            frontSide: tempKeyword,
            backSide: props.content.backSide,
            primaryInfo: tempStory,
            secondaryInfo: props.content.secondaryInfo,
            notableCards: props.content.notableCards,
            dateOfLastReview: tempDateOfLastReview,
            repetitionValue: tempReviewValue
        }
        /*
        cardNumber: number;
    cardName: string;
    frontSide: string;
    backSide: string;
    infoPrimary: string;
    infoSecondary: string;
    notableCards: number[];
    dateOfLastReview: string;
    repetitionValue: number;
        */
        //TDOD: create an action that can save a content object
        editListItem(newContentObject, characterSRSstate)

    }

    const editNumberValue = (htmlelement: FormEvent<HTMLElement>, defaultValue: number): number => {
        const textvalue: string | null = htmlelement.currentTarget.textContent
        if (!(textvalue == null) && !Number.isInteger(parseInt(textvalue))) {
            //console.log("not a number: " + htmlelement.currentTarget.textContent)
            return defaultValue
        }else {
            const finalresult: number = Number(textvalue)
            return finalresult
        }
    }

    const editStringvalue = (htmlelement: FormEvent<HTMLElement>, defaultValue: string): string => {
        const textvalue = htmlelement.currentTarget.textContent
        if (!textvalue) {
            //console.log("not a string: " + htmlelement.currentTarget.textContent)
            return defaultValue
        }else {
            const finalresult: string = textvalue ? textvalue : defaultValue
            return finalresult
        }
    }

    //TODO: create a editDate function that verifies that the text entered has the right format

    return <section>
        <button type="button" onClick={() => saveEdit()}>saveEditOn {content.cardNumber}</button>
        <ul>
            { props.show ? <li className={classes.characterListElement}>{props.content.backSide}</li> : <li className={classes.characterListElement}></li>}
            { props.show ? <li>{content.cardNumber}</li> : <li></li>}
            { props.show ? <li onInput={(e) => tempReviewValue = editNumberValue(e, props.content.repetitionValue)} id="reviewValue" contentEditable="true">
                {content.repetitionValue}</li> : <li></li>}
            { props.show ? <li onInput={(e) => tempDateOfLastReview = editStringvalue(e, props.content.dateOfLastReview)} id="dateOfLastReview" contentEditable="true">
                {content.dateOfLastReview}</li> : <li></li>}
            <li onInput={(e) => tempKeyword = editStringvalue(e, props.content.frontSide)} id="keyword" contentEditable="true">
                {content.frontSide}</li>
            { props.show ? <li onInput={(e) => tempStory = editStringvalue(e, props.content.primaryInfo)} id="story" contentEditable="true">
                {content.primaryInfo}</li> : <li></li>}
        </ul>
    </section>

}

export default TodoItem