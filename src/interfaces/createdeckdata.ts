import {CardOrder, InputTextType, WritingSystem} from "./types/createDeckValues";

export interface CreateDeckData {
    "deckName": string,
    "deckInfo": string,
    "script": WritingSystem,
    "cardOrder": CardOrder,
    "vocab": string[],
    "textType": InputTextType,
    "sentencenames": string[],
    "text": string,
}