import React from "react";
import {FlashCard} from "../interfaces/flashcard";
import CardComponent from "./CardComponent";
import CardDisplay from "../interfaces/cardDisplay";

const CardListComponent: React.FC<{data: FlashCard[], cardDisplay: CardDisplay}> = (props) => {
    return (
        <ul>
            {props.data.map((item) =>(
                <CardComponent content={item} show={true} cardDisplay={props.cardDisplay}/>
            ))}
        </ul>
    )
}
export default CardListComponent