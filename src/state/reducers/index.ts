import {combineReducers} from "redux";
import characterSRSreducer from "./characterSRSreducer"
import previousCharactersReducer from "./previousCharactersReducer";
import cardDisplayReducers from "./cardDisplayReducers";

const reducers = combineReducers({
    cardDisplay: cardDisplayReducers,
    characterSRS: characterSRSreducer,
    previousCharacters: previousCharactersReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>
