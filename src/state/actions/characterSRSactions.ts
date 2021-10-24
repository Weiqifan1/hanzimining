import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {FlashCardDeck, FlashCard} from "../state-types/charactersrstypes";

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

export type CharacterSRSaction = CreateSRSobject | EditListItem | EditListItemsInBulk