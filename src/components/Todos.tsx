import React, {useState} from "react";
import {FlashCardDeck, FlashCard} from "../state/state-types/charactersrstypes";
import TodoItem from "./TodoItem";

const Todos: React.FC<{data: FlashCard[]}> = (props) => {
    return (
        <ul>
            {props.data.map((item) =>(
                <TodoItem content={item} show={true}/>
            ))}
        </ul>
    )
}
export default Todos