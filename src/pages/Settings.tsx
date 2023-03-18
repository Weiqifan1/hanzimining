import React, {useState} from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {cardDisplayActionCreator, characterSRSactionCreators, State} from '../state/index';
import CardListComponent from "../components/CardListComponent"
import {FlashCard} from "../interfaces/flashcard";
import {bindActionCreators} from "redux";
import CardDisplay from "../interfaces/cardDisplay";
import DisplayTags from "../components/DisplayTags";
import TagFilteringComponentList from "../components/TagFilteringComponentList";
import {calculateFilter} from "../applogic/FlashcardDisplayLogic/FlashCardFiltering";
import {stringify} from "querystring";
import {getSettings_filtercardsbytag} from "../applogic/flashcardHelperFunctions/settingsHelper";

const Settings: React.FunctionComponent<IPage> = props => {

    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )

    const dispatch = useDispatch();
    const {replacesettings_filtercardsbytag} = bindActionCreators(characterSRSactionCreators, dispatch)
    const [shouldRerender, setShouldRerender] = useState<boolean>(false)

    const allTagKeys: string[] = Object.keys(characterSRSstate.tags)
    const [localfiltercardsbytag, setLocalfiltercardsbytag] = useState<Record<string, string>>(getSettings_filtercardsbytag(characterSRSstate))
    const doSetLocalfiltercardsbytag = (input: Record<string, string>) => {
        setLocalfiltercardsbytag(input)
        replacesettings_filtercardsbytag(input, characterSRSstate)
        setShouldRerender(!shouldRerender)
    }

    return <section>
        <h1>Settings</h1>
        <p></p>
        <TagFilteringComponentList deckTagList={allTagKeys} content={localfiltercardsbytag} setfunction={doSetLocalfiltercardsbytag}/>
    </section>
};

export default Settings;