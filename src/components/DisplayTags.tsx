import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import DisplayTagItem from "./DisplayTagItem";

const DisplayTags: React.FC<{content: FlashCardDeck}> = (props: PropsWithChildren<{content: FlashCardDeck}>) => {

    const getNestedArray = (tagMap: Record<string, string>): string[][] => {

        let nestedElems: string[][] = new Array()
        let allkeys: string[] = Object.keys(tagMap)
        let allvalues: string[] = Object.values(tagMap)
        var num:number = 0
        for(num=0;num < allkeys.length;num++) {
            const temparray: string[] = [allkeys[num], allvalues[num]]
            nestedElems.push(temparray)
        }
        return nestedElems
    }

    const sortNestedArrayTagsByTitleAlphabeticly = (input: string[][]): string[][] => {
        var sortedTags: string[][] = input.sort((n1,n2) => {
            if (n1 > n2) {
                return 1;
            }
            if (n1 < n2) {
                return -1;
            }
            return 0;
        });
        return sortedTags
    }

    const [nestedArrayTagsToDosplay, setNestedArrayTagsToDosplay] =
        useState<string[][]>(sortNestedArrayTagsByTitleAlphabeticly(getNestedArray(props.content.tags)))

    var currentTagListToDisplay: string[][] = nestedArrayTagsToDosplay
    const [tagSubstringSearchField, setTagSubstringSearchField] = useState("")
    const handleChangeToTagsubstringSearchField = (e: React.FormEvent<HTMLInputElement>) => {setTagSubstringSearchField(e.currentTarget.value)}

    const displayByChosenTitle = () => {
        const stringToLookFor: string = tagSubstringSearchField//"ball"
        const result: string[][] = currentTagListToDisplay.filter((eachTags) => {
            return eachTags[0].toLowerCase().includes(stringToLookFor)
        })
        setNestedArrayTagsToDosplay(result)
    }

    const sortAllCharsAlphabetically = () => {
        const resultArray: string[][] = sortNestedArrayTagsByTitleAlphabeticly(getNestedArray(props.content.tags))
        setNestedArrayTagsToDosplay(resultArray)
    }

    const display: JSX.Element = <section>
        <p>her er teksten</p>
        <button type="button" onClick={() => sortAllCharsAlphabetically()}>showAllTags</button>
        <button type="button" onClick={() => displayByChosenTitle()}>filterByTitleSubstring</button>
        <input type="tagToRemove" value={tagSubstringSearchField} onChange={handleChangeToTagsubstringSearchField} />
        <ul>
            {currentTagListToDisplay.map((eachMap: string[]) =>(
                <DisplayTagItem TagItem={eachMap}/>
            ))}
        </ul>
    </section>

    return display
}

export default DisplayTags
