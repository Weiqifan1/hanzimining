import React, {ReactElement, useEffect, useRef, useState} from "react";
import IPage from "../interfaces/page";
import "./EditCard.css"

import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators,
    State } from '../state/index';
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import {FlashCard} from "../interfaces/flashcard";
import {replaceDeckNameAndInfo,
} from "../applogic/pageHelpers/createDeckHelper";

const EditDeck: React.FunctionComponent<IPage> = props => {
    const addCharactersReference = useRef<HTMLInputElement | null>(null);
    useEffect(()=>{addCharactersReference.current?.focus();},[])
    const dispatch = useDispatch();
    //edit deck
    const {createDeck} = bindActionCreators(characterSRSactionCreators, dispatch)
    const {addNewCardsToDeck} = bindActionCreators(characterSRSactionCreators, dispatch)
    //deleteOrEditCardOrder
    const {deleteOrEditCardOrder} = bindActionCreators(characterSRSactionCreators, dispatch)
    //create and read SRS
    const {createSRSobject} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate: FlashCardDeck = useSelector(
        (state: State) => state.characterSRS
    )
    //create deck
    const [localdeckName, setLocaldeckName] = useState<string>("")
    const [localdeckInfo, setLocaldeckInfo] = useState<string>("")

    //delete or edit card
    const [localdeleteCards, setLocaldeleteCards] = useState<string>("")
    const [localeditCards, setLocaleditCards] = useState<string>("")

    //create new card
    const [localcardNumber, setLocalcardNumber] = useState<number>(characterSRSstate.cards.length + 1)
    const [localcardName, setLocalcardName] = useState<string>("")
    const [localfrontSide, setLocalfrontSide] = useState<string>("")
    const [localbackSide, setLocalbackSide] = useState<string>("")
    const [localprimaryInfo, setLocalprimaryInfo] = useState<string>("")
    const [localsecondaryInfo, setLocalsecondaryInfo] = useState<string>("")
    const [localnotableCards, setLocalnotableCards] = useState<string>("")
    const [localtags, setLocaltags] = useState<string>("")

    function editAndDeleteCardsButtonFunc() {
        const deleteInput: string = localdeleteCards
        const editInput: string = localeditCards
        if (deleteInput.trim().length == 0 && editInput.trim().length > 0) {
            deleteOrEditCardOrder("", editInput, characterSRSstate)
        }else if (editInput.trim().length == 0 && deleteInput.trim().length > 0) {
            deleteOrEditCardOrder(deleteInput, "", characterSRSstate)
        }
    }

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

    function changeDeckNameAndInfo() {
        const deck: FlashCardDeck = characterSRSstate
        const card: FlashCard[] = deck.cards
        const updatedDeck: FlashCardDeck = replaceDeckNameAndInfo(characterSRSstate, localdeckName, localdeckInfo)
        createSRSobject(updatedDeck)
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
            notableCards: [],
            dateOfLastReview: "0001-01-01",
            repetitionValue: 0,
            repetitionHistory: [],
            tags: generateTags(localtags, deck)
        }
        addNewCardsToDeck([newCard], characterSRSstate)
    }

    function clearFormInputToDeck() {
        setLocalcardNumber(characterSRSstate.cards.length + 1)
        setLocalcardName("")
        setLocalfrontSide("")
        setLocalbackSide("")
        setLocalprimaryInfo("")
        setLocalsecondaryInfo("")
        setLocalnotableCards("")
        setLocaltags("")
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
            <button type="button" onClick={
                () => changeDeckNameAndInfo() }>
                {"change deck name and info"}</button>
        </section>
    }

    const editAndDeleteCards = (): ReactElement => {
        return <section className="create">
            <form>
                <label>
                    deleteCards:
                    <input type="text" name="deleteCards" value={localdeleteCards} onChange={deleteCardsOnChange}></input>
                </label>
                <label>
                    editCards:
                    <input type="text" name="editCards" value={localeditCards} onChange={editCardsOnChange}></input>
                </label>
            </form>
            <button type="button" onClick={
                () => editAndDeleteCardsButtonFunc() }>
                {"delete or edit cards"}</button>
        </section>
    }

    function deleteCardsOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLocaleditCards("")
        setLocaldeleteCards(e.currentTarget.value)
    }

    function editCardsOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLocaldeleteCards("")
        setLocaleditCards(e.currentTarget.value)
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
            <br/>
            <br/>
            <button type="button" onClick={
                () => clearFormInputToDeck() }>
                {"clear"}</button>

        </section>
    }

    return <section>
        <h1>Create Deck</h1>
        {createDeckReact()}
        <h1>Delete or edit cards</h1>
        {editAndDeleteCards()}
        <h1>Add card</h1>
        {newCardFrom()}
    </section>
};

export default EditDeck;