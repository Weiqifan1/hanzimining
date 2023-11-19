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

const Home: React.FunctionComponent<IPage> = props => {


    return <section>
        <h1>Home</h1>
        <p>... test</p>
    </section>
};

export default Home;