import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import DisplayTags from "../components/DisplayTags";
import {bindActionCreators} from "redux";
import {FlashCardDeck} from "../state/state-types/charactersrstypes";
import { characterSRSactionCreators, previousCharactersActionCreators, showSecondaryFlashcardInfoActionCreator,  State } from '../state/index';
import FlashCardStateManipulation from "../applogic/FlashcardDisplayLogic/FlashCardDisplayBoundary";
import {useState} from "react";

const Products: React.FunctionComponent<IPage> = props => {

    //const [tagTitle, setTagTitle] = useState<string>("");
    //const [tagBody, setTagBody] = useState<string>("");

    const dispatch = useDispatch();
    const {createSRSobject} = bindActionCreators(characterSRSactionCreators, dispatch)
    const characterSRSstate: FlashCardDeck = useSelector(
        (state: State) => state.characterSRS
    )
    var tagTitle: string = ""
    var tagBody: string = ""
    //var currentCharacterSRSstate = characterSRSstate
    const [currentCharacterSRSstate, setCurrentCharacterSRSstate] = useState<FlashCardDeck>(characterSRSstate);

    const addToTagList = () => {
        if (tagTitle) {
            const cleanTagTittle: string = tagTitle.replace(/ /g,'').replace(/,/g, "").trim();
            if (cleanTagTittle.length > 0) {
                var currentDecktags = characterSRSstate.tags
                let typeMap = new Map()

                let mykeys = Array.from(Object.keys(currentDecktags))
                let myvalues = Array.from(Object.values(currentDecktags))

                var num:number = 0
                for(num=0;num < mykeys.length;num++) {
                    typeMap.set(mykeys[num], myvalues[num])
                }
                typeMap.set(tagTitle, tagBody);

                const updatedDeck: FlashCardDeck = {
                    ...characterSRSstate, tags: typeMap
                }
                createSRSobject(updatedDeck)
                setCurrentCharacterSRSstate(updatedDeck)//currentCharacterSRSstate = updatedDeck
            }
        }
    }

    return (
    <section>
        <h1> The Products page </h1>
        <button id="decreaseByFive" type="button" onClick={addToTagList}>createNewTag</button>
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
        <DisplayTags data={currentCharacterSRSstate}/>
    </section>
    );

};

export default Products;