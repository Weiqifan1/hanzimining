import {doCalculateNextCharacter} from "./calculateCharacterSRSorder";
import characterSRSlogic from "../../../interfaces/characterSRSlogic";

export const calculateNextCharacter = (input: characterSRSlogic): characterSRSlogic => {
    const result = doCalculateNextCharacter(input)
    return result
}

export default calculateNextCharacter