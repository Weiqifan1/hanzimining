import React, {useState} from "react";
import {CharactersSRS, Content} from "../state/state-types/charactersrstypes";
import TodoItem from "./TodoItem";

const Todos: React.FC<{data: Content[]}> = (props) => {
    return (
        <ul>
            {props.data.map((item) =>(
                <TodoItem content={item} show={true}/>
            ))}
        </ul>
    )
}
export default Todos