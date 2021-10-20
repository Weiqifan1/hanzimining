import {Content} from "../state/state-types/charactersrstypes";

const TodoItem: React.FC<{content: Content}> = (props) => {

    return <ul>
        <li>{props.content.number}</li>
        <li>{props.content.reviewValue}</li>
        <li>{props.content.dateOfLastReview}</li>
        <li>{props.content.character}</li>
        <li>{props.content.keyword}</li>
        <li>{props.content.story}</li>
        </ul>
}

export default TodoItem