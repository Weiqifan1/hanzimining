import {combineReducers} from "redux";
import characterSRSreducer from "./characterSRSreducer"
import previousCharactersReducer from "./previousCharactersReducer";
import showSecondaryFlashCardInfoReducer from "./showSecondaryFlashCardInfoReducer";

const reducers = combineReducers({
    characterSRS: characterSRSreducer,
    previousCharacters: previousCharactersReducer,
    showSecondaryFlashCardInfo: showSecondaryFlashCardInfoReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>
