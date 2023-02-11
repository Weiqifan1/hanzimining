import React, {ReactElement, useEffect, useRef, useState} from "react";
import IPage from "../interfaces/page";
import "./EditCard.css"

import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators,
    State } from '../state/index';
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import {FlashCard} from "../interfaces/flashcard";
import tags from "./Tags";

const EditDeck: React.FunctionComponent<IPage> = props => {
    const addCharactersReference = useRef<HTMLInputElement | null>(null);
    useEffect(()=>{addCharactersReference.current?.focus();},[])

    const dispatch = useDispatch();
    const {createDeck} = bindActionCreators(characterSRSactionCreators, dispatch)
    const {addNewCardsToDeck} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate: FlashCardDeck = useSelector(
        (state: State) => state.characterSRS
    )
    //create deck
    const [localdeckName, setLocaldeckName] = useState<string>("")
    const [localdeckInfo, setLocaldeckInfo] = useState<string>("")

    //create card
    const [localcardNumber, setLocalcardNumber] = useState<number>(characterSRSstate.cards.length + 1)
    const [localcardName, setLocalcardName] = useState<string>("")
    const [localfrontSide, setLocalfrontSide] = useState<string>("")
    const [localbackSide, setLocalbackSide] = useState<string>("")
    const [localprimaryInfo, setLocalprimaryInfo] = useState<string>("")
    const [localsecondaryInfo, setLocalsecondaryInfo] = useState<string>("")
    const [localnotableCards, setLocalnotableCards] = useState<string>("")
    const [localtags, setLocaltags] = useState<string>("")

    function createDeckGetData() {
        const newdeck: FlashCardDeck = {
            deckName: localdeckName,
            deckInfo: localdeckInfo,
            settings: {},
            tags: {},
            cards: []
        }
        createDeck([], newdeck)
    }

    function addFormInputToDeck() {
        const deck: FlashCardDeck = characterSRSstate

        const newCard: FlashCard = {
            cardNumber: localcardNumber,
            cardName: localcardName,
            frontSide: localfrontSide,
            backSide: localbackSide,
            primaryInfo: localprimaryInfo,
            secondaryInfo: localsecondaryInfo,
            notableCards: [],//generateNotableCards(localnotableCards, deck),
            dateOfLastReview: "0001-01-01",
            repetitionValue: 0,
            repetitionHistory: [],
            tags: generateTags(localtags, deck)
        }

        addNewCardsToDeck([newCard], characterSRSstate)
    }

    const generateTags = (input: string, deck: FlashCardDeck): string[] => {
        const res: string[] = input.split(/(\s+)/).map(each => each.trim())
        //remove impossibleCards
        const nestedCardTags: string[][] = deck.cards.map(each => each.tags)
        const cardTags: string[] = nestedCardTags.reduce((accumulator, value) => accumulator.concat(value), [])
        const deckTags: string[] = cardTags.concat(Object.keys(deck.tags))
        const resWithoutImpossibleNums: string[] = res.filter(each => deckTags.indexOf(each) > -1)
        return resWithoutImpossibleNums
    }

    const generateNotableCards = (input: string, deck: FlashCardDeck): number[] => {
        const res: string[] = localnotableCards.split(/(\s+)/).map(each => each.trim())
        //remove impossibleCards
        const resWithoutNonNums: number[] = res.filter(each => !isNaN(+each)).map(eachNum => +eachNum)
        const deckCards: number[] = deck.cards.map(each => each.cardNumber)
        const resWithoutImpossibleNums: number[] = resWithoutNonNums.filter(each => deckCards.indexOf(each) > -1)
        return resWithoutImpossibleNums
    }

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // No longer need to cast to any - hooray for react!
        const newStr: string = e.target.value
        const newNumber: number = +newStr
        setLocalcardNumber(newNumber);
    }

    const createDeckReact = (): ReactElement => {
        return <section className="create">
            <form>
                <label>
                    deckName:
                    <input type="text" name="deckName" value={localdeckName} onChange={e => setLocaldeckName(e.currentTarget.value)}></input>
                </label>
                <label>
                    deckInfo:
                    <input type="text" name="deckInfo" value={localdeckInfo} onChange={e => setLocaldeckInfo(e.currentTarget.value)}></input>
                </label>
            </form>
            <button type="button" onClick={
                () => createDeckGetData() }>
                {"create deck"}</button>
        </section>
    }

    const newCardFrom = (): ReactElement => {

        return <section className="create">
            <form >
                <label>
                    cardNumber:
                    <input type="number" name="cardNumber" value={localcardNumber} onChange={handleCardNumberChange}></input>
                </label>
                <label>
                    cardName:
                    <input type="text" name="cardName" value={localcardName} onChange={e => setLocalcardName(e.currentTarget.value)}></input>
                </label>
                <label>
                    frontSide:
                    <input type="text" name="frontSide" value={localfrontSide} onChange={e => setLocalfrontSide(e.currentTarget.value)}></input>
                </label>
                <label>
                    backSide:
                    <input type="text" name="backSide" value={localbackSide} onChange={e => setLocalbackSide(e.currentTarget.value)}></input>
                </label>
                <label>
                    primaryInfo:
                    <input type="text" name="primaryInfo" value={localprimaryInfo} onChange={e => setLocalprimaryInfo(e.currentTarget.value)}></input>
                </label>
                <label>
                    secondaryInfo:
                    <input type="text" name="secondaryInfo" value={localsecondaryInfo} onChange={e => setLocalsecondaryInfo(e.currentTarget.value)}></input>
                </label>
                <label>
                    tags:
                    <input type="text" name="tags" value={localtags} onChange={e => setLocaltags(e.currentTarget.value)}></input>
                </label>
            </form>
            <button type="button" onClick={
                () => addFormInputToDeck() }>
                {"add card"}</button>
        </section>
    }

    //add create deck code
    //add delete card code
    //add change card number code -- it should be possible to change the place of a card in the deck
    return <section>
        <h1>Create Deck</h1>
        {createDeckReact()}
        <h1>Edit Deck</h1>
        {newCardFrom()}
    </section>
};

export default EditDeck;