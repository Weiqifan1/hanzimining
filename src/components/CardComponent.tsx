import classes from "./CardComponent.module.css"
import {PropsWithChildren, ReactElement, useEffect, useState} from "react";
import React from "react";
import {FlashCard} from "../interfaces/flashcard";
import { useDispatch, useSelector } from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import FlashCardStateManipulation from "../applogic/FlashcardDisplayLogic/FlashCardStateManipulation";
import {
    cardExistInDeck,
    getCardSimpleDisplayInfo,
    getFlashCard,
    getTagFromDeck
} from "../applogic/flashcardHelperFunctions/gettingFlashCards";
import CardDisplay from "../interfaces/cardDisplay";
import ScrollableTextArea from "./ScrollableTextAreaComponent";
import EditablePrimaryInfo from "./EditableTextAreaComponent";
import EditableTextAreaComponent from "./EditableTextAreaComponent";
import EditableTextArea from "./EditableTextAreaComponent";

const CardComponent: React.FC<{content: FlashCard, show: boolean, cardDisplay: CardDisplay, alwaysShow: boolean}> =
    (props: PropsWithChildren<{content: FlashCard, show: boolean, cardDisplay: CardDisplay, alwaysShow: boolean}>) => {

    const showData: boolean = props.show || props.alwaysShow
    const dispatch = useDispatch();
    const {editListItem} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )

    const [cardToDisplay, setCardToDisplay] = useState<number>(-1)
    const [showNotableChardButtons, setShowNotableChardButtons] = useState<boolean>(false)
    const [tagToDisplay, setTagToDisplay] = useState<String>("")
    const [showTagButtons, setShowTagButtons] = useState<boolean>(false)
    //const [localCard, setLocalCard] = useState<FlashCard>(props.content)

    // primary and secondary information
    const [tempPrimaryInfo, setTempPrimaryInfo] = useState(props.content.primaryInfo);

    useEffect(() => {
        setTempPrimaryInfo(props.content.primaryInfo);
    }, [props.content.secondaryInfo]);


    const handlePrimaryInfoInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            // handle the input change here, maybe with something like:
        setTempPrimaryInfo(event.target.value);
    };
    const [tempSecondaryInfo, setTempSecondaryInfo] = useState(props.content.secondaryInfo);
    useEffect(() => {
        setTempSecondaryInfo(props.content.secondaryInfo);
    }, [props.content.secondaryInfo]);

    const handleSecondaryInfoInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTempSecondaryInfo(event.target.value);
    };


    const content: FlashCard = props.content
    var tempReviewValue: number = props.content.repetitionValue
    var tempDateOfLastReview: string = props.content.dateOfLastReview
    var tempKeyword: string = props.content.frontSide
    var tempNotableCards: number[] = props.content.notableCards
    var tempCardName: string = props.content.cardName
    var tempTagsOnCard: string[] = props.content.tags

    const saveEdit = () => {
        var changesMade: boolean = false
        if (!(tempReviewValue === props.content.repetitionValue)) {changesMade = true}
        if (!(tempDateOfLastReview === props.content.dateOfLastReview)) {changesMade = true}
        if (!(tempKeyword === props.content.frontSide)) {changesMade = true}
        if (!(tempPrimaryInfo === props.content.primaryInfo)) {changesMade = true}
        if (!(tempSecondaryInfo === props.content.secondaryInfo)) {changesMade = true}
        if (!(tempNotableCards === props.content.notableCards)) {changesMade = true}
        if (!(tempCardName === props.content.cardName)) {changesMade = true}
        if (!(tempTagsOnCard === props.content.tags)) {changesMade = true}

        const newContentObject: FlashCard = {
            cardNumber: props.content.cardNumber,
            cardName: tempCardName,
            frontSide: tempKeyword,
            backSide: props.content.backSide,
            primaryInfo: tempPrimaryInfo,
            secondaryInfo: tempSecondaryInfo,
            notableCards: tempNotableCards,
            dateOfLastReview: tempDateOfLastReview,
            repetitionValue: tempReviewValue,
            repetitionHistory: props.content.repetitionHistory,
            tags: tempTagsOnCard
        }

        if (changesMade) {
            editListItem(newContentObject, characterSRSstate)
        }
    }

    const renderFrontSide = (): ReactElement => {
        const ordinaryFrontSide: ReactElement = <section> <li onInput={(e) =>
            tempKeyword = FlashCardStateManipulation.editStringvalue(e, props.content.frontSide)}
                                                              contentEditable="true">
            {content.frontSide}</li> </section>
        const audioFrontSide: ReactElement = <section> <li>audio</li> </section>
        if (!showData && props.cardDisplay.readAloud) {
            return audioFrontSide
        } else {
            return ordinaryFrontSide
        }
    }

    function selectText() {
        const input = (document.getElementById('audioid') as HTMLFormElement)//content.backSide;
        try {
            input.focus()
            input.select()
        }catch (e) {
            console.log("no audio id")
            console.log(e)
        }
    }

    const displayAudio = () => {
        if (props.cardDisplay.readAloud) {
            return <section>
                {displayAudioFieldWhenBacksideIsShown()}
                {displayAudioFieldWhenFrontsideIsShown()}
                {<button type="button" onClick={() => selectText()}>selectText</button>}
            </section>
        }else {
            return <section></section>
        }
    }

    const displayAudioFieldWhenBacksideIsShown = () => {
        const withAudio: ReactElement = <section>
            <textarea id="audioid" className={classes.audioText} >{props.content.backSide}</textarea>
        </section>
        if (!showData) {
            return withAudio
        }else {
            return <section></section>
        }
    }

    const displayAudioFieldWhenFrontsideIsShown = () => {
        const withAudio: ReactElement = <section>
            <textarea id="audioid" className={classes.audioText} >{props.content.backSide}</textarea>
        </section>
        if (showData) {
            return withAudio
        }else {
            return <section></section>
        }
    }

    const displayOriginalCharacter = (content: FlashCard): JSX.Element => {

        const testCard = ""
        const display: JSX.Element = <section>
            <ul>
                { showData ? <li className={classes.characterListElement}>{props.content.backSide}</li> : <li className={classes.characterListElement}></li>}
                {<section><br/></section>}
                { showData ? <li onInput={(e) =>
                    tempCardName = FlashCardStateManipulation.editStringvalue(e, props.content.cardName)}
                                   contentEditable="true">
                    {content.cardName}</li> : <li></li>}
                { showData ? <li>{content.cardNumber}</li> : <li></li>}
                { showData ? <li onInput={(e) =>
                    tempReviewValue = FlashCardStateManipulation.editNumberValue(e, props.content.repetitionValue)}
                                   contentEditable="true">
                    {content.repetitionValue}</li> : <li></li>}
                { showData ? <li onInput={(e) =>
                    tempDateOfLastReview = FlashCardStateManipulation.editStringvalue(e, props.content.dateOfLastReview)}
                                   contentEditable="true">
                    {content.dateOfLastReview}</li> : <li></li>}
                { showData ? <li>{content.repetitionHistory}</li> : <li></li>}
                {renderFrontSide()}
                { showData ? <li onInput={(e) =>
                    tempNotableCards = FlashCardStateManipulation.editNumberList(e, props.content.notableCards)}
                    contentEditable="true">
                    {FlashCardStateManipulation.displayNumberList(content.notableCards)}</li> : <li></li>}
                { showData ? <li onInput={(e) =>
                    tempTagsOnCard = FlashCardStateManipulation.editTagList(e, props.content.tags,
                        Object.keys(characterSRSstate.tags))}
                    contentEditable="true">
                    {FlashCardStateManipulation.displayStringList(content.tags)}</li>  : <li></li>}


                <li><EditableTextArea
                    showCard={showData}
                    showArea={props.cardDisplay.showPrimaryCardInfo}
                    info={tempPrimaryInfo}//props.content.primaryInfo
                    infoStringToDisplay={"primary info:"}
                    onInputChange={handlePrimaryInfoInputChange}
                /></li>

                <li><EditableTextArea
                    showCard={showData}
                    showArea={props.cardDisplay.showSecondaryCardInfo}
                    info={tempSecondaryInfo}//props.content.secondaryInfo
                    infoStringToDisplay={"secondary info:"}
                    onInputChange={handleSecondaryInfoInputChange}
                /></li>

            </ul>
        </section>
        return display
    }




        /*
        { props.show&&props.cardDisplay.showPrimaryCardInfo ? <li onInput={(e) =>
            tempPrimaryInfo = FlashCardStateManipulation.editStringvalue(e, props.content.primaryInfo)}
                           contentEditable="true">
            {convertStringToListOfStrings(content.primaryInfo, "primary info:")}</li> : <li></li>}

        { props.show&&props.cardDisplay.showSecondaryCardInfo ? <li onInput={(e) =>
            tempSecondaryInfo = FlashCardStateManipulation.editStringvalue(e, props.content.secondaryInfo)}
                                                contentEditable="true">
            {convertStringToListOfStrings(content.secondaryInfo, "secondary info:")}</li> : <li></li>}*/

    const displayNotableCard = (input: FlashCard): JSX.Element  => {
        const display: JSX.Element = <section>
            <ul>
                <li className={classes.characterListElement}>{input.backSide}</li>
                <li>{input.cardName}</li>
                <li>{input.cardNumber}</li>
                <li>{input.repetitionValue}</li>
                <li>{input.dateOfLastReview}</li>
                <li>{input.repetitionHistory}</li>
                <li>{input.frontSide}</li>
                <li>{FlashCardStateManipulation.displayNumberList(input.notableCards)}</li>
                <li>{props.cardDisplay.showPrimaryCardInfo ?
                        <ScrollableTextArea text={input.primaryInfo}/> : null}</li>
                <li>{props.cardDisplay.showSecondaryCardInfo ?
                        <ScrollableTextArea text={input.secondaryInfo}/> : null}</li>
            </ul>
        </section>
        return display
    }
