import {FlashCardDeck} from "../../interfaces/flashcarddeck";

export const getSettings_filtercardsbytag = (currentState: FlashCardDeck): Record<string, string> => {
    const subcategoryname: string = "filtercardsbytag"
    const settings:  Record<string, Record<string, string>> = currentState.settings
    var subcategory: Record<string, string> = {}
    if (settings[subcategoryname]) {
        subcategory = settings[subcategoryname]
    }
    return subcategory
}

