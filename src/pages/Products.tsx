import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import DisplayTags from "../components/DisplayTags";
import {bindActionCreators} from "redux";
import {FlashCard, FlashCardDeck} from "../state/state-types/charactersrstypes";
import { characterSRSactionCreators, previousCharactersActionCreators, showSecondaryFlashcardInfoActionCreator,  State } from '../state/index';
import FlashCardStateManipulation from "../applogic/FlashcardDisplayLogic/FlashCardDisplayBoundary";
import React, {PropsWithChildren, useState} from "react";

const Products: React.FunctionComponent<IPage> = props => {

    const dispatch = useDispatch();
    const {addNewTag} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate: FlashCardDeck = useSelector(
        (state: State) => state.characterSRS
    )
    var tagTitle: string = ""
    var tagBody: string = ""
    const [displayTagsBoolean, setDisplayTagsBoolean] = useState<boolean>(true);

    const addToTagList = () => {
        if (tagTitle) {
            const cleanTagTittle: string = tagTitle.replace(/ /g,'').replace(/,/g, "").trim();
            if (cleanTagTittle.length > 0) {
                var currentDecktags = characterSRSstate.tags
                let typeMap: Record<string, string> = {}

                let mykeys: string[] = Array.from(Object.keys(currentDecktags))
                let myvalues: string[] = Array.from(Object.values(currentDecktags))

                var num:number = 0
                for(num=0;num < mykeys.length;num++) {
                    typeMap[mykeys[num]]  = myvalues[num]
                }
                typeMap[tagTitle] = tagBody;

                const updatedDeck: FlashCardDeck = {
                    ...characterSRSstate, tags: typeMap
                }
                addNewTag(typeMap, characterSRSstate)
            }
        }
    }

    const displayTags = (deckState: FlashCardDeck, showState: boolean) => {
        if (showState) {
            return <section>
                <DisplayTags content={deckState}/>
            </section>
        }else {
            return <section><p>No tags shown</p></section>
        }
    }

    const toggleDisplayTags = () => {
        const test = "hello"
        setDisplayTagsBoolean(!displayTagsBoolean)
    }

    return (
    <section>
        <h1> The Products page </h1>
        <button id="createtags" type="button" onClick={addToTagList}>createNewTag</button>
        <button id="showtags" type="button" onClick={toggleDisplayTags}>displaytags:{displayTagsBoolean.valueOf()}</button>
        <ul>
            <li onInput={(e) =>
                tagTitle = FlashCardStateManipulation.editStringvalue(e, "tagTitle")}
                contentEditable="true">
                "tagTitle"</li>
            <li onInput={(e) =>
                tagBody = FlashCardStateManipulation.editStringvalue(e, "tagBody")}
                contentEditable="true">
                "tagBody"</li>
        </ul>
        {displayTags(characterSRSstate, displayTagsBoolean)}
    </section>
    );

};

export default Products;