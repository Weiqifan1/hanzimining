import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {CharactersSRS, Content} from "../state-types/charactersrstypes";

interface CreateSRSobject {
    type: CharacterSRSactionTypes.CREATESRSOBJECT
    payload: {
        CharactersSRS: CharactersSRS,
        Content: Content
    }
}

export type CharacterSRSaction = CreateSRSobject