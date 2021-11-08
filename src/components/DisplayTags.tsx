import React, {useState} from "react";
import {FlashCardDeck, FlashCard} from "../state/state-types/charactersrstypes";

const DisplayTags: React.FC<{data: FlashCardDeck}> = (props) => {

    return (
        <ul>
            {Object.entries(props.data.tags).map(([k,v]) =>(
                <p>{k}: <br/> {v}</p>
            ))}
        </ul>
    )
}
export default DisplayTags