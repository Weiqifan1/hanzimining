import classes from "./TodoItem.module.css"
import {FormEvent} from "react";
import React from "react";
import IPage from "../interfaces/page";
import {CharactersSRS, Content} from "../state/state-types/charactersrstypes";
import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';

const TodoItem: React.FC<{content: Content}> = (props) => {
    const content: Content = props.content
    var tempReviewValue: number = props.content.reviewValue
    var tempDateOfLastReview: string = props.content.dateOfLastReview
    var tempKeyword: string = props.content.keyword
    var tempStory: string = props.content.story

    const dispatch = useDispatch();
    const {editListItem} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )

    const saveEdit = () => {
        var changesMade: boolean = false
        if (!(tempReviewValue === props.content.reviewValue)) {changesMade = true}
        if (!(tempDateOfLastReview === props.content.dateOfLastReview)) {changesMade = true}
        if (!(tempKeyword === props.content.keyword)) {changesMade = true}
        if (!(tempStory === props.content.story)) {changesMade = true}
        const newContentObject: Content = {
            character: props.content.character,
            number: props.content.number,
            reviewValue: tempReviewValue,
            dateOfLastReview: tempDateOfLastReview,
            keyword: tempKeyword,
            story: tempStory
        }
        //TDOD: create an action that can save a content object
        editListItem(newContentObject, characterSRSstate)

    }

    const editNumberValue = (htmlelement: FormEvent<HTMLElement>, defaultValue: number): number => {
        const textvalue = htmlelement.currentTarget.textContent
        if (!textvalue || !Number.isInteger(textvalue)) {
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
        <button type="button" onClick={() => saveEdit()}>saveEditOn {content.number}</button>
        <ul>
            <li className={classes.characterListElement}>{props.content.character}</li>
            <li>{content.number}</li>
            <li onInput={(e) => tempReviewValue = editNumberValue(e, props.content.reviewValue)} id="reviewValue" contentEditable="true">
                {content.reviewValue}</li>
            <li onInput={(e) => tempDateOfLastReview = editStringvalue(e, props.content.dateOfLastReview)} id="dateOfLastReview" contentEditable="true">
                {content.dateOfLastReview}</li>
            <li onInput={(e) => tempKeyword = editStringvalue(e, props.content.keyword)} id="keyword" contentEditable="true">
                {content.keyword}</li>
            <li onInput={(e) => tempStory = editStringvalue(e, props.content.story)} id="story" contentEditable="true">
                {content.story}</li>
        </ul>
    </section>

}

export default TodoItem