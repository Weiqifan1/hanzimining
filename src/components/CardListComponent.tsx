import React from "react";
import {FlashCard} from "../interfaces/flashcard";
import CardComponent from "./CardComponent";

const CardListComponent: React.FC<{data: FlashCard[], showPrimary: boolean, showSecondary: boolean}> = (props) => {
    return (
        <ul>
            {props.data.map((item) =>(
                <CardComponent content={item} show={true} showPrimary={props.showPrimary} showSecondary={props.showSecondary}/>
            ))}
        </ul>
    )
}
export default CardListComponent