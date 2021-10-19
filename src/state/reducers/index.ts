import {combineReducers} from "redux";
import bankReducer from "./bankReducer";
import characterSRSreducer from "./characterSRSreducer"

const reducers = combineReducers({
    bank: bankReducer,
    characterSRS: characterSRSreducer
});

export default reducers;

export type State = ReturnType<typeof reducers>

//end
