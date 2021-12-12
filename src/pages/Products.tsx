import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import DisplayTags from "../components/DisplayTags";
import {bindActionCreators} from "redux";
import {FlashCard, FlashCardDeck} from "../state/state-types/charactersrstypes";
import { characterSRSactionCreators, previousCharactersActionCreators, showSecondaryFlashcardInfoActionCreator,  State } from '../state/index';
import FlashCardStateManipulation from "../applogic/FlashcardDisplayLogic/FlashCardStateManipulation";
import React, {FormEvent, PropsWithChildren, useState} from "react";

const Products: React.FunctionComponent<IPage> = props => {

    const dispatch = useDispatch();
    const {addNewTag, removeTag} = bindActionCreators(characterSRSactionCreators, dispatch)
    //const {removeTag} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate: FlashCardDeck = useSelector(
        (state: State) => state.characterSRS
    )
    var tagTitle: string = ""
    var tagBody: string = ""
    const [displayTagsBoolean, setDisplayTagsBoolean] = useState<boolean>(true);
    const [fname, setFname] = useState("")
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {    setFname(e.currentTarget.value)  }


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

    const localRemoveTag = () => {
        let tagTitle: string = fname
        let currentDecktags: Record<string, string> = characterSRSstate.tags
        let mykeys: string[] = Array.from(Object.keys(currentDecktags))
        let myvalues: string[] = Array.from(Object.values(currentDecktags))
        if (mykeys.includes(tagTitle)) {
            let index: number = mykeys.indexOf(tagTitle)
            let relevantvalue = myvalues[index]
            let newKeys: string[] = mykeys.filter(x=>x !== tagTitle)
            let newValues: string[] = myvalues.filter(x=> x !== relevantvalue)

            let typeMap: Record<string, string> = {}
            var num:number = 0
            for(num=0;num < newKeys.length;num++) {
                typeMap[newKeys[num]]  = newValues[num]
            }
            removeTag(typeMap, characterSRSstate)
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
        <button id="removeTag" type="button" onClick={localRemoveTag}>removeTag:{fname.valueOf()}</button>
        <input type="tagToRemove" value={fname} onChange={handleChange} />
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