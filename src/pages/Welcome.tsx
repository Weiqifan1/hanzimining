
import React, {ReactElement, useEffect, useRef, useState} from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import {CharactersSRS, Content} from "../state/state-types/charactersrstypes";
import characterSRSlogic from "../interfaces/characterSRSlogic";
import {calculateNextCharacter} from "../applogic/characterSRSlogic/calculateCharacterSRSorder";
import TodoItem from "../components/TodoItem";

const Welcome: React.FunctionComponent<IPage> = props => {

    const addCharactersReference = useRef<HTMLInputElement | null>(null);
    useEffect(()=>{addCharactersReference.current?.focus();},[])

    var currentContent: Content;
    var previousCharacters: Content[];
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
            mostRecentContentObjects: characterSRSstate.previousCharacters,
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
        previousCharacters = characterSRSstate.previousCharacters//displayPreviousCharacters = displayMostRecentCharacters(characterSRSstate.previousCharacters)
        return contentOrNotEnough
    }


    const displayNumberOfCharacters = (): ReactElement => {
        const charactersYouWantToAdd: number = Number(addMoreCharactersTextField) ? Number(addMoreCharactersTextField) : 0
        const finalCharValue: number = getNewFinalCharValue(charactersYouWantToAdd, characterSRSstate.content)
        const allCharacters: number = characterSRSstate.content.filter(eachContent => {
            return eachContent.reviewValue > 0
        }).length
        return <p>highest character: {finalCharValue} all characters: {allCharacters}</p>
    }
    //used to either add new character or delete old ones (remove it from the deck)
    const getCharsToEdit = (charactersToAdd: number, zeroToDeleteElseAddNew: number, allCharacter: Content[]): Content[] => {
        let charsToAdd: Content[];
        if (zeroToDeleteElseAddNew > 0) {
            const sortedCharactersLowestToHighest: Content[] = characterSRSstate.content.sort(function sort(a: Content, b: Content){if (a.number < b.number) {return -1; }if (a.number > b.number) {return 1;}return 0;})
            const onlyCharactersWithReviewValueAt0: Content[] = sortedCharactersLowestToHighest.filter(eachContent => eachContent.reviewValue === 0)
            charsToAdd = onlyCharactersWithReviewValueAt0.slice(0,charactersToAdd).map(eachContent => {
                const updatedContent: Content = {...eachContent, reviewValue: zeroToDeleteElseAddNew}
                return updatedContent
            })
        }else {
            const sortedCharactersHighestToLowest: Content[] = characterSRSstate.content.sort(function sortReverse(a: Content, b: Content){if (a.number > b.number) {return -1; }if (a.number < b.number) {return 1;}return 0;})
            const charactersWithReviewValueAbove0ReverseSorted: Content[] = sortedCharactersHighestToLowest.filter(eachContent => eachContent.reviewValue > 0)
            charsToAdd = charactersWithReviewValueAbove0ReverseSorted.slice(0,charactersToAdd).map(eachContent => {
                const updatedContent: Content = {...eachContent, reviewValue: zeroToDeleteElseAddNew}
                return updatedContent
            })
        }
        return charsToAdd
    }
    const getNewFinalCharValue = (charactersToAdd: number, allCharacter: Content[]): number => {
        const sortedCharactersLowestToHighest: Content[] = characterSRSstate.content.sort(function sort(a: Content, b: Content){if (a.number < b.number) {return -1; }if (a.number > b.number) {return 1;}return 0;})
        const onlyCharactersWithReviewValueAt0: Content[] = sortedCharactersLowestToHighest.filter(eachContent => eachContent.reviewValue === 0)
        const charsToAdd: Content[] = onlyCharactersWithReviewValueAt0.slice(0,charactersToAdd)
        const sortedCharsReviewValueAbove0WithNewChars: Content[] = sortedCharactersLowestToHighest.filter(eachContent => eachContent.reviewValue > 0).concat(charsToAdd)
        const sortetReverse: Content[] = sortedCharsReviewValueAbove0WithNewChars.sort(function sortReverse(a: Content, b: Content){if (a.number > b.number) {return -1; }if (a.number < b.number) {return 1;}return 0;})
        return sortetReverse[0] ? sortetReverse[0].number : 0
    }


    const deleteANumberOfCharacters = () => {
        const charactersYouWantToAdd: number = Number(addMoreCharactersTextField) ? Number(addMoreCharactersTextField) : 0
        const charactersToDelete: Content[] = getCharsToEdit(charactersYouWantToAdd, 0, characterSRSstate.content)
        setAddMoreCharactersTextField("")
        editListItemInBulk(charactersToDelete, characterSRSstate)
    }
    const addANumberOfCharacters = () => {
        const charactersYouWantToAdd: number = Number(addMoreCharactersTextField) ? Number(addMoreCharactersTextField) : 0
        const newCharactersToBeAdded: Content[] = getCharsToEdit(charactersYouWantToAdd, 1, characterSRSstate.content)
        setAddMoreCharactersTextField("")
        editListItemInBulk(newCharactersToBeAdded, characterSRSstate)
    }
    const changeOnNewCharacterInputField = (e: React.FormEvent<HTMLInputElement>) => {
        setAddMoreCharactersTextField(e.currentTarget.value)
        console.log(addMoreCharactersTextField);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
    const increaseReviewValueWithOne = () => {
        respondToAPresentedCharacterSRSObject(1)
    }
    const decreaseReviewValueWithOne = () => {
        respondToAPresentedCharacterSRSObject(-1)
    }
    const respondToAPresentedCharacterSRSObject = (increaseOrDecreaseReviewValue: number) => {
        const current: Content = currentContent
        const updatedPrevious: Content[] = previousCharacters ? [current, ...previousCharacters] : [current]
        const updatedDate: string = new Date().toISOString().slice(0,10)
        const updatedReviewValue: number = current.reviewValue+increaseOrDecreaseReviewValue > 0 ? current.reviewValue+increaseOrDecreaseReviewValue : 1

        const updatedContent: Content = {...current, reviewValue: updatedReviewValue, dateOfLastReview: updatedDate}
        const updatedCharacterSRS: CharactersSRS = {...characterSRSstate, previousCharacters: updatedPrevious}
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
                <button id="decreaseByOne" type="button" onClick={decreaseReviewValueWithOne}>reviewValue-1</button>
                <button id="increaseByOne" type="button" onClick={increaseReviewValueWithOne}>reviewValue+1</button>
            </section>
        }
        return buttonsToReturn
    }

    const displayMostRecentCharacters = (listToDisplay: Content[]): ReactElement => {
        const mostRecentCharacter: Content[] = listToDisplay ? listToDisplay : []
        let resultString: string;
        if (!mostRecentCharacter || mostRecentCharacter.length === 0) {
            resultString = "No previous characters yet"
        }else {
            const charactersList: string[] = mostRecentCharacter.map(each => each.character)
            resultString = "previous: " + charactersList.join()
        }
        return <section>{resultString}</section>
    }

    return <section>
        <h1> The Welcome page </h1>
        {displayMostRecentCharacters(characterSRSstate.previousCharacters)}
        {displayNumberOfCharacters()}
        {addCharactersPageContent()}
        {buttonsToShowAndHandleCharacterSRSContentElement()}
        {todoPageContent()}
    </section>

};

export default Welcome;