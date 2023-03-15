import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import DisplayTagItem from "./DisplayTagItem";
import CardComponent from "./CardComponent";
import AutoSuggest from "react-autosuggest";
import {isSortingValue, SortingValueAll} from "../interfaces/types/sortingValue";

const TagFilteringComponent: React.FC<{deckTagList: string[], content: Record<string, string>, setFunction: any, eachKey: number, eachValue: string}> =
    (props) => {

        const [suggestionsTagName, setSuggestionsTagName] = useState<string[]>([]);
        const [suggestionsFilterValue, setSuggestionsFilterValue] = useState<string[]>(SortingValueAll);
        const [tagName, setTagName] = useState<string>("")
        const [filterValue, setFilterValue] = useState<string>("")

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

            setFilterValue("")
            setTagName("")
        }

        const saveTagFilteringState = () => {
            handleNewFilteringValue();
        }

        function getSuggestionsTagName(value: string): string[] {
            return props.deckTagList.filter(language =>
                language.startsWith(value.trim().toLowerCase())
            );
        }

        const display: JSX.Element = <section>
            <button type="button" onClick={saveTagFilteringState}>save</button>

            <AutoSuggest
                suggestions={suggestionsTagName}
                onSuggestionsClearRequested={() => setSuggestionsTagName([])}
                onSuggestionsFetchRequested={({ value }) => {
                    setTagName(value);
                    setSuggestionsTagName(getSuggestionsTagName(value));
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

            <AutoSuggest
                suggestions={suggestionsFilterValue}
                onSuggestionsClearRequested={() => setSuggestionsFilterValue(suggestionsFilterValue)}
                onSuggestionsFetchRequested={({ value }) => {
                    setFilterValue(value);
                    //setSuggestionsFilterValue(getSuggestionsFilterValue(value));
                }}
                onSuggestionSelected={(_, { suggestionValue }) =>
                    console.log("Selected: " + suggestionValue)
                }
                getSuggestionValue={suggestion => suggestion}
                renderSuggestion={suggestion => <span>{suggestion}</span>}
                inputProps={{
                    placeholder: "Type filter value",
                    value: filterValue,
                    onChange: (_, { newValue, method }) => {
                        setFilterValue(newValue);
                    }
                }}
                highlightFirstSuggestion={true}
            />

            <button type="button" onClick={removeTagFilteringComponent}>remove {props.eachKey}</button>
            <p>tag: {props.eachKey} filter value: {props.eachValue}</p>
        </section>

        return display
    }

export default TagFilteringComponent


//slut