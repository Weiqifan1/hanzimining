import React from "react";
import {FlashCard} from "../interfaces/flashcard";
import CardComponent from "./CardComponent";

const CardListComponent: React.FC<{data: FlashCard[]}> = (props) => {
    return (
        <ul>
            {props.data.map((item) =>(
                <CardComponent content={item} show={true} showSecondary={true}/>
            ))}
        </ul>
    )
}
export default CardListComponent