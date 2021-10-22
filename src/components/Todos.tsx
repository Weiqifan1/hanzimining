import React from "react";
import {CharactersSRS} from "../state/state-types/charactersrstypes";
import TodoItem from "./TodoItem";

const Todos: React.FC<{data: CharactersSRS}> = (props) => {
    return (
        <ul>
            {props.data.content.map((item) =>(
                <TodoItem content={item} show={true}/>
            ))}
        </ul>
    )
}
export default Todos