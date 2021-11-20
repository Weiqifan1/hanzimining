import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck, FlashCard} from "../state/state-types/charactersrstypes";
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
        //etNestedArrayTagsToDosplay(sortedTags)
    }

    const displayAlphabetically = () => {
        const result: string[][] = sortNestedArrayTagsByTitleAlphabeticly(nestedArrayTagsToDosplay)
        setNestedArrayTagsToDosplay(result)
    }
    //<button type="button" onClick={() => displayAlphabetically()}>sortByTitle</button>

    const [nestedArrayTagsToDosplay, setNestedArrayTagsToDosplay] =
        useState<string[][]>(sortNestedArrayTagsByTitleAlphabeticly(getNestedArray(props.content.tags)))


    const display: JSX.Element = <section>
        <p>her er teksten</p>
        <ul>
            {nestedArrayTagsToDosplay.map((eachMap: string[]) =>(
                <DisplayTagItem TagItem={eachMap}/>
            ))}
        </ul>
    </section>

    return display
}

export default DisplayTags

/*

<ul>
            {Object.entries(props.content.tags).map(([k,v]) =>(
                <p>{k}: <br/> {v}</p>
            ))}
        </ul>

*/