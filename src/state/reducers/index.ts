import {combineReducers} from "redux";
import characterSRSreducer from "./characterSRSreducer"
import previousCharactersReducer from "./previousCharactersReducer";
import showSecondaryFlashCardInfoReducer from "./showSecondaryFlashCardInfoReducer";
import showPrimaryFlashCardInfoReducer from "./showPrimaryFlashCardInfoReducer";

const reducers = combineReducers({
    characterSRS: characterSRSreducer,
    previousCharacters: previousCharactersReducer,
    showPrimaryFlashCardInfo: showPrimaryFlashCardInfoReducer,
    showSecondaryFlashCardInfo: showSecondaryFlashCardInfoReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>
