
import React from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import Todos from "../components/Todos"

const DisplayAllHeisig: React.FunctionComponent<IPage> = props => {

    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )
    const dispatch = useDispatch();
    const {createSRSobject} = bindActionCreators(characterSRSactionCreators, dispatch)

    return <section>
        <h1> The display all heisig page </h1>
        <p>number of heisig items: {characterSRSstate.content.length}</p>
        <Todos data={characterSRSstate}/>
    </section>
    //return <h1> The display all heisig page </h1>
};

export default DisplayAllHeisig;