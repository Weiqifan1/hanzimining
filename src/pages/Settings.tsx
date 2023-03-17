import React, {useState} from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {cardDisplayActionCreator, State} from '../state/index';
import CardListComponent from "../components/CardListComponent"
import {FlashCard} from "../interfaces/flashcard";
import {bindActionCreators} from "redux";
import CardDisplay from "../interfaces/cardDisplay";
import DisplayTags from "../components/DisplayTags";
import TagFilteringComponentList from "../components/TagFilteringComponentList";
import {calculateFilter} from "../applogic/FlashcardDisplayLogic/FlashCardFiltering";
import {stringify} from "querystring";

const Settings: React.FunctionComponent<IPage> = props => {

    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )
    //const settings: Record<string, any>
    const [localSettings, setLocalSettings] = useState<Record<string, Record<string, string>>>(characterSRSstate.settings)//characterSRSstate.settings
    const allTagKeys: string[] = Object.keys(characterSRSstate.tags)
    const [localTagsFilter, setLocalTagsFilter] = useState<Record<string, string>>({})
    const [shouldRerender, setShouldRerender] = useState<boolean>(false)

    const doSetLocalTagsFilter = (input: Record<string, string>) => {
        setLocalTagsFilter(input)
        setShouldRerender(!shouldRerender)
    }

    const updateSettings = () => {
        //ready To create new action creator

        //const {deleteOrEditCardOrder} = bindActionCreators(characterSRSactionCreators, dispatch)

    }

    return <section>
        <h1>Settings</h1>
        <button type="button" onClick={updateSettings}>updateSettings</button>
        <p></p>
        <TagFilteringComponentList deckTagList={allTagKeys} content={localTagsFilter} setfunction={doSetLocalTagsFilter}/>
    </section>
};

export default Settings;