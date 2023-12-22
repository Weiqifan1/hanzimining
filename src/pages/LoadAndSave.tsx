import React, {useState} from "react";
import IPage from "../interfaces/page";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import FileInput from '../components/FileInput';

function clearMergeInputField() {
    (document.getElementById("deckToMerge") as HTMLInputElement).value = ""
}

const LoadAndSave: React.FunctionComponent<IPage> = props => {
    const dispatch = useDispatch();
    const {createSRSobject} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )

    const handleContent = (fileContent: string) => {
        let testLarge: FlashCardDeck = JSON.parse(fileContent);
        createSRSobject(testLarge);
    }

    const saveAsJsonfile = (filename: string, text: string) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const downloadCharacterSRSobject = () => {
        const characterSRSobject: FlashCardDeck = characterSRSstate
        const result: string = JSON.stringify(characterSRSobject)
        saveAsJsonfile("updatedList.json", result)
    }

    const getCharactersJson = (filename: string, url: string) => {
        fetch(url)
            .then(res => res.json())
            .then(data => saveAsJsonfile(filename, JSON.stringify(data)))
    }

    return <section>
        <h1>Load and download flashcard files</h1>
        <FileInput onContentChange={handleContent}/>

        <button type="button" onClick={() => downloadCharacterSRSobject()}>download changes</button>
        <p>{characterSRSstate.cards.length}</p>

        <p>******** Heisig character example decks that can be download (keywords has to be added by the user) **********</p>
        <button type="button" onClick={() => getCharactersJson(
            "heisigKanjiV5-3030noKeys.json",
            "https://weiqifan1.github.io/hanzimining_data/heisigKanjiV5-3030noKeys.json")}>
            heisigKanjiV5-3030noKeys</button>
        <button type="button" onClick={() => getCharactersJson(
            "heisigTraditionalV1-3035noKeys.json",
            "https://weiqifan1.github.io/hanzimining_data/heisigTraditionalV1-3035noKeys.json")}>
            heisigTraditionalV1-3035noKeys</button>
        <button type="button" onClick={() => getCharactersJson(
            "heisigSimplifiedV1-3018noKeys.json",
            "https://weiqifan1.github.io/hanzimining_data/heisigSimplifiedV1-3018noKeys.json")}>
            heisigSimplifiedV1-3018noKeys</button>
    </section>
};

export default LoadAndSave;