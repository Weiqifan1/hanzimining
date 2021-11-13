import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck, FlashCard} from "../state/state-types/charactersrstypes";
import {mkdtemp} from "fs";

// React.FC<{data: FlashCardDeck}> = (props: PropsWithChildren<{data: FlashCardDeck}>)

//Products: React.FC<{content: FlashCard}> = (props: PropsWithChildren<{content: FlashCard}>) => {
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

    const nestedArray: string[][] = getNestedArray(props.content.tags)

    const display: JSX.Element = <section>
        <p>her er teksten</p>
        <ul>
            {nestedArray.map((eachMap: string[]) =>(
                <p>{eachMap[0]}: <br/> {eachMap[1]}</p>
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