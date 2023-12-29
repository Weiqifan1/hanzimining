
import {FlashCardDeck} from "../../../interfaces/flashcarddeck";
import {FlashCard} from "../../../interfaces/flashcard";

const copyFirstOccurrenceOfTags = (map: Record<string, string>[]): Record<string, string> => {
    var newtags: Record<string, string> = {};
    for(let eachmap of map) {
        for(let key in eachmap) {
            // Checks if newtags already have the key to avoid replacing the existing value with later occurrences.
            if(!newtags.hasOwnProperty(key)) {
                const value = eachmap[key];
                newtags[key] = value;
            }
        }
    }
    return newtags;
}

function updateNotableCards(notableCards: number[],
                            lastCardInOldDeck: number) {
    var newNotable: number[] =
        notableCards.map(cardnum => cardnum + lastCardInOldDeck);
    return newNotable;
}

function updateRepetitionHistory(repetitionHistory: number[],
                             repetitionHistLength: number) {
    if (repetitionHistory.length <= repetitionHistLength) {
        return repetitionHistory;
    } else {
        return repetitionHistory.slice(0, repetitionHistLength);
    }
}

const updateTags = (tags: string[],
                    addNewNameAndInfoToTags: boolean,
                    deckName: string): string[] => {
    if (addNewNameAndInfoToTags) {
        return [...tags, deckName];
    } else {
        return tags;
    }
    return [];
}

const updateCard = (card: FlashCard,
                    lastCardInOldDeck: number,
                    repetitionHistLength: number,
                    addNewNameAndInfoToTags: boolean,
                    deckName: string): FlashCard => {
    const updatedCardNumber: number = card.cardNumber + lastCardInOldDeck;
    const updatedNotableCards: number[] =
        updateNotableCards(card.notableCards, lastCardInOldDeck);
    const updatedReviewHistory: number[] =
        updateRepetitionHistory(card.repetitionHistory, repetitionHistLength);
    const newTags: string[] = updateTags(card.tags, addNewNameAndInfoToTags, deckName);

    const resultCard: FlashCard = {
        cardNumber: updatedCardNumber,//number,
        cardName: card.cardName,//string,
        frontSide: card.frontSide,//string,
        backSide: card.backSide,//string,
        primaryInfo: card.primaryInfo,//string,
        secondaryInfo: card.secondaryInfo,//string,
        notableCards: updatedNotableCards,//number[],
        dateOfLastReview: card.dateOfLastReview,//string,
        repetitionValue: card.repetitionValue,//number,
        repetitionHistory: updatedReviewHistory,//number[],
        tags: newTags//string[]
    };
    return resultCard;
}

const getLogestRepetitionHistory = (mapElement: FlashCard[]): number => {
    let longestHistory = 0;
    for (const card of mapElement) {
        if (card.repetitionHistory.length > longestHistory) {
            longestHistory = card.repetitionHistory.length;
        }
    }
    return longestHistory;
}

const mergecards = (map: FlashCard[][],
                    addNewNameAndInfoToTags: boolean,
                    deckName: string): FlashCard[] => {
    var cardList: FlashCard[] = [];
    if (map === null || map.length === 0) {
        return cardList;
    }
    //const tail: FlashCard[][] = map.slice(1);
    //cardList = map[0];

    //get the highest repetition history of the first deck,
    //this should match or atleast not exceed the repetition history in settings
    const repetitionHistLength: number = getLogestRepetitionHistory(map[0]);
    for (const mapItem of map) {
        const highestCardIncardlistt: number = cardList.length;
        for (let card of mapItem) {
            const updatedcard: FlashCard =
                updateCard(
                    card,
                    highestCardIncardlistt,
                    repetitionHistLength,
                    addNewNameAndInfoToTags,
                    deckName);
            cardList = [...cardList, updatedcard];
        }
    }

    return cardList;
}

function generateDeckTitle(typedInname: string, input: FlashCardDeck[], options: boolean[]) {
    //1 true: use typed in name, false: use name of first deck in list
    const firstBoolean: boolean = options[0];
    if (firstBoolean) {
        return typedInname;
    } else {
        return input[0].deckName;
    }
}

