
import React from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import {Content} from "../state/state-types/charactersrstypes";
import characterSRSlogic from "../interfaces/characterSRSlogic";
import {calculateNextCharacter} from "../applogic/characterSRSlogic/calculateCharacterSRSorder";
import TodoItem from "../components/TodoItem";

const Welcome: React.FunctionComponent<IPage> = props => {

    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )

    /* characterSRS: CharactersSRS;
    currentContent: Content;
    mostRecentContentObjects: Content[];
    //attributes needed when repetition cant be conducted easily
    notEnoughCharacters: boolean*/

    const getPageContent = () => {

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
                contentOrNotEnough = <TodoItem content={srscalculationResult.currentContent}/>
            }else {
                contentOrNotEnough = <p>Content type is undefined!!! this is an error</p>
            }

        }
        return contentOrNotEnough
    }

    return <section>
        <h1> The Welcome page </h1>
        {getPageContent()}
    </section>
    //return <h1> The Welcome page </h1>
};

export default Welcome;