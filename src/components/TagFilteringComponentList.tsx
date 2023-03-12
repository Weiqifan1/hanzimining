import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import DisplayTagItem from "./DisplayTagItem";
import CardComponent from "./CardComponent";
import TagFilteringComponent from "./TagFilteringComponent";
import {SortingValueAll} from "../interfaces/types/sortingValue";

const TagFilteringComponentList: React.FC<{content: Record<string, string>, setfunction: any }> =
    (props) => {

    const contentList = (input: Record<string, string>): [number, string][] => {
        const allKeys: number[] = Object.keys(input).map(each => parseInt(each)).sort()
        var res: [number, string][] = [];
        for (let i = 0; i < allKeys.length; i++) {
            const eachKey: number = allKeys[i]
            const eachVal: string = input[eachKey]
            res.push([eachKey, eachVal])
        }
        return res;
    }

    function addElement() {
        const allKeys: number[] = Object.keys(props.content).map(each => parseInt(each)).sort()
        var largestElement: number = 0;
        for (let i = 0; i < allKeys.length; i++) {
            const mynum: number = allKeys[i]
            if (mynum > largestElement) {
                largestElement = mynum
            }
        }
        largestElement = largestElement + 1
        var currentRecord: Record<string, string> = props.content
        currentRecord[largestElement.toString()] = SortingValueAll[0]
        props.setfunction(currentRecord)
    }

    const clear = () => {
        var currentRecord: Record<string, string> = {}
        props.setfunction(currentRecord)
    }

    const display: JSX.Element = <section>
        <p>her er teksten</p>
        <button type="button" onClick={addElement}>addElement</button>
        <button type="button" onClick={clear}>clear</button>
        <ul>
            {contentList(props.content).map((item) => (
                <TagFilteringComponent content={props.content} setFunction={props.setfunction} eachKey={item[0]} eachValue={item[1]} />
                ))}
        </ul>
    </section>

    return display

}

export default TagFilteringComponentList


//slut