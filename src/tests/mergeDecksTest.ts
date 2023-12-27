
import {FlashCardDeck} from "../interfaces/flashcarddeck";
import {testDeckList} from "./FlashCardDeckTestData";
import {
    mergeDecksHigherAbstraction_accreteOccurrenceOfTagsAndInfo_Main,
    mergeDecksHigherAbstraction_copyFirstOccurrenceOfTagsAndDeckInfo_Main,
    mergeDecksNoAbstraction_accreteOccurrenceOfTagsAndInfo_Main,
    mergeDecksNoAbstraction_copyFirstOccurrenceOfTagsAndDeckInfo_Main
} from "../applogic/characterSRSlogic/mergeDecks/mergeDecksBoundary";

describe("mergeDecksMain method", () => {
    it("should appropriately merge flash card decks in function " +
        "mergeDecksNoAbstraction_accreteOccurrenceOfTagsAndInfo_Main", () => {
        const deckList: FlashCardDeck[] = testDeckList();

        const merged: FlashCardDeck = mergeDecksNoAbstraction_accreteOccurrenceOfTagsAndInfo_Main(deckList,
            "newtitle",
            "newinfo");

        // Write your expect statements based on the expected output
        // For example:
        expect(merged.cards.length).toBe(4);
        // Other expect statements based on your function implementation
    });
});


describe("mergeDecksMain method", () => {
    it("should appropriately merge flash card decks in function " +
        "mergeDecksNoAbstraction_copyFirstOccurrenceOfTagsAndDeckInfo_Main", () => {
        const deckList: FlashCardDeck[] = testDeckList();

        const merged: FlashCardDeck = mergeDecksNoAbstraction_copyFirstOccurrenceOfTagsAndDeckInfo_Main(deckList,
            "newtitle",
            "newinfo");

        // Write your expect statements based on the expected output
        // For example:
        expect(merged.cards.length).toBe(4);
        // Other expect statements based on your function implementation
    });
});

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

describe("mergeDecksMain method", () => {
    it("should appropriately merge flash card decks in function " +
        "mergeDecksHigherAbstraction_copyFirstOccurrenceOfTagsAndDeckInfo_Main", () => {
        const deckList: FlashCardDeck[] = testDeckList();

        const merged: FlashCardDeck = mergeDecksHigherAbstraction_copyFirstOccurrenceOfTagsAndDeckInfo_Main(deckList,
            "newtitle",
            "newinfo");

        // Write your expect statements based on the expected output
        // For example:
        expect(merged.cards.length).toBe(4);
        // Other expect statements based on your function implementation
    });
});


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

