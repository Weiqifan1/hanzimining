import {combineReducers} from "redux";
import bankReducer from "./bankReducer";
import characterSRSreducer from "./characterSRSreducer"
import previousCharactersReducer from "./previousCharactersReducer";
import showSecondaryFlashCardInfoReducer from "./showSecondaryFlashCardInfoReducer";

const reducers = combineReducers({
    bank: bankReducer,
    characterSRS: characterSRSreducer,
    previousCharacters: previousCharactersReducer,
    showSecondaryFlashCardInfo: showSecondaryFlashCardInfoReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>

//end