function generateDeckInfo(deckInfo: string, input: FlashCardDeck[], options: boolean[]) {
    //options
    //2 true: deck info is accumulated from other decks, false: use single deck info text
    //3 true: use typed in deck info added on to accumulated deck info, false: use only accumulated info from old decks.
    //(used only if 2 is true)
    //4 true: use typed in deck info, false: use deck info from first deck
    //(used only if 2 is false)
    var resul: string = "";
    if (options[1]) {
        if (options[2]) {
            resul = deckInfo + "\n\n" + input.reduce((acc, deck) => acc + deck.deckInfo + "\n\n", "");
        } else {
            resul = input.reduce((acc, deck) => acc + deck.deckInfo + "\n\n", "");
        }
    } else {
        if (options[3]) {
            resul = deckInfo;
        } else {
            resul = input[0].deckInfo;
        }
    }
    return resul;
}

function generateDeckTags(tempTagList: Record<string, string>[], options: boolean[]) {
    //options
    //5 true: tags are accumulated acros decks (if overlap), false: only the first occurrence is included (if overlap)
    var resulttags: Record<string, string> = tempTagList[0];
    const tagtail: Record<string, string>[] = tempTagList.slice(1);
    const booleanFive: boolean = options[4];

    if (booleanFive) {
        for (const eachList of tagtail) {
            for (let key in eachList) {
                if (!resulttags.hasOwnProperty(key)) {
                    resulttags[key] = eachList[key];
                } else {
                    var updatedTag: string = resulttags[key] + "\n\n" + eachList[key];
                    resulttags[key] = updatedTag;
                }
            }
        }
    } else {
        for (const eachList of tagtail) {
            for (let key in eachList) {
                if (!resulttags.hasOwnProperty(key)) {
                    resulttags[key] = eachList[key];
                }
            }
        }
    }
    return resulttags;
}

const generateNewTag = (basictags: Record<string, string>,
                        addNewNameAndInfoToTags: boolean,
                        deckName: string, deckInfo: string): Record<string, string> => {
    if (addNewNameAndInfoToTags) {
        const newTag: Record<string, string> = {
            deckName: deckInfo
        };
        const updatedTags: Record<string, string> = {...basictags, ...newTag};
        return updatedTags;
    } else {
        return basictags;
    }
}

export const mergeDeck = (input: FlashCardDeck[],
                          deckName: string,
                          deckInfo: string,
                          options: boolean[]): FlashCardDeck => {
    //options
    //1 true: use typed in name, false: use name of first deck in list
    //2 true: deck info is accumulated from other decks, false: use single deck info text
    //3 true: use typed in deck info added on to accumulated deck info, false: use only accumulated info from old decks.
    //(used only if 2 is true)
    //4 true: use typed in deck info, false: use deck info from first deck
    //(used only if 2 is false)
    //5 true: tags are accumulated acros decks (if overlap), false: only the first occurrence is included (if overlap)
    //6 true: the typed in deck name and info are added to all cards as a tag
    if (input === null || input.length == 0) {
        return emptydeck();
    }

    const newname: string = generateDeckTitle(deckName, input, options);
    const newinfo: string = generateDeckInfo(deckInfo, input, options);
    const tempTagList: Record<string, string>[] = input.map(deck => deck.tags);

    const basictags: Record<string, string> = generateDeckTags(tempTagList, options);
    const newtags: Record<string, string> = generateNewTag(basictags, options[5], deckName, deckInfo);
        //copyFirstOccurrenceOfTags();
    const newcards: FlashCard[] =
        mergecards(
            input.map(deck => deck.cards),
            options[5],
            deckName);

    const deck: FlashCardDeck = {
        deckName: newname,
        deckInfo: newinfo,
        settings: input[0].settings,
        tags: newtags,
        cards: newcards
    };
    return deck;
}

/*
export const mergeDecksNoAbstraction_copyFirstOccurrenceOfTags_Main = (input: FlashCardDeck[],
                                                                       deckName: string,
                                                                       deckInfo: string): FlashCardDeck => {

}
*/
/*
export const mergeDecksNoAbstraction_accreteOccurrenceOfTagsAndInfo_Main = (input: FlashCardDeck[],
                                                                            deckName: string): FlashCardDeck => {
    return emptydeck();
}

export const mergeDecksHigherAbstraction_accreteOccurrenceOfTagsAndInfo_Main = (input: FlashCardDeck[],
                                                deckName: string,
                                                deckInfo: string): FlashCardDeck => {
    return emptydeck();
}

export const mergeDecksHigherAbstraction_copyFirstOccurrenceOfTags_Main = (input: FlashCardDeck[],
                                                                           deckName: string,
                                                                           deckInfo: string): FlashCardDeck => {
    return emptydeck();
}*/

const emptydeck = (): FlashCardDeck => {
    var tempDeck: FlashCardDeck = {
        deckName: "",
        deckInfo: "",
        settings: {},
        tags: {},
        cards: []
    };
    return tempDeck;
}