//{props.cardDisplay.showPrimaryCardInfo ? <li>{input.primaryInfo}</li> : <li></li>}
/*

                {props.cardDisplay.showPrimaryCardInfo ? <li>{input.primaryInfo}</li> : <li></li>}s
                {props.cardDisplay.showSecondaryCardInfo ? <li>{input.secondaryInfo}</li> : <li></li>}

    const ScrollableTextArea = (text: string) => {
        return (
            <textarea
                value={text}
                style={{ width: '300px', height: '200px', overflowY: 'auto' }}
                readOnly
            />
        );
    };
*/

    const toggleShowNotableCards = () => {
        if (showNotableChardButtons) {
            setCardToDisplay(-1)
            setShowNotableChardButtons(!showNotableChardButtons)
        }
        setShowNotableChardButtons(!showNotableChardButtons)
    }

    const toggleShowTagButtons = () => {
        if (showTagButtons) {
            setTagToDisplay("")
            setShowTagButtons(!showTagButtons)
        }
        setShowTagButtons(!showTagButtons)
    }

    const displayNotableCardButtons = (): JSX.Element => {
        if (showNotableChardButtons) {
            const result: JSX.Element = <section>{generateListOfCardButtons(props.content.cardNumber)}</section>
            return result
        }else {
            return <section></section>
        }
    }
    const generateListOfCardButtons = (currentCard: number): JSX.Element => {
        let localCard = getFlashCard(currentCard, characterSRSstate)
        if (localCard.notableCards.length > 0) {
            const localList: JSX.Element[] = localCard.notableCards.map(x=>{
                return <button type="button" onClick={() => setCardToDisplay(x)}>
                    {getCardSimpleDisplayInfo(x, characterSRSstate)}</button>
            })
            const result: JSX.Element = <section><ul>
                <li><button type="button" onClick={() => setCardToDisplay(-1)}>{currentCard.toString()}</button></li>
                {
                    localList
                }</ul></section>
            return result
        }else {
            return <section><p>no cards</p></section>
        }
    }

    const displayTagButtons = (): JSX.Element => {
        if (showTagButtons) {
            const result: JSX.Element = <section>{generateListOfTagButtons(props.content.tags)}</section>
            return result
        }else {
            return <section></section>
        }
    }

    const generateListOfTagButtons = (tags: String[]): JSX.Element => {
        if (tags == null || !tags || tags.length == undefined || tags.length < 1) {
            return <section>No tags to show</section>
        }
        const localList: JSX.Element[] = tags.map(x=>{
            return <button type="button" onClick={
                () => setTagTextFunction(x) }>
                {x}</button>
        })
        const result: JSX.Element = <section><ul>
            {localList}</ul></section>
        return result
    }

    const setTagTextFunction = (tagName: String) => {
        setTagToDisplay(tagName)
    }

    const displayCard = (content: FlashCard): JSX.Element => {
        if (cardToDisplay > -1 && cardExistInDeck(cardToDisplay, characterSRSstate)) {
            const newCard: FlashCard = getFlashCard(cardToDisplay, characterSRSstate);
            return displayNotableCard(newCard)
        }else {
            return displayOriginalCharacter(content)
        }
    }

    const displayTag = (): JSX.Element => {
        const text: String = getTagFromDeck(tagToDisplay, characterSRSstate)
        if (text && text.length > 0) {
            return <section>{text}</section>
        }else {
            return <section></section>
        }
    }

    return <section>
        <button type="button" onClick={() => saveEdit()}>saveEditOn {content.cardNumber}</button>
        <button type="button" onClick={() => toggleShowNotableCards()}>showNotableCardButtons{showNotableChardButtons.valueOf()}</button>
        <button type="button" onClick={() => toggleShowTagButtons()}>showTagButtons{showTagButtons.valueOf()}</button>
        {displayNotableCardButtons()}
        {displayTagButtons()}
        {displayTag()}
        {displayAudio()}
        {displayCard(content)}
    </section>
}

export default CardComponent