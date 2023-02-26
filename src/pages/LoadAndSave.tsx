import React, {useState} from "react";
import IPage from "../interfaces/page";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import {FileUploader} from "../components/FileUploader";
import {DragAndDropState} from "../interfaces/dragAndDropState";
import {FlashCard} from "../interfaces/flashcard";
import {mergeDecks} from "../applogic/pageHelpers/mergeDeckHelper";

function clearMergeInputField() {
    (document.getElementById("deckToMerge") as HTMLInputElement).value = ""
}

const LoadAndSave: React.FunctionComponent<IPage> = props => {
    const dispatch = useDispatch();
    const {createSRSobject} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )
    const [uploadData, setUploadData] = useState<DragAndDropState>({
        dragging: false,
        file: null
    })

    const mergeInputDeck = () => {
        const deckToMerge: string = ((document.getElementById("deckToMerge") as HTMLInputElement).value.trim());
        try{
            let testLarge: FlashCardDeck = JSON.parse(deckToMerge);
            const srsStateCards: number = characterSRSstate.cards.length
            var sortedCards: number[] = []//characterSRSstate.cards.map(function(val){val.cardNumber}).sort()
            for (let i = 0;i < srsStateCards;i++) {
                sortedCards.push(characterSRSstate.cards[i].cardNumber)
            }
            sortedCards.sort()
            if (sortedCards[sortedCards.length-1] == srsStateCards) {
                const convertText: FlashCardDeck = mergeDecks(characterSRSstate, testLarge)
                createSRSobject(convertText)
                console.log("hello")
            }else {
                (document.getElementById("deckToMerge") as HTMLInputElement).value = "malformedOldDeck"
            }
        }
        catch(e){
            (document.getElementById("deckToMerge") as HTMLInputElement).value = "error occurred during JSON parsing"
            console.log("error occurred during JSON parsing :")
            console.log(e)
        }
    }

    const processJsonInput = () => {
        const content: string = ((document.getElementById("inserthanzi") as HTMLInputElement).value);
        try {
            let characterSRSobj: FlashCardDeck = JSON.parse(content);

            //add history if nothing exists
            let allCards: FlashCard[] = characterSRSobj.cards
            let cardsWithHistory: FlashCard[] = allCards.filter(each => testIfListOfNum(each.repetitionHistory))
            let cardsNoHistory: FlashCard[] = allCards.filter(each => !testIfListOfNum(each.repetitionHistory))
            let cardsWithCreatedHistory: FlashCard[] = cardsNoHistory.map(each =>
            {
                var newCard: FlashCard = {...each, repetitionHistory: [1,1,1,1,1,1,1,1,1,1]}
                return newCard
            })
            let allNewHistory: FlashCard[] = cardsWithHistory.concat(cardsWithCreatedHistory)
            let newSRS: FlashCardDeck = {...characterSRSobj, cards: allNewHistory}
            createSRSobject(newSRS)
        }
        catch(e){
            console.log("error occurred during JSON parsing :")
            console.log(e)
        }
    }

    const testIfListOfNum = (input: number[]): Boolean => {
        try {
            let inputLength: Boolean = input.length > -1
            return inputLength
        }catch (e) {
            return false
        }
    }

    const clearInputField = () => {
        const insertHanzi = (document.getElementById("inserthanzi") as HTMLInputElement)
        insertHanzi.value = ""
        const blankInput: FlashCardDeck = {
            deckName: "",
            deckInfo: "",
            settings: {},
            tags: {},
            cards: []
        }
        createSRSobject(blankInput)
        setUploadData({
            dragging: false,
            file: null,
        })
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

    const handleDragAndDrop = (data: DragAndDropState) => {
        setUploadData(data)
        const insertHanzi = (document.getElementById("inserthanzi") as HTMLInputElement)
        if (data.file) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (reader.result) {
                    insertHanzi.value = reader.result.toString();
                }
            }, false);
            if (data.file) {
                reader.readAsText(data.file);
            }
        }
    }

    const getCharactersJson = (filename: string, url: string) => {
        fetch(url)
            .then(res => res.json())
            .then(data => saveAsJsonfile(filename, JSON.stringify(data)))
    }

    return <section>
        <h1>Load and download flashcard files</h1>
        <button type="button" onClick={() => downloadCharacterSRSobject()}>download changes</button>
        <button type="button" onClick={() => processJsonInput()}>process json</button>
        <button type="button" onClick={() => clearInputField()}>clear data</button>
        <p>{characterSRSstate.cards.length}</p>
        <p>***</p>
        <input type="text"
               id="inserthanzi"
               placeholder="paste character json file content"
               style={{width: "370px"}}></input>
        <p>***</p>
        <FileUploader editParaList={handleDragAndDrop} paraList={uploadData}/>
        <p>**************</p>
        <p>
            <label htmlFor="deckToMerge">deckToMerge</label>
            <textarea id="deckToMerge" required rows={5}> </textarea>
        </p>
        <button type="button" onClick={() => mergeInputDeck()}>MergeWithCurrentDeck</button>
        <button type="button" onClick={() => clearMergeInputField()}>ClearMergeField</button>
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