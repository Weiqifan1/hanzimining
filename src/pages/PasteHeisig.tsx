
import React from "react";
import IPage from "../interfaces/page";
import {CharactersSRS, Content} from "../state/state-types/charactersrstypes";


const PasteHeisig: React.FunctionComponent<IPage> = props => {

    const processJsonInput = () => {
        const content: string = ((document.getElementById("inserthanzi") as HTMLInputElement).value);
        console.log("process json content");
        console.log(content.length);
        console.log(typeof content)

        try {
            let obj: CharactersSRS = JSON.parse(content);
            console.log("no error")
            console.log(obj.content.length)
        }
        catch(e){
            console.log("error:")
            console.log(e)
        }
    }

    return <section>
        <h1> The paste heisig page </h1>
        <button type="button" onClick={() => processJsonInput()}>processJson</button>
        <p>***</p>
        <input type="text" id="inserthanzi" placeholder="paste character json file content"></input>

    </section>
};

export default PasteHeisig;