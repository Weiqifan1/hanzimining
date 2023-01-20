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
    const [selects, setSelects] = useState<string>("simplified")
    const [delivery, setDelivery] = useState<string>("toFile")
    const [outputs, setOutputs] = useState<string>("")
    /*write a state variable to handle post requests*/
    const [posts, setPosts] = useState<string>("");
    /*dummy for forcing update*/

    /*
    function PostList() {
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
        console.log(text)
        console.log(output)

        const bodyDict = {
            "deckName": deckName,
            "deckInfo": deckInfo,
            "script": selects,
            "text": text,
        }
        console.log("send post request")
        useEffect(() => {
            async function fetchPosts() {
                const response = await fetch("http://127.0.0.1:5000/texttodeck")
                const resData = await response.json();
                download(deckName, resData)
                setPosts(JSON.stringify(resData))
            }
        })
        console.log("request has been made")
    }*/

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
        console.log(text)
        console.log(output)

        const bodyDict = {
            "deckName": deckName,
            "deckInfo": deckInfo,
            "script": selects,
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

        fetch("http://127.0.0.1:5000/texttodeck", options)
            .then(response => response.json())
            .then(data => {
                const stringedResponse = JSON.stringify(data)
                //document.getElementById("output").value = stringedResponse
                //setOutputs(stringedResponse)
                download(deckName, stringedResponse)
            })
        console.log("request is sent")

    }



    /*
    fetch("http://127.0.0.1:5000/texttodeck", options)
        .then(res => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))

    const headers = new Headers();
            headers.append('Content-type', 'application/json');
            const options = {
                method: 'POST',
                headers,
                body: JSON.stringify(bodyDict)
            }
            const request = new Request('http://127.0.0.1:5000/texttodeck', options)
            const response = fetch(request);
     */


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
                </select>
            </div>

            <div>
                <p>Choose how to get the result data: download to file, written in the output box or both</p>
                <p>value: {delivery}</p>
                <select value={delivery} onChange={e => setDelivery(e.target.value)}>
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