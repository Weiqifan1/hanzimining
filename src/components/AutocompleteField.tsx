import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import DisplayTagItem from "./DisplayTagItem";

const AutocompleteField: React.FC<{content: Record<string, string>, setfunction: any }> =
    (props: PropsWithChildren<{content: Record<string, string>}>, setfunction: any) => {


    const display: JSX.Element = <section>
        <p>her er teksten</p>

    </section>

    return display

}

export default AutocompleteField

    /*
<button type="button" onClick={() => sortAllCharsAlphabetically()}>showAllTags</button>
<button type="button" onClick={() => displayByChosenTitle()}>filterByTitleSubstring</button>
<input type="tagToRemove" value={tagSubstringSearchField} onChange={handleChangeToTagsubstringSearchField} />
<ul>
    {currentTagListToDisplay.map((eachMap: string[]) =>(
        <DisplayTagItem TagItem={eachMap}/>
    ))}
</ul>
*/

//slut