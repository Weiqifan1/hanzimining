import {FlashCard, FlashCardDeck} from "../state/state-types/charactersrstypes";
import {PropsWithChildren} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';

const DisplayTagItem: React.FC<{TagItem: string[]}> =
    (props: PropsWithChildren<{TagItem: string[]}>) => {//PropsWithChildren<{content: Content}>
//<p>{eachMap[0]}: <br/> {eachMap[1]}</p>

        const dispatch = useDispatch();
        const {editSingleTag} = bindActionCreators(characterSRSactionCreators, dispatch)
        const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
        )

        var tempTagTitle: string = props.TagItem[0]
        var tempTagBody: string = props.TagItem[1]

        const saveEdit = () => {
            var changesMade: boolean = false
            if (!(tempTagTitle === props.TagItem[0])) {changesMade = true}
            if (!(tempTagBody === props.TagItem[1])) {changesMade = true}
            const cleanTitle: string = cleanTagTitle(tempTagTitle)
            const oldTagTitle: string = props.TagItem[0]
            const newTag: string[] = [cleanTitle, tempTagBody]
                //TDOD: create an action that can save a content object

            if (changesMade && cleanTitle.length > 0) {
              editSingleTag(newTag, oldTagTitle, characterSRSstate)
            }
        }

        const cleanTagTitle = (input: string): string => {
            if (input) {
                return input.replace(/ /g,'').replace(/,/g, "").trim();
            }
            return ""
        }

        return <section><p>{props.TagItem[0]}: <br/> {props.TagItem[1]}</p></section>
}

export default DisplayTagItem

/*
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
*/