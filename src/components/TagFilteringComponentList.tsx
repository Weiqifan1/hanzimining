import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import DisplayTagItem from "./DisplayTagItem";
import CardComponent from "./CardComponent";
import TagFilteringComponent from "./TagFilteringComponent";
import {SortingValueAll} from "../interfaces/types/sortingValue";

const TagFilteringComponentList: React.FC<{deckTagList: string[], content: Record<string, string>, setfunction: any }> =
    (props) => {

    const [show, setShow] = useState<boolean>(false)
    const doSetShow = () => {
        setShow(!show)
    }

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

    const showFitler = (): JSX.Element  => {
        const displayIfShow: JSX.Element = <section>
            <button type="button" onClick={doSetShow}>showFilter</button>
            <button type="button" onClick={addElement}>addElement</button>
            <button type="button" onClick={clear}>clear</button>
            <ul>
                {contentList(props.content).map((item) => (
                    <TagFilteringComponent deckTagList={props.deckTagList} content={props.content} setFunction={props.setfunction} eachKey={item[0]} eachValue={item[1]} />
                ))}
            </ul>
        </section>

        //show the first 3 strings
        var stringValues: string[] = []
        if (props.content['1']) {
            stringValues.push(props.content['1'])
        }
        if (props.content['2']) {
            stringValues.push(props.content['2'])
        }
        if (props.content['3']) {
            stringValues.push(props.content['3'])
        }
        if (props.content['4']) {
            stringValues.push('...')
        }

        const displayIfNotShow: JSX.Element = <section>
            <p>{stringValues.toString()}</p>
            <button type="button" onClick={doSetShow}>showFilter</button>
        </section>

        if (show) {
            return displayIfShow
        }else {
            return displayIfNotShow
        }
    }

    const display: JSX.Element = <section>
        {showFitler()}
    </section>

    return display

}

export default TagFilteringComponentList


//slut