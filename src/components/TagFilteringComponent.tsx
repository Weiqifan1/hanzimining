import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import DisplayTagItem from "./DisplayTagItem";
import CardComponent from "./CardComponent";


const TagFilteringComponent: React.FC<{content: Record<string, string>, setFunction: any, eachKey: number, eachValue: string}> =
    (props) => {

        const display: JSX.Element = <section>
            <p>her er et tal {props.eachKey} og en string {props.eachValue}</p>

        </section>

        return display

    }

export default TagFilteringComponent


//slut