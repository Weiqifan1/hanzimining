import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import DisplayTagItem from "./DisplayTagItem";
import CardComponent from "./CardComponent";
import AutoSuggest from "react-autosuggest";
import {isSortingValue, SortingValueAll} from "../interfaces/types/sortingValue";

const TagFilteringComponent: React.FC<{deckTagList: string[], content: Record<string, string>, setFunction: any, eachKey: number, eachValue: string}> =
    (props) => {

        const [tagName, setTagName] = useState<string>("")
        const handleChangeTagName = (e: React.FormEvent<HTMLInputElement>) => {setTagName(e.currentTarget.value)}
        const [filterValue, setFilterValue] = useState<string>("")
        const handleChangeFilterValue = (e: React.FormEvent<HTMLInputElement>) => {
            const currentString: string = e.currentTarget.value
            setFilterValue(currentString)}

        //bug: cant delete individual tag filter
        const removeTagFilteringComponent = () => {
            const allKeys: number[] = Object.keys(props.content).map(each => parseInt(each))
            var updatedList: string[] = [];
            for (let i = 0; i < allKeys.length; i++) {
                const currentK: number = allKeys[i]
                if (currentK != props.eachKey) {
                    const mystr: string = props.content[currentK]
                    updatedList.push(mystr)
                }
            }

            var updatedRecord: Record<string, string> = {}
            for (let k = 0; k < updatedList.length; k++) {
                const newnum: number = k +1
                const text: string = updatedList[k]
                updatedRecord[newnum.toString()] = text
            }
            props.setFunction(updatedRecord)
        }

        function handleNewFilteringValue() {
            var listToUpdate: Record<string, string> = props.content
            var newValue: string = SortingValueAll[0]
            var valueToTest: string = filterValue
            if (valueToTest != null && valueToTest.length > 0 && isSortingValue(valueToTest.toUpperCase())) {
                newValue = valueToTest.toUpperCase()
            }
            setFilterValue(newValue)

            var newName: string = ""
            var nameToTest: string = tagName
            if (nameToTest != null && nameToTest.length > 0 && props.deckTagList.includes(nameToTest)) {
                newName = nameToTest
            }
            listToUpdate[props.eachKey.toString()] = newName + " " + newValue
            setTagName(newName)
            setFilterValue(newValue)
            props.setFunction(listToUpdate)
        }

        const saveTagFilteringState = () => {
            handleNewFilteringValue();
        }

        const [suggestions, setSuggestions] = useState<string[]>([]);

        function getSuggestions(value: string): string[] {
            return props.deckTagList.filter(language =>
                language.startsWith(value.trim().toLowerCase())
            );
        }

        const display: JSX.Element = <section>
            <button type="button" onClick={saveTagFilteringState}>save</button>
            <label htmlFor="tagname">tag name:</label>

            <AutoSuggest
                suggestions={suggestions}
                onSuggestionsClearRequested={() => setSuggestions([])}
                onSuggestionsFetchRequested={({ value }) => {
                    setTagName(value);
                    setSuggestions(getSuggestions(value));
                }}
                onSuggestionSelected={(_, { suggestionValue }) =>
                    console.log("Selected: " + suggestionValue)
                }
                getSuggestionValue={suggestion => suggestion}
                renderSuggestion={suggestion => <span>{suggestion}</span>}
                inputProps={{
                    placeholder: "Type tag name",
                    value: tagName,
                    onChange: (_, { newValue, method }) => {
                        setTagName(newValue);
                    }
                }}
                highlightFirstSuggestion={true}
            />

            <label htmlFor="filtervalue">filter value:</label>
            <input type="text" id="filtervalue" name="filtervalue" value={filterValue} onChange={handleChangeFilterValue} />

            <button type="button" onClick={removeTagFilteringComponent}>remove {props.eachKey}</button>
            <p>tag: {props.eachKey} filter value: {props.eachValue}</p>
        </section>

        return display
    }

export default TagFilteringComponent


//slut