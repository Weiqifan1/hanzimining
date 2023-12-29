
import {FlashCardDeck} from "../../interfaces/flashcarddeck";
import {
    testCard_b_001_afterMerge_notCommulative,
    testCard_b_002_afterMerge_notCommulative,
    testCard_b_003_afterMerge_notCommulative,
    testCard_c_001_afterMerge_notCommulative,
    testCard_c_002_afterMerge_notCommulative,
    testCard_c_003_afterMerge_notCommulative,
    testDeck_a,
    testDeckList
} from "../data/FlashCardDeckTestData";
import {
    mergeDeck
} from "../../applogic/characterSRSlogic/mergeDecks/mergeDecksBoundary";
import {FlashCard} from "../../interfaces/flashcard";
import {getHashCodeCard} from "../../applogic/pageHelpers/mergeDeckHelper";
//import { getHashCodeCard } from "../../components/FileInputMergeFiles";

describe("merge deck title", () => {
    it("when the first boolean value is true, the title added should be the title of the result deck", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        //options
        //1 true: use typed in name, false: use name of first deck in list
        const testoptopns: boolean[] = [true, false,false,false,false,false];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);
        expect(merged.deckName).toBe("newtitle");
    });

    it("when the first boolean value is false, the title from the first deck should be the deck title", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        //options
        //1 true: use typed in name, false: use name of first deck in list
        const testoptopns: boolean[] = [false, false,false,false,false,false];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);
        expect(merged.deckName).toBe("Deck a");
    });
});

describe("merge deck info", () => {
    it("non accumulated info text, taken from the first deck", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        //options
        //2 true: deck info is accumulated from other decks, false: use single deck info text
        //3 true: use typed in deck info added on to accumulated deck info, false: use only accumulated info from old decks.
        //(used only if 2 is true)
        //4 true: use typed in deck info, false: use deck info from first deck
        //(used only if 2 is false)
        const testoptopns: boolean[] = [false    ,false    ,false    ,false    ,false,false];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);
        //test deck name
        expect(merged.deckInfo).toBe("deck a info");
    });
    it("non accumulated info text that is typed in", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        //options
        //2 true: deck info is accumulated from other decks, false: use single deck info text
        //3 true: use typed in deck info added on to accumulated deck info, false: use only accumulated info from old decks.
        //(used only if 2 is true)
        //4 true: use typed in deck info, false: use deck info from first deck
        //(used only if 2 is false)
        const testoptopns: boolean[] = [false    ,false    ,false    ,true    ,false,false];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);
        //test deck name
        expect(merged.deckInfo).toBe("newinfo");
    });
    it("accumulated info text, taken from each deck", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        //options
        //2 true: deck info is accumulated from other decks, false: use single deck info text
        //3 true: use typed in deck info added on to accumulated deck info, false: use only accumulated info from old decks.
        //(used only if 2 is true)
        //4 true: use typed in deck info, false: use deck info from first deck
        //(used only if 2 is false)
        const testoptopns: boolean[] = [false    ,true    ,false    ,false,false,false];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);
        //test deck name
        expect(merged.deckInfo).toBe("deck a info"+"\n\n"+"deck b info"+"\n\n"+"deck c info"+"\n\n");
    });
    it("accumulated info text, typed in + infor from each deck", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        //options
        //2 true: deck info is accumulated from other decks, false: use single deck info text
        //3 true: use typed in deck info added on to accumulated deck info, false: use only accumulated info from old decks.
        //(used only if 2 is true)
        //4 true: use typed in deck info, false: use deck info from first deck
        //(used only if 2 is false)
        const testoptopns: boolean[] = [false    ,true    ,true    ,false,false,false];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);
        //test deck name
        expect(merged.deckInfo).toBe("newinfo"+"\n\n"+"deck a info"+"\n\n"+"deck b info"+"\n\n"+"deck c info"+"\n\n");
    });
});

