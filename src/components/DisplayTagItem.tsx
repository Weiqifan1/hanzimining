
import {PropsWithChildren} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { characterSRSactionCreators, State } from '../state/index';
import FlashCardStateManipulation from "../applogic/FlashcardDisplayLogic/FlashCardStateManipulation";

const DisplayTagItem: React.FC<{TagItem: string[]}> =
    (props: PropsWithChildren<{TagItem: string[]}>) => {

        const dispatch = useDispatch();
        const {editSingleTag} = bindActionCreators(characterSRSactionCreators, dispatch)
        const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
        )

        var tempTagTitle: string = props.TagItem[0]
        var tempTagBody: string = props.TagItem[1]

        function detectOverlapWithOtherTags(cleanTitle: string, oldTagTitle: string, tags: Record<string, string>) {
            var overlapWithOtherTags: boolean = false
            const previousTagKeys: string[] = Object.keys(tags)
            for (let eachKeyIndex in previousTagKeys) {
                const eachKey: string = previousTagKeys[eachKeyIndex]
                if ((eachKey != oldTagTitle) && (cleanTitle === eachKey)) {
                    overlapWithOtherTags = true
                }
            }
            return overlapWithOtherTags;
        }

        const saveEdit = () => {
            var changesMade: boolean = false
            if (!(tempTagTitle === props.TagItem[0])) {changesMade = true}
            if (!(tempTagBody === props.TagItem[1])) {changesMade = true}
            const cleanTitle: string = cleanTagTitle(tempTagTitle)
            const oldTagTitle = props.TagItem[0]
            const newTag: string[] = [cleanTitle, tempTagBody]
            const overlapWithOtherTags: boolean = detectOverlapWithOtherTags(cleanTitle, oldTagTitle, characterSRSstate.tags)

            if (changesMade && !overlapWithOtherTags && cleanTitle.length > 0) {
              editSingleTag(newTag, oldTagTitle, characterSRSstate)
            }else if (overlapWithOtherTags) {
                console.log("error: the new tag name already exist")
            }
        }

        const cleanTagTitle = (input: string): string => {
            if (input) {
                return input.replace(/ /g,'').replace(/,/g, "").trim();
            }
            return ""
        }

        return <section>
            <button type="button" onClick={() => saveEdit()}>saveEditOn {props.TagItem[0]}</button>
            <ul>
                <li onInput={(e) =>
                    tempTagTitle = FlashCardStateManipulation.editStringvalue(e, props.TagItem[0])}
                    contentEditable="true">{tempTagTitle}</li>
                <li onInput={(e) =>
                    tempTagBody = FlashCardStateManipulation.editStringvalue(e, props.TagItem[1])}
                    contentEditable="true">{tempTagBody}</li>
            </ul>
        </section>
}

export default DisplayTagItem
