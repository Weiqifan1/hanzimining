import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import DisplayTagItem from "./DisplayTagItem";
import CardComponent from "./CardComponent";

const TagFilteringComponent: React.FC<{content: Record<string, string>, setFunction: any, eachKey: number, eachValue: string}> =
    (props) => {

        const [tagName, setTagName] = useState("")
        const handleChangeTagName = (e: React.FormEvent<HTMLInputElement>) => {setTagName(e.currentTarget.value)}
        const [filterValue, setFilterValue] = useState("")
        const handleChangeFilterValue = (e: React.FormEvent<HTMLInputElement>) => {setFilterValue(e.currentTarget.value)}

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

        const saveTagFilteringState = () => {
            var listToUpdate: Record<string, string> = props.content
            listToUpdate[props.eachKey.toString()] = tagName + " " + filterValue
            props.setFunction(listToUpdate)
        }

        const display: JSX.Element = <section>
            <button type="button" onClick={saveTagFilteringState}>save</button>
            <label htmlFor="tagname">tag name:</label>
            <input type="text" id="tagname" name="tagname" value={tagName} onChange={handleChangeTagName} />

            <label htmlFor="filtervalue">filter value:</label>
            <input type="text" id="filtervalue" name="filtervalue" value={filterValue} onChange={handleChangeFilterValue} />

            <button type="button" onClick={removeTagFilteringComponent}>remove {props.eachKey}</button>
            <p>her er et tal {props.eachKey} og en string {props.eachValue}</p>
        </section>

        return display
    }

export default TagFilteringComponent


//slut