describe("merge deck tags", () => {
    it("if there are tag overlaps, only the first occurrence is used", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        //options
        //5 true: tags are accumulated acros decks (if overlap), false: only the first occurrence is included (if overlap)
        const testoptopns: boolean[] = [false,false,false,false,    false    ,false];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);

        expect(merged.tags).toEqual({
            "tagTitle_a_a": "tagTitle_a_a_content",
            "tagTitle_a_b": "tagTitle_a_b_content",
            "tagTitle_a_c": "tagTitle_a_c_content_valiantFromA",
            "tagTitle_a_d": "tagTitle_a_d_content",
            "tagTitle_b_a": "tagTitle_b_a_content",
            "tagTitle_b_b": "tagTitle_b_b_content",
            "tagTitle_b_d": "tagTitle_b_d_content",
            "tagTitle_c_a": "tagTitle_c_a_content",
            "tagTitle_c_b": "tagTitle_c_b_content",
            "tagTitle_c_d": "tagTitle_c_d_content",
        });
    });

    it("if there are tag overlaps, the values will be accumulated", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        //options
        //5 true: tags are accumulated acros decks (if overlap), false: only the first occurrence is included (if overlap)
        const testoptopns: boolean[] = [false,false,false,false,    true    ,false];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);

        const tagoverlap: string =
            "tagTitle_a_c_content_valiantFromA" + "\n\n" +
            "tagTitle_a_c_content_valiantFromB" + "\n\n" +
            "tagTitle_a_c_content_variantFromC";

        const totaltagtest: Record<string, string> = {
            "tagTitle_a_a": "tagTitle_a_a_content",
            "tagTitle_a_b": "tagTitle_a_b_content",
            "tagTitle_a_c": tagoverlap,
            "tagTitle_a_d": "tagTitle_a_d_content",
            "tagTitle_b_a": "tagTitle_b_a_content",
            "tagTitle_b_b": "tagTitle_b_b_content",
            "tagTitle_b_d": "tagTitle_b_d_content",
            "tagTitle_c_a": "tagTitle_c_a_content",
            "tagTitle_c_b": "tagTitle_c_b_content",
            "tagTitle_c_d": "tagTitle_c_d_content",
        };

        expect(merged.tags).toEqual(totaltagtest);
    });
});

describe("adding typed-in title and info to tags", () => {
    it("when the sixth boolean value is true, the typed in deck name and info are added to all cards as a tag", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        //options
        //6 true: the typed in deck name and info are added to all cards as a tag
        const testoptopns: boolean[] = [false,false,false,false,false,    true];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);

        //check that tags have the right length
        expect(Object.keys(merged.tags).length).toBe(11);

        //check that a tag with the right key and value exist
        expect(merged.tags["newtitle"] === "newinfo");

        //check that the tag title is found on each card
        //deck a 1
        const deck_a_tags_test1: string[] = [
            "tagTitle_a_a",
            "tagTitle_a_b",
            "newtitle"
        ];
        const deck_a_real_tags1: string[] = merged.cards[0].tags;
        expect(deck_a_real_tags1).toEqual(deck_a_tags_test1);

        //deck a 3
        const deck_a_tags_test3: string[] = [
            "tagTitle_a_c",
            "tagTitle_a_d",
            "newtitle"
        ];
        const deck_a_real_tags3: string[] = merged.cards[2].tags;
        expect(deck_a_real_tags3).toEqual(deck_a_tags_test3);

        //deck b 2
        const deck_b_tags_test2: string[] = [
            "tagTitle_b_b",
            "tagTitle_a_c",
            "newtitle"
        ];
        const deck_b_real_tags2: string[] = merged.cards[4].tags;
        expect(deck_b_tags_test2).toEqual(deck_b_real_tags2);

        //deck c 2
        const deck_c_tags_test2: string[] = [
            "tagTitle_c_b",
            "tagTitle_a_c",
            "newtitle"
        ];
        const deck_c_real_tags2: string[] = merged.cards[7].tags;
        expect(deck_c_tags_test2).toEqual(deck_c_real_tags2);

    });

    it("when the sith boolean value is false, nothing is changed", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        //options
        // 6 true: the typed in deck name and info are added to all cards as a tag
        const testoptopns: boolean[] = [false,false,false,false,false,    false];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);

        //check that tags have the right length
        expect(Object.keys(merged.tags).length).toBe(10);

        //check that a tag with the right key and value exist
        expect(merged.tags["newtitle"] === undefined);

        //check that the tag title is found on each card
        //deck a 1
        const deck_a_tags_test1: string[] = [
            "tagTitle_a_a",
            "tagTitle_a_b"
        ];
        const deck_a_real_tags1: string[] = merged.cards[0].tags;
        expect(deck_a_real_tags1).toEqual(deck_a_tags_test1);

        //deck a 3
        const deck_a_tags_test3: string[] = [
            "tagTitle_a_c",
            "tagTitle_a_d"
        ];
        const deck_a_real_tags3: string[] = merged.cards[2].tags;
        expect(deck_a_real_tags3).toEqual(deck_a_tags_test3);

        //deck b 2
        const deck_b_tags_test2: string[] = [
            "tagTitle_b_b",
            "tagTitle_a_c"
        ];
        const deck_b_real_tags2: string[] = merged.cards[4].tags;
        expect(deck_b_tags_test2).toEqual(deck_b_real_tags2);

        //deck c 2
        const deck_c_tags_test2: string[] = [
            "tagTitle_c_b",
            "tagTitle_a_c"
        ];
        const deck_c_real_tags2: string[] = merged.cards[7].tags;
        expect(deck_c_tags_test2).toEqual(deck_c_real_tags2);
    });
});

describe("merge deck card test", () => {
    it("test that merged cards have the right attributes", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        const testoptopns: boolean[] = [true,false,false,false,false,    false];
        const merged: FlashCardDeck = mergeDeck(deckList, "newtitle", "newinfo", testoptopns);
        const deckstestdata: FlashCard[] = [
            ...testDeck_a().cards,
            testCard_b_001_afterMerge_notCommulative(),
            testCard_b_002_afterMerge_notCommulative(),
            testCard_b_003_afterMerge_notCommulative(),
            testCard_c_001_afterMerge_notCommulative(),
            testCard_c_002_afterMerge_notCommulative(),
            testCard_c_003_afterMerge_notCommulative()
        ];
        const testdataHashcode: string[] = deckstestdata.map(cards => getHashCodeCard(cards));
        const readlCardsHash: string[] = merged.cards.map(cards => getHashCodeCard(cards));
        expect(readlCardsHash).toEqual(testdataHashcode);
    });
});


//******************* tests about non accumulated tags *****************
/*
describe("mergeDecksMain method", () => {
    it("should appropriately merge flash card decks in function " +
        "mergeDecksNoAbstraction_copyFirstOccurrenceOfTagsAndDeckInfo_Main", () => {
        const deckList: FlashCardDeck[] = testDeckList();
        const merged: FlashCardDeck = mergeDecksNoAbstraction_copyFirstOccurrenceOfTags_Main(deckList,
            "newtitle",
            "newinfo");
        //test deck name
        expect(merged.deckName).toBe("newtitle");
        //test deck info
        expect(merged.deckInfo).toBe("newinfo");
        //test tags
        expect(merged.tags).toEqual({
            "tagTitle_a_a": "tagTitle_a_a_content",
            "tagTitle_a_b": "tagTitle_a_b_content",
            "tagTitle_a_c": "tagTitle_a_c_content_valiantFromA",
            "tagTitle_a_d": "tagTitle_a_d_content",
            "tagTitle_b_a": "tagTitle_b_a_content",
            "tagTitle_b_b": "tagTitle_b_b_content",
            "tagTitle_b_d": "tagTitle_b_d_content",
            "tagTitle_c_a": "tagTitle_c_a_content",
            "tagTitle_c_b": "tagTitle_c_b_content",
            "tagTitle_c_d": "tagTitle_c_d_content",
        });

        const deckstestdata: FlashCard[] = [
            ...testDeck_a().cards,
            testCard_b_001_afterMerge_notCommulative(),
            testCard_b_002_afterMerge_notCommulative(),
            testCard_b_003_afterMerge_notCommulative(),
            testCard_c_001_afterMerge_notCommulative(),
            testCard_c_002_afterMerge_notCommulative(),
            testCard_c_003_afterMerge_notCommulative()
        ];
        const testdataHashcode: string[] = deckstestdata.map(cards => getHashCodeCard(cards));
        const readlCardsHash: string[] = merged.cards.map(cards => getHashCodeCard(cards));
        expect(readlCardsHash).toEqual(testdataHashcode);
    });
});
*/


