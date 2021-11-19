import {FlashCard} from "../state/state-types/charactersrstypes";
import {PropsWithChildren} from "react";

const DisplayTagItem: React.FC<{TagItem: string[]}> =
    (props: PropsWithChildren<{TagItem: string[]}>) => {//PropsWithChildren<{content: Content}>
//<p>{eachMap[0]}: <br/> {eachMap[1]}</p>
        return <section><p>{props.TagItem[0]}: <br/> {props.TagItem[1]}</p></section>
}

export default DisplayTagItem