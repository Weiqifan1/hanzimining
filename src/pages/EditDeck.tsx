import React, {ReactElement, useEffect, useRef, useState} from "react";
import IPage from "../interfaces/page";
import "./EditCard.css"

import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators,
    State } from '../state/index';
import {FlashCardDeck} from "../interfaces/flashcarddeck";


const EditDeck: React.FunctionComponent<IPage> = props => {

    const addCharactersReference = useRef<HTMLInputElement | null>(null);
    useEffect(()=>{addCharactersReference.current?.focus();},[])

    const dispatch = useDispatch();
    const {editListItemInBulk} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate: FlashCardDeck = useSelector(
        (state: State) => state.characterSRS
    )

    const [cardNumber, setCardNumber] = useState<number>(characterSRSstate.cards.length + 1)

    function addFormInputToDeck() {
        const deck: FlashCardDeck = characterSRSstate
        console.log(cardNumber)
        console.log("buttonPressed")
    }

    const newCardFrom = (): ReactElement => {

        return <section className="create">
            <form >
                <label>
                    cardNumber:
                    <input type="number" name="cardNumber"></input>
                </label>
                <label>
                    cardName:
                    <input type="text" name="cardName"></input>
                </label>
                <label>
                    frontSide:
                    <input type="text" name="frontSide"></input>
                </label>
                <label>
                    backSide:
                    <input type="text" name="backSide"></input>
                </label>
                <label>
                    primaryInfo:
                    <input type="text" name="primaryInfo"></input>
                </label>
                <label>
                    secondaryInfo:
                    <input type="text" name="secondaryInfo"></input>
                </label>
                <label>
                    notableCards:
                    <input type="text" name="notableCards"></input>
                </label>
            </form>
            <button type="button" onClick={
                () => addFormInputToDeck() }>
                {"x-here"}</button>
        </section>

    }


    return <section>
        <h1> Edit Deck </h1>
        {newCardFrom()}
    </section>
};

export default EditDeck;