/*
describe("mergeDecksMain method", () => {
    it("should appropriately merge flash card decks in function " +
        "mergeDecksNoAbstraction_accreteOccurrenceOfTagsAndInfo_Main", () => {
        const deckList: FlashCardDeck[] = testDeckList();

        const merged: FlashCardDeck = mergeDecksNoAbstraction_accreteOccurrenceOfTagsAndInfo_Main(deckList,
            "newtitle");

        //test deck name
        expect(merged.deckName).toBe("newtitle");
        //test deck info
        const updatedInfo: string = "deck a info" + "\n\n" + "deck b info" + "\n\n" + "deck c info";
        expect(merged.deckInfo).toBe(updatedInfo);
        //test tags
        const tagInfoaccumulated: string =
            "tagTitle_a_c_content_valiantFromA" + "\n\n" +
            "tagTitle_a_c_content_valiantFromB" + "\n\n" +
            "tagTitle_a_c_content_valiantFromC";
        expect(merged.tags).toEqual({
            "tagTitle_a_a": "tagTitle_a_a_content",
            "tagTitle_a_b": "tagTitle_a_b_content",
            "tagTitle_a_c": tagInfoaccumulated,
            "tagTitle_a_d": "tagTitle_a_d_content",
            "tagTitle_b_a": "tagTitle_b_a_content",
            "tagTitle_b_b": "tagTitle_b_b_content",
            "tagTitle_b_d": "tagTitle_b_d_content",
            "tagTitle_c_a": "tagTitle_c_a_content",
            "tagTitle_c_b": "tagTitle_c_b_content",
            "tagTitle_c_d": "tagTitle_c_d_content",
        });

        const deckstestdata: FlashCard[] = [
            ...testDeck_a().cards,
            testCard_b_001_afterMerge_notCommulative(),
            testCard_b_002_afterMerge_notCommulative(),
            testCard_b_003_afterMerge_notCommulative(),
            testCard_c_001_afterMerge_notCommulative(),
            testCard_c_002_afterMerge_notCommulative(),
            testCard_c_003_afterMerge_notCommulative()
        ];
        const testdataHashcode: string[] = deckstestdata.map(cards => getHashCodeCard(cards));
        const readlCardsHash: string[] = merged.cards.map(cards => getHashCodeCard(cards));
        expect(readlCardsHash).toEqual(testdataHashcode);
    });
});
*/

/*
describe("mergeDecksMain method", () => {
    it("should appropriately merge flash card decks in function " +
        "mergeDecksHigherAbstraction_copyFirstOccurrenceOfTagsAndDeckInfo_Main", () => {
        const deckList: FlashCardDeck[] = testDeckList();

        const merged: FlashCardDeck = mergeDecksHigherAbstraction_copyFirstOccurrenceOfTags_Main(deckList,
            "newtitle",
            "newinfo");

        // Write your expect statements based on the expected output
        // For example:
        expect(merged.cards.length).toBe(4);
        // Other expect statements based on your function implementation
    });
});
*/

/*
describe("mergeDecksMain method", () => {
    it("should appropriately merge flash card decks in function " +
        "mergeDecksHigherAbstraction_accreteOccurrenceOfTagsAndInfo_Main", () => {
        const deckList: FlashCardDeck[] = testDeckList();

        const merged: FlashCardDeck = mergeDecksHigherAbstraction_accreteOccurrenceOfTagsAndInfo_Main(deckList,
            "newtitle",
            "newinfo");

        // Write your expect statements based on the expected output
        // For example:
        expect(merged.cards.length).toBe(4);
        // Other expect statements based on your function implementation
    });
});
*/


/*
FlashCard {
cardNumber: number;
cardName: string;
frontSide: string;
backSide: string;
primaryInfo: string;
secondaryInfo: string;
notableCards: number[];
dateOfLastReview: string;
repetitionValue: number;
repetitionHistory: number[];
tags: string[];
*/

