import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {FlashCardDeck, FlashCard} from "../state-types/charactersrstypes";
import characterSRSlogic from "../../interfaces/characterSRSlogic";

interface CreateSRSobject {
    type: CharacterSRSactionTypes.CREATESRSOBJECT
    payload: {
        CharactersSRS: FlashCardDeck,
        Content: FlashCard[]
    }
}

interface EditListItem {
    type: CharacterSRSactionTypes.EDITLISTITEM
    payload: {
        CharactersSRS: FlashCardDeck,
        Content: FlashCard[]
    }
}

interface EditListItemsInBulk {
    type: CharacterSRSactionTypes.EDITLISTITEMINBULK
    payload: {
        CharactersSRS: FlashCardDeck,
        Content: FlashCard[]
    }
}

interface AddNewTag {
    type: CharacterSRSactionTypes.ADDNEWTAG
    payload: {
        CharactersSRS: FlashCardDeck,
        Tags: Map<string, string>
    }
}

export type CharacterSRSaction = CreateSRSobject | EditListItem | EditListItemsInBulk | AddNewTag