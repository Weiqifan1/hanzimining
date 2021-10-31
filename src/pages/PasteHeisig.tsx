import React, {useState} from "react";
import IPage from "../interfaces/page";
import {FlashCardDeck, FlashCard} from "../state/state-types/charactersrstypes";
import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import {FileUploader} from "../components/FileUploader";
import {DragAndDropProps, DragAndDropState} from "../interfaces/dragAndDropState";

const PasteHeisig: React.FunctionComponent<IPage> = props => {

    const dispatch = useDispatch();
    const {createSRSobject} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )
    const [uploadData, setUploadData] = useState<DragAndDropState>({
        dragging: false,
        file: null
    })
    
    const processJsonInput = () => {
        const content: string = ((document.getElementById("inserthanzi") as HTMLInputElement).value);
        try {
            let characterSRSobj: FlashCardDeck = JSON.parse(content);
            createSRSobject(characterSRSobj)
            console.log("no error")
        }
        catch(e){
            console.log("error:")
            console.log(e)
        }
    }

    const clearInputField = () => {

        const insertHanzi = (document.getElementById("inserthanzi") as HTMLInputElement)
        insertHanzi.value = ""
        const blankInput: FlashCardDeck = {
            deckName: "",
            deckInfo: "",
            settings: new Map<string, string>(),
            cards: []
        }
        /*deckName: string;
    deckInfo: string;
    settings: Map<string, string>;
    cards: FlashCard[];*/
        createSRSobject(blankInput)
        setUploadData({
            dragging: false,
            file: null,
        })
    }

    const testchr = (filename: string, text: string) => {
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
        testchr("updatedList.json", result)
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

    return <section>
        <h1> The paste heisig page </h1>
        <button type="button" onClick={() => downloadCharacterSRSobject()}>downloadCharacterSRS</button>
        <button type="button" onClick={() => processJsonInput()}>processJson</button>
        <button type="button" onClick={() => clearInputField()}>ClearContent</button>
        <p>{characterSRSstate.cards.length}</p>
        <p>***</p>
        <input type="text" id="inserthanzi" placeholder="paste character json file content"></input>
        <p>***</p>
        <FileUploader editParaList={handleDragAndDrop} paraList={uploadData}/>
    </section>
};

export default PasteHeisig;