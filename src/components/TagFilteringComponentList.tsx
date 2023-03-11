import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import DisplayTagItem from "./DisplayTagItem";
import CardComponent from "./CardComponent";
import TagFilteringComponent from "./TagFilteringComponent";

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

    const display: JSX.Element = <section>
        <p>her er teksten</p>
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