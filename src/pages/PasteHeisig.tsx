import React from "react";
import IPage from "../interfaces/page";
import {CharactersSRS, Content} from "../state/state-types/charactersrstypes";
import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';

const PasteHeisig: React.FunctionComponent<IPage> = props => {

    const dispatch = useDispatch();
    const {createSRSobject} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )
    
    const processJsonInput = () => {
        const content: string = ((document.getElementById("inserthanzi") as HTMLInputElement).value);
        console.log("process json content");
        console.log(content.length);
        console.log(typeof content)

        try {
            let characterSRSobj: CharactersSRS = JSON.parse(content);
            createSRSobject(characterSRSobj)
            console.log("no error")
            console.log(characterSRSobj.content.length)
        }
        catch(e){
            console.log("error:")
            console.log(e)
        }
    }

    return <section>
        <h1> The paste heisig page </h1>
        <button type="button" onClick={() => processJsonInput()}>processJson</button>
        <p>{characterSRSstate.content.length}</p>
        <p>***</p>
        <input type="text" id="inserthanzi" placeholder="paste character json file content"></input>

    </section>
};

export default PasteHeisig;