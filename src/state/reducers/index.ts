import {combineReducers} from "redux";
import bankReducer from "./bankReducer";
import characterSRSreducer from "./characterSRSreducer"
import previousCharactersReducer from "./previousCharactersReducer";

const reducers = combineReducers({
    bank: bankReducer,
    characterSRS: characterSRSreducer,
    previousCharacters: previousCharactersReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>

//end
