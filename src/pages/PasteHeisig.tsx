
import React from "react";
import IPage from "../interfaces/page";

const PasteHeisig: React.FunctionComponent<IPage> = props => {

    const processJsonInput = () => {
        const content: string = ((document.getElementById("inserthanzi") as HTMLInputElement).value);
        console.log("process json content");
        console.log(content);
        console.log(typeof content)

    }

    return <section>
        <h1> The paste heisig page </h1>
        <button type="button" onClick={() => processJsonInput()}>processJson</button>
        <p>***</p>
        <input type="text" id="inserthanzi" placeholder="paste character json file content"></input>

    </section>
};

export default PasteHeisig;