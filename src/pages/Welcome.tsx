
import React, {ReactElement, useEffect, useRef, useState} from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import {FlashCardDeck, FlashCard} from "../state/state-types/charactersrstypes";
import characterSRSlogic from "../interfaces/characterSRSlogic";
import {calculateNextCharacter} from "../applogic/characterSRSlogic/calculateCharacterSRSorder";
import TodoItem from "../components/TodoItem";

const Welcome: React.FunctionComponent<IPage> = props => {

    const addCharactersReference = useRef<HTMLInputElement | null>(null);
    useEffect(()=>{addCharactersReference.current?.focus();},[])

    var currentContent: FlashCard;
    var previousCharacters: FlashCard[];
    //var displayPreviousCharacters: ReactElement = <p></p>
    const [showCharacterSRSContentElement, setShowCharacterSRSContentElement] = useState<boolean>(false)
    const [addMoreCharactersTextField, setAddMoreCharactersTextField] = useState<string>("");

    const dispatch = useDispatch();
    const {editListItemInBulk} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )


    const todoPageContent = (): ReactElement => {
        //previousCharacters = characterSRSstate.previousCharacters
        let contentOrNotEnough;
        const srslogic: characterSRSlogic = {
            characterSRS: characterSRSstate,
            currentContent: undefined,
            mostRecentContentObjects: [], //characterSRSstate.previousCardsViewed,
            notEnoughCharacters: false
        }
        const srscalculationResult: characterSRSlogic = calculateNextCharacter(srslogic)
        if (srscalculationResult.notEnoughCharacters) {
            contentOrNotEnough = <p>not enough characters. add more to deck</p>
        }else {
            if (srscalculationResult.currentContent) {
                //save the calculated Content object to a component variable
                currentContent = srscalculationResult.currentContent
                //previousCharacters = srscalculationResult.characterSRS.previousCharacters ? srscalculationResult.characterSRS.previousCharacters : []
                contentOrNotEnough = <TodoItem content={srscalculationResult.currentContent} show={showCharacterSRSContentElement}/>
            }else {
                contentOrNotEnough = <p>Content type is undefined!!! this is an error</p>
            }
        }
        previousCharacters = []//characterSRSstate.previousCardsViewed//displayPreviousCharacters = displayMostRecentCharacters(characterSRSstate.previousCharacters)
        return contentOrNotEnough
    }


    const displayNumberOfCharacters = (): ReactElement => {
        const charactersYouWantToAdd: number = Number(addMoreCharactersTextField) ? Number(addMoreCharactersTextField) : 0
        const finalCharValue: number = getNewFinalCharValue(charactersYouWantToAdd, characterSRSstate.cards)
        const allCharacters: number = characterSRSstate.cards.filter(eachContent => {
            return eachContent.repetitionValue > 0
        }).length
        return <p>highest character: {finalCharValue} all characters: {allCharacters}</p>
    }
    //used to either add new character or delete old ones (remove it from the deck)
    const getCharsToEdit = (charactersToAdd: number, zeroToDeleteElseAddNew: number, allCharacter: FlashCard[]): FlashCard[] => {
        let charsToAdd: FlashCard[];
        if (zeroToDeleteElseAddNew > 0) {
            const sortedCharactersLowestToHighest: FlashCard[] = characterSRSstate.cards.sort(function sort(a: FlashCard, b: FlashCard){if (a.cardNumber < b.cardNumber) {return -1; }if (a.cardNumber > b.cardNumber) {return 1;}return 0;})
            const onlyCharactersWithReviewValueAt0: FlashCard[] = sortedCharactersLowestToHighest.filter(eachContent => eachContent.repetitionValue === 0)
            charsToAdd = onlyCharactersWithReviewValueAt0.slice(0,charactersToAdd).map(eachContent => {
                const updatedContent: FlashCard = {...eachContent, repetitionValue: zeroToDeleteElseAddNew}
                return updatedContent
            })
        }else {
            const sortedCharactersHighestToLowest: FlashCard[] = characterSRSstate.cards.sort(function sortReverse(a: FlashCard, b: FlashCard){if (a.cardNumber > b.cardNumber) {return -1; }if (a.cardNumber < b.cardNumber) {return 1;}return 0;})
            const charactersWithReviewValueAbove0ReverseSorted: FlashCard[] = sortedCharactersHighestToLowest.filter(eachContent => eachContent.repetitionValue > 0)
            charsToAdd = charactersWithReviewValueAbove0ReverseSorted.slice(0,charactersToAdd).map(eachContent => {
                const updatedContent: FlashCard = {...eachContent, repetitionValue: zeroToDeleteElseAddNew}
                return updatedContent
            })
        }
        return charsToAdd
    }
    const getNewFinalCharValue = (charactersToAdd: number, allCharacter: FlashCard[]): number => {
        const sortedCharactersLowestToHighest: FlashCard[] = characterSRSstate.cards.sort(function sort(a: FlashCard, b: FlashCard){if (a.cardNumber < b.cardNumber) {return -1; }if (a.cardNumber > b.cardNumber) {return 1;}return 0;})
        const onlyCharactersWithReviewValueAt0: FlashCard[] = sortedCharactersLowestToHighest.filter(eachContent => eachContent.repetitionValue === 0)
        const charsToAdd: FlashCard[] = onlyCharactersWithReviewValueAt0.slice(0,charactersToAdd)
        const sortedCharsReviewValueAbove0WithNewChars: FlashCard[] = sortedCharactersLowestToHighest.filter(eachContent => eachContent.repetitionValue > 0).concat(charsToAdd)
        const sortetReverse: FlashCard[] = sortedCharsReviewValueAbove0WithNewChars.sort(function sortReverse(a: FlashCard, b: FlashCard){if (a.cardNumber > b.cardNumber) {return -1; }if (a.cardNumber < b.cardNumber) {return 1;}return 0;})
        return sortetReverse[0] ? sortetReverse[0].cardNumber : 0
    }


    const deleteANumberOfCharacters = () => {
        const charactersYouWantToAdd: number = Number(addMoreCharactersTextField) ? Number(addMoreCharactersTextField) : 0
        const charactersToDelete: FlashCard[] = getCharsToEdit(charactersYouWantToAdd, 0, characterSRSstate.cards)
        setAddMoreCharactersTextField("")
        editListItemInBulk(charactersToDelete, characterSRSstate)
    }
    const addANumberOfCharacters = () => {
        const charactersYouWantToAdd: number = Number(addMoreCharactersTextField) ? Number(addMoreCharactersTextField) : 0
        const newCharactersToBeAdded: FlashCard[] = getCharsToEdit(charactersYouWantToAdd, 1, characterSRSstate.cards)
        setAddMoreCharactersTextField("")
        editListItemInBulk(newCharactersToBeAdded, characterSRSstate)
    }
    const changeOnNewCharacterInputField = (e: React.FormEvent<HTMLInputElement>) => {
        setAddMoreCharactersTextField(e.currentTarget.value)
        console.log(addMoreCharactersTextField);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key.toString())
        if (event.key.toString() === ' ' || event.key.toString() === "ArrowRight") {
            setAddMoreCharactersTextField("")
            if (showCharacterSRSContentElement) {
                increaseReviewValueWithOne()
            }else {
                changeShowCharacter()
            }
        }else if(event.key.toString() === "ArrowLeft"){
            setAddMoreCharactersTextField("")
            if (showCharacterSRSContentElement) {
                decreaseReviewValueWithOne()
            }else {
                changeShowCharacter()
            }
        }
    };


    const addCharactersPageContent = (): ReactElement => {
        return <section>
            <button type="button" onClick={addANumberOfCharacters}>addNewChars</button>
            <input ref={addCharactersReference} type="text" onKeyDown={handleKeyDown} value={addMoreCharactersTextField} id="addMoreCharacters" placeholder="addCharacters" onInput={changeOnNewCharacterInputField}></input>
            <button type="button" onClick={deleteANumberOfCharacters}>deleteLatestCharacters</button>
        </section>
    }


    const changeShowCharacter = () => {
        setShowCharacterSRSContentElement(true);
    }
    const increaseReviewValueWithFive = () => {
        respondToAPresentedCharacterSRSObject(5)
    }
    const increaseReviewValueWithOne = () => {
        respondToAPresentedCharacterSRSObject(1)
    }
    const decreaseReviewValueWithFive = () => {
        respondToAPresentedCharacterSRSObject(-5)
    }
    const decreaseReviewValueWithOne = () => {
        respondToAPresentedCharacterSRSObject(-1)
    }
    const respondToAPresentedCharacterSRSObject = (increaseOrDecreaseReviewValue: number) => {
        const current: FlashCard = currentContent
        const updatedPrevious: FlashCard[] = previousCharacters ? [current, ...previousCharacters] : [current]
        const updatedDate: string = new Date().toISOString().slice(0,10)
        const updatedReviewValue: number = current.repetitionValue+increaseOrDecreaseReviewValue > 0 ? current.repetitionValue+increaseOrDecreaseReviewValue : 1

        const updatedContent: FlashCard = {...current, repetitionValue: updatedReviewValue, dateOfLastReview: updatedDate}
        const updatedCharacterSRS: FlashCardDeck = {...characterSRSstate}
        setShowCharacterSRSContentElement(false)
        editListItemInBulk([updatedContent], updatedCharacterSRS)
    }



    const buttonsToShowAndHandleCharacterSRSContentElement = (): ReactElement => {
        let buttonsToReturn: ReactElement;
        if (!showCharacterSRSContentElement) {
            buttonsToReturn =  <section>
                <button type="button" onClick={changeShowCharacter}>showCharacter</button>
            </section>
        }else {
            buttonsToReturn = <section>
                <button id="decreaseByFive" type="button" onClick={decreaseReviewValueWithFive}>reviewValue-5</button>
                <button id="decreaseByOne" type="button" onClick={decreaseReviewValueWithOne}>reviewValue-1</button>
                <button id="increaseByOne" type="button" onClick={increaseReviewValueWithOne}>reviewValue+1</button>
                <button id="increaseByOne" type="button" onClick={increaseReviewValueWithFive}>reviewValue+5</button>
            </section>
        }
        return buttonsToReturn
    }

    const displayMostRecentCharacters = (listToDisplay: FlashCard[]): ReactElement => {
        const mostRecentCharacter: FlashCard[] = listToDisplay ? listToDisplay : []
        let resultString: string;
        if (!mostRecentCharacter || mostRecentCharacter.length === 0) {
            resultString = "No previous characters yet"
        }else {
            const shortList: FlashCard[] = mostRecentCharacter.length<5 ? mostRecentCharacter : mostRecentCharacter.slice(0,5)
            const stringList: string = shortList.map(each => each.backSide+each.cardNumber).join()
            resultString = "previous: " + stringList + " totalRepetitions: " + mostRecentCharacter.length
        }
        return <section>{resultString}</section>
    }

    //{displayMostRecentCharacters()}
    return <section>
        <h1> The Welcome page </h1>
        {displayNumberOfCharacters()}
        {addCharactersPageContent()}
        {buttonsToShowAndHandleCharacterSRSContentElement()}
        {todoPageContent()}
    </section>

};

export default Welcome;