import React, {PropsWithChildren, useState} from "react";
import {FlashCardDeck, FlashCard} from "../state/state-types/charactersrstypes";

// React.FC<{data: FlashCardDeck}> = (props: PropsWithChildren<{data: FlashCardDeck}>)

//Products: React.FC<{content: FlashCard}> = (props: PropsWithChildren<{content: FlashCard}>) => {
const DisplayTags: React.FC<{content: FlashCardDeck}> = (props: PropsWithChildren<{content: FlashCardDeck}>) => {

    //    const TodoItem: React.FC<{content: FlashCard, show: boolean, showSecondary: boolean}> =
    //    (props: PropsWithChildren<{content: FlashCard, show: boolean, showSecondary: boolean}>) => {//PropsWithChildren<{content: Content}>

    const display: JSX.Element = <section>
        <p>her er teksten</p>
        <ul>
            {Object.entries(props.content.tags).map(([k,v]) =>(
                <p>{k}: <br/> {v}</p>
            ))}
        </ul>
    </section>

            return display
}
export default DisplayTags

/*

<ul>
            {Object.entries(props.data.tags).map(([k,v]) =>(
                <p>{k}: <br/> {v}</p>
            ))}
        </ul>

*/