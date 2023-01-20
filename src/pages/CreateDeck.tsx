import React, {useState} from "react";
import IPage from "../interfaces/page";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import {FileUploader} from "../components/FileUploader";
import {DragAndDropState} from "../interfaces/dragAndDropState";
import {FlashCard} from "../interfaces/flashcard";


const CreateDeck: React.FunctionComponent<IPage> = props => {
    const [selects, setSelects] = useState<string>("simplified")
    const [delevery, setDelevery] = useState<string>("toFile")
    const [outputs, setOutputs] = useState<string>("")

    const processBody = () => {
        const deckName: string = ((document.getElementById("deckName") as HTMLInputElement).value);
        const deckInfo: string = ((document.getElementById("deckInfo") as HTMLInputElement).value);
        const text: string = ((document.getElementById("text") as HTMLInputElement).value);
        const output: string = ((document.getElementById("output") as HTMLInputElement).value);
        if (isEmptyString(deckName) || isEmptyString(deckInfo) || isEmptyString(text)) {
            setOutputs("there is an error in in the input. make sure all fields are set")
        }else {
            console.log("send post request")
        }
        console.log(deckName)
        console.log(deckInfo)
        console.log(selects)
        console.log(text)
        console.log(output)
    }

    const isEmptyString = (data: string): boolean => typeof data === "string" && data.trim().length == 0;

    return (
        <section>
            <button type="button" onClick={() => processBody()}>text to deck</button>
        <form>
            <p>
                <label htmlFor="deckName">deckName</label>
                <textarea id="deckName" required rows={2}> </textarea>
            </p>
            <p>
                <label htmlFor="deckInfo">deckInfo</label>
                <textarea id="deckInfo" required rows={5}> </textarea>
            </p>
            <div>
                <p>Currently, only simplified characters are supported. Traditional characters will be supported at some point</p>
                <p>value: {selects}</p>
                <select value={selects} onChange={e => setSelects(e.target.value)}>
                    <option>simplified</option>
                </select>
            </div>

            <div>
                <p>Choose how to get the result data: download to file, written in the output box or both</p>
                <p>value: {delevery}</p>
                <select value={delevery} onChange={e => setDelevery(e.target.value)}>
                    <option>toFile</option>
                    <option>toOutputBox</option>
                    <option>toFileAndToOutputBox</option>
                </select>
            </div>

            <div>
                <p>Insert the chinese text in the Text box. </p>
                <label htmlFor="text">Text</label>
                <textarea id="text" required rows={10}> </textarea>
            </div>
            <p>
                <label htmlFor="output">output</label>
                <textarea id="output" required rows={10} value={outputs} onChange={e => setOutputs(e.target.value)}> </textarea>
            </p>

        </form>
        </section>
            )
};

export default CreateDeck;