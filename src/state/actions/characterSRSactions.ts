import {CharacterSRSactionTypes} from "../action-types/characterSRSactionTypes";
import {CharactersSRS} from "../state-types/charactersrstypes";

interface CreateSRSobject {
    type: CharacterSRSactionTypes.CREATESRSOBJECT
    payload: CharactersSRS
}

export type CharacterSRSaction = CreateSRSobject