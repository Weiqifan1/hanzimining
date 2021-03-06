import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {FlashCard} from "../../interfaces/flashcard";
import {FlashCardDeck} from "../../interfaces/flashcarddeck";

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
        Tags: Record<string, string>
    }
}

interface RemoveTag {
    type: CharacterSRSactionTypes.REMOVETAG
    payload: {
        CharactersSRS: FlashCardDeck,
        Tags: Record<string, string>
    }
}

interface EditSingleTag {
    type: CharacterSRSactionTypes.EDITSINGLETAG
    payload: {
        CharactersSRS: FlashCardDeck,
        NewTag: string[],
        OldTagTitle: string
    }
}

export type CharacterSRSaction = CreateSRSobject | EditListItem | EditListItemsInBulk | AddNewTag | RemoveTag | EditSingleTag