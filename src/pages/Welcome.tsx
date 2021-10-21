
import React from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';

const Welcome: React.FunctionComponent<IPage> = props => {

    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )

    return <section>
        <h1> The Welcome page </h1>

    </section>
    //return <h1> The Welcome page </h1>
};

export default Welcome;