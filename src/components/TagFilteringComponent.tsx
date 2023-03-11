import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import DisplayTagItem from "./DisplayTagItem";
import CardComponent from "./CardComponent";


const TagFilteringComponent: React.FC<{content: Record<string, string>, setFunction: any, eachKey: number, eachValue: string}> =
    (props) => {

        const removeTagFilteringComponent = () => {
            const allKeys: number[] = Object.keys(props.content).map(each => parseInt(each)).sort()
            const keysMinusCurrent: number[] = allKeys.filter(function (eachNumber) {
                return eachNumber != props.eachKey
            })
            var updatedList: string[] = [];
            for (let i = 0; i < keysMinusCurrent.length; i++) {
                const mystr: string = props.content[keysMinusCurrent[i].toString()]
                updatedList.push(mystr)
            }

            var updatedRecord: Record<string, string> = {}
            for (let k = 0; k < updatedList.length; k++) {
                const newnum: number = k +1
                const text: string = updatedList[k]
                updatedRecord[newnum.toString()] = text
            }
            props.setFunction(updatedRecord)
        }

        const display: JSX.Element = <section>
            <button type="button" onClick={removeTagFilteringComponent}>remove {props.eachKey}</button>
            <p>her er et tal {props.eachKey} og en string {props.eachValue}</p>
        </section>

        return display
    }

export default TagFilteringComponent


//slut