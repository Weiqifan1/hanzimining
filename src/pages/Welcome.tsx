
import React, {ReactElement, useState} from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import {Content} from "../state/state-types/charactersrstypes";
import characterSRSlogic from "../interfaces/characterSRSlogic";
import {calculateNextCharacter} from "../applogic/characterSRSlogic/calculateCharacterSRSorder";
import TodoItem from "../components/TodoItem";

const Welcome: React.FunctionComponent<IPage> = props => {

    var currentContent: Content;
    const [addMoreCharactersTextField, setAddMoreCharactersTextField] = useState("");

    const dispatch = useDispatch();
    const {editListItem} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )


    const todoPageContent = (): ReactElement => {
        let contentOrNotEnough;
        const srslogic: characterSRSlogic = {
            characterSRS: characterSRSstate,
            currentContent: undefined,
            mostRecentContentObjects: [],
            notEnoughCharacters: false
        }
        const srscalculationResult: characterSRSlogic = calculateNextCharacter(srslogic)
        if (srscalculationResult.notEnoughCharacters) {
            contentOrNotEnough = <p>not enough characters. add more to deck</p>
        }else {
            if (srscalculationResult.currentContent) {
                //save the calculated Content object to a component variable
                currentContent = srscalculationResult.currentContent
                //create the appropriate diaplay
                contentOrNotEnough = <TodoItem content={srscalculationResult.currentContent}/>
            }else {
                contentOrNotEnough = <p>Content type is undefined!!! this is an error</p>
            }
        }
        return contentOrNotEnough
    }


    const displayNumberOfCharacters = (): ReactElement => {
        const charactersYouWantToAdd: number = Number(addMoreCharactersTextField) ? Number(addMoreCharactersTextField) : 0
        const finalCharValue: number = getNewFinalCharValue(charactersYouWantToAdd, characterSRSstate.content)
        return <p>highest character: {finalCharValue}</p>
    }
    const getNewChars = (charactersToAdd: number, allCharacter: Content[]): Content[] => {
        const sortedCharactersLowestToHighest: Content[] = characterSRSstate.content.sort(function sort(a: Content, b: Content){if (a.number < b.number) {return -1; }if (a.number > b.number) {return 1;}return 0;})
        const onlyCharactersWithReviewValueAt0: Content[] = sortedCharactersLowestToHighest.filter(eachContent => eachContent.reviewValue === 0)
        const charsToAdd: Content[] = onlyCharactersWithReviewValueAt0.slice(0,charactersToAdd)
        //const sortedCharsReviewValueAbove0WithNewChars: Content[] = sortedCharactersLowestToHighest.filter(eachContent => eachContent.reviewValue > 0).concat(charsToAdd)
        //const sortetAgain
        return charsToAdd
    }
    const getNewFinalCharValue = (charactersToAdd: number, allCharacter: Content[]): number => {
        const sortedCharactersLowestToHighest: Content[] = characterSRSstate.content.sort(function sort(a: Content, b: Content){if (a.number < b.number) {return -1; }if (a.number > b.number) {return 1;}return 0;})
        const onlyCharactersWithReviewValueAt0: Content[] = sortedCharactersLowestToHighest.filter(eachContent => eachContent.reviewValue === 0)
        const charsToAdd: Content[] = onlyCharactersWithReviewValueAt0.slice(0,charactersToAdd)
        const sortedCharsReviewValueAbove0WithNewChars: Content[] = sortedCharactersLowestToHighest.filter(eachContent => eachContent.reviewValue > 0).concat(charsToAdd)
        const sortetReverse: Content[] = sortedCharsReviewValueAbove0WithNewChars.sort(function sortReverse(a: Content, b: Content){if (a.number > b.number) {return -1; }if (a.number < b.number) {return 1;}return 0;})
        return sortetReverse[0] ? sortetReverse[0].number : 0
    }


    const addANumberOfCharacters = () => {

        const charactersYouWantToAdd: number = Number(addMoreCharactersTextField) ? Number(addMoreCharactersTextField) : 0
        const newCharactersToBeAdded: Content[] = getNewChars(charactersYouWantToAdd, characterSRSstate.content)
        const test = "test"
        /*
        newCharactersToBeAdded.map(eachNewContent => {
            const newContentItem: Content = {...eachNewContent, reviewValue: 1}
            editListItem(newContentItem, characterSRSstate)
        })*/
        console.log("button pressed")
    }
    const changeOnNewCharacterInputField = (e: React.FormEvent<HTMLInputElement>) => {
        setAddMoreCharactersTextField(e.currentTarget.value)
        console.log(addMoreCharactersTextField);
    }

    const addCharactersPageContent = (): ReactElement => {
        return <section>
            <button type="button" onClick={addANumberOfCharacters}>addNewChars</button>
            <input type="text" id="addMoreCharacters" placeholder="addCharacters" onInput={changeOnNewCharacterInputField}></input>
        </section>
    }

    /*{(e: React.FormEvent<HTMLInputElement>) => {
                addMoreCharactersTextField = e.currentTarget.value
                console.log(e.currentTarget.value);
            }}*/

    return <section>
        <h1> The Welcome page </h1>
        {displayNumberOfCharacters()}
        {addCharactersPageContent()}
        {todoPageContent()}
    </section>
    //return <h1> The Welcome page </h1>
};

export default Welcome;