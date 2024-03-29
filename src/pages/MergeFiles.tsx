import React, {useState} from "react";
import IPage from "../interfaces/page";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import FileInputMainDeck from '../components/FileInputMainDeck';
import FileInputMergeFiles from "../components/FileInputMergeFiles";


const MergeFiles: React.FunctionComponent<IPage> = props => {
    const dispatch = useDispatch();
    const {createSRSobject} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )

    const handleContent = (fileContent: string) => {
        let testLarge: FlashCardDeck = JSON.parse(fileContent);
        createSRSobject(testLarge);
    }

    const handleContent2 = (fileContent: FlashCardDeck[]) => {
        console.log("Antal Decks: " + fileContent.length)
    }

    return <section>
        <h1>Merge deck files</h1>
        <FileInputMergeFiles handleContent={handleContent2}/>

    </section>
};

export default MergeFiles;