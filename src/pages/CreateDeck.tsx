import React, {useEffect, useState} from "react";
import IPage from "../interfaces/page";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import {FileUploader} from "../components/FileUploader";
import {DragAndDropState} from "../interfaces/dragAndDropState";
import {FlashCard} from "../interfaces/flashcard";


const CreateDeck: React.FunctionComponent<IPage> = props => {
    const backendUrl: string = "https://chinesesentencemining-6z6zb.ondigitalocean.app/texttodeck"//"http://127.0.0.1:5000/texttodeck"
    const [selects, setSelects] = useState<string>("simplified")
    const [sortorder, setsortorder] = useState<string>("chronological")
    const [delivery, setDelivery] = useState<string>("toFile")
    const [outputs, setOutputs] = useState<string>("")
    /*write a state variable to handle post requests*/
    const [posts, setPosts] = useState<string>("");
    /*dummy for forcing update*/

    const download = (filename: string, text:string) => {
        console.log("save file code initiated")
        const element = document.createElement('a');
        const file = new Blob([text], {
            type: "text/plain;charset=utf-8",
        });
        element.href = URL.createObjectURL(file);
        element.download = filename + ".txt";
        document.body.appendChild(element);
        element.click();
        console.log("save file code executed")
    }

    const handleDownload = () => {
        const deckName: string = ((document.getElementById("deckName") as HTMLInputElement).value);
        const deckInfo: string = ((document.getElementById("deckInfo") as HTMLInputElement).value);
        const text: string = ((document.getElementById("text") as HTMLInputElement).value);
        const output: string = ((document.getElementById("output") as HTMLInputElement).value);
        if (isEmptyString(deckName) || isEmptyString(deckInfo) || isEmptyString(text)) {
            setOutputs("there is an error in in the input. make sure all fields are set")
        }
        console.log(deckName)
        console.log(deckInfo)
        console.log(selects)
        console.log(sortorder)
        console.log(text)
        console.log(output)

        const bodyDict = {
            "deckName": deckName,
            "deckInfo": deckInfo,
            "script": selects,
            "cardOrder": sortorder,
            "text": text,
        }
        console.log("send post request")

        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(bodyDict)
        }

        fetch(backendUrl, options)
            .then(response => response.json())
            .then(data => {
                const stringedResponse = JSON.stringify(data)
                //document.getElementById("output").value = stringedResponse
                //setOutputs(stringedResponse)
                download(deckName, stringedResponse)
            })
        console.log("request is sent")
    }

    const isEmptyString = (data: string): boolean => typeof data === "string" && data.trim().length == 0;

    return (
        <section>
            <button type="button" onClick={() => handleDownload()}>text to deck</button>
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
                    <option>traditional</option>
                </select>
            </div>
            <div>
                <p>choose the orderings frequency: </p>
                <p>value: {sortorder}</p>
                <select value={sortorder} onChange={e => setsortorder(e.target.value)}>
                    <option>chronological</option>
                    <option>frequency</option>
                </select>
            </div>

            <div>
                <p>Insert the chinese text in the Text box. The data will be downloaded to a file</p>
                <label htmlFor="text">Text</label>
                <textarea id="text" required rows={10}> </textarea>
            </div>
        </form>
        </section>
            )
};

/*
            <div>
                <p>The data will be downloaded to a file</p>
                <p>value: {delivery}</p>
                <select value={delivery} onChange={e => setDelivery(e.target.value)}>
                    <option>toFile</option>
                </select>
            </div>
<p>
                <label htmlFor="output">output</label>
                <textarea id="output" required rows={10} value={outputs} onChange={e => setOutputs(e.target.value)}> </textarea>
            </p>
*/

export default CreateDeck;
