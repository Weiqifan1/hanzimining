import React from 'react';
import { render, screen } from '@testing-library/react';
import {addNewCardToDeck} from '../src/state/reducers/characterSRSreducer'
import App from './App';
import {FlashCard} from "./interfaces/flashcard";
import {FlashCardDeck} from "./interfaces/flashcarddeck";
import {deleteOrEditCardOrder} from '../src/state/reducers/characterSRSreducer'
import {generateAllLinesDeck} from "./applogic/pageHelpers/createDeckHelper";

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

const test_createDeckHelpers_basicMultilineText = (): string => {
  return "cardname1\nfrontside1\nbackside1\n" +
      "primaryinfo1\nsecondaryinfo1\nnotablecards1\ntags1\n" +
      "\n" +
      "{cardname2a\ncardname2b}\nfrontside2\n{backside2a\n  \n\nbackside2b\nbackside2c\n\n}\n" +
      "primaryinfo2\n{secondaryinfo2}\n{notablecards2}\n{tags2a tags2b   tags2c tags2d  }\n" +
      "\n\n\n\n\n" +
      "{cardname3a\ncardname3b}\n{frontside3a\n   frontside3b  }\n\n" +
      "primaryinfo3\n{secondaryinfo3}\n{notablecards3}\n{tags3a tags3b   tags3c tags3d  }\n" +
      "\n" +
      "cardname4\nfrontside4\nbackside4\n" +
      "primaryinfo4\nsecondaryinfo4\nnotablecards4\ntags4\n"
}

test('test createDeckHelpers generateAllLinesDeck', () => {
  const inputtext: string = test_createDeckHelpers_basicMultilineText()
  const result: FlashCardDeck = generateAllLinesDeck(inputtext, "deckname...", "deckInfo...")

  expect(5).toBe(5)
})

test('test delteOrChangeOrder, changeOrder - late to early', () => {
  const changeOrder: string = "5,2"
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards_forOrderChange()
  }

  const returnVal: FlashCardDeck = deleteOrEditCardOrder("",changeOrder, characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(5)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)
  expect(retcards[2].cardNumber).toBe(3)
  expect(retcards[3].cardNumber).toBe(4)
  expect(retcards[4].cardNumber).toBe(5)

  expect(retcards[0].cardName).toBe("card1")
  expect(retcards[1].cardName).toBe("card5")
  expect(retcards[2].cardName).toBe("card2")
  expect(retcards[3].cardName).toBe("card3")
  expect(retcards[4].cardName).toBe("card4")

  expect(retcards[0].notableCards.toString()).toBe("3,4")//old "2,3" -> "3,4" => "3,4"
  expect(retcards[1].notableCards.toString()).toBe("4,5")//old "3,4" -> "4,5" => "4,5"
  expect(retcards[2].notableCards.toString()).toBe("1,4")//old "1,3" -> "1,4" => "1,4"
  expect(retcards[3].notableCards.toString()).toBe("3,5")//old "2,4" -> "3,5" => "3,5"
  expect(retcards[4].notableCards.toString()).toBe("2,4")//old "3,5" -> "4,2" => "2,4"
})

test('test delteOrChangeOrder, changeOrder - early to late', () => {
  const changeOrder: string = "2,5"
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards_forOrderChange()
  }

  const returnVal: FlashCardDeck = deleteOrEditCardOrder("",changeOrder, characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(5)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)
  expect(retcards[2].cardNumber).toBe(3)
  expect(retcards[3].cardNumber).toBe(4)
  expect(retcards[4].cardNumber).toBe(5)

  expect(retcards[0].cardName).toBe("card1")
  expect(retcards[1].cardName).toBe("card3")
  expect(retcards[2].cardName).toBe("card4")
  expect(retcards[3].cardName).toBe("card5")
  expect(retcards[4].cardName).toBe("card2")

  expect(retcards[0].notableCards.toString()).toBe("2,5")//old "2,3" -> "2,3" => 5,2
  expect(retcards[1].notableCards.toString()).toBe("3,5")//old "1,3" -> "2,4" => 5,3
  expect(retcards[2].notableCards.toString()).toBe("2,4")//old "2,4" -> "3,5" => 4,2
  expect(retcards[3].notableCards.toString()).toBe("2,3")//old "3,5" -> "3,4" => 2,3
  expect(retcards[4].notableCards.toString()).toBe("1,2")//old "3,4" -> "1,3" => 1,2
})


///////////////////////  delteOrChangeOrder //////////////////////////

test('test delteOrChangeOrder, delete - card range middle', () => {
  const deleteCards: string = "2-4"
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards()
  }

  const returnVal: FlashCardDeck = deleteOrEditCardOrder(deleteCards, "", characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(2)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)

  expect(retcards[0].cardName).toBe("card1")
  expect(retcards[1].cardName).toBe("card5")

  expect(retcards[0].notableCards.toString()).toBe("2")
  expect(retcards[1].notableCards.toString()).toBe("1")
})

test('test delteOrChangeOrder, delete - card range in beginning', () => {
  const deleteCards: string = "1-3"
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards()
  }

  const returnVal: FlashCardDeck = deleteOrEditCardOrder(deleteCards, "", characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(2)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)

  expect(retcards[0].cardName).toBe("card4")
  expect(retcards[1].cardName).toBe("card5")

  expect(retcards[0].notableCards.toString()).toBe("2")
  expect(retcards[1].notableCards.toString()).toBe("1")
})

test('test delteOrChangeOrder, delete - card rannge at the end', () => {
  const deleteCards: string = "3-5"
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards()
  }

  const returnVal: FlashCardDeck = deleteOrEditCardOrder(deleteCards, "", characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(2)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)

  expect(retcards[0].cardName).toBe("card1")
  expect(retcards[1].cardName).toBe("card2")

  expect(retcards[0].notableCards.toString()).toBe("2")
  expect(retcards[1].notableCards.toString()).toBe("1")
})

test('test delteOrChangeOrder, delete - single card', () => {
  const deleteCards: string = "3"
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards()
  }

  const returnVal: FlashCardDeck = deleteOrEditCardOrder(deleteCards, "", characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(4)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)
  expect(retcards[2].cardNumber).toBe(3)
  expect(retcards[3].cardNumber).toBe(4)

  expect(retcards[0].cardName).toBe("card1")
  expect(retcards[1].cardName).toBe("card2")
  expect(retcards[2].cardName).toBe("card4")
  expect(retcards[3].cardName).toBe("card5")

  expect(retcards[0].notableCards.toString()).toBe("2,3,4")
  expect(retcards[1].notableCards.toString()).toBe("1,3,4")
  expect(retcards[2].notableCards.toString()).toBe("1,2,4")
  expect(retcards[3].notableCards.toString()).toBe("1,2,3")
})


//////////////////////// addNewCardToDeck /////////////////


test('test addNewCard, simpel', () => {
  const newCards: FlashCard[] = generateCard6()
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards()
  }
  const returnVal = addNewCardToDeck(newCards, characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(6)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)
  expect(retcards[2].cardNumber).toBe(3)
  expect(retcards[3].cardNumber).toBe(4)
  expect(retcards[4].cardNumber).toBe(5)
  expect(retcards[5].cardNumber).toBe(6)

  expect(retcards[0].cardName).toBe("card1")
  expect(retcards[1].cardName).toBe("card2")
  expect(retcards[2].cardName).toBe("card3")
  expect(retcards[3].cardName).toBe("card4")
  expect(retcards[4].cardName).toBe("card5")
  expect(retcards[5].cardName).toBe("card6")

  expect(retcards[0].notableCards.toString()).toBe("2,3,4,5")
  expect(retcards[1].notableCards.toString()).toBe("1,3,4,5")
  expect(retcards[2].notableCards.toString()).toBe("1,2,4,5")
  expect(retcards[3].notableCards.toString()).toBe("1,2,3,5")
  expect(retcards[4].notableCards.toString()).toBe("1,2,3,4")
  expect(retcards[5].notableCards.toString()).toBe("")
})

test('test addNewCard, minus one card number', () => {
  const newCards: FlashCard[] = generateCardMinus1()
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards()
  }
  const returnVal = addNewCardToDeck(newCards, characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(6)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)
  expect(retcards[2].cardNumber).toBe(3)
  expect(retcards[3].cardNumber).toBe(4)
  expect(retcards[4].cardNumber).toBe(5)
  expect(retcards[5].cardNumber).toBe(6)

  expect(retcards[0].cardName).toBe("card1")
  expect(retcards[1].cardName).toBe("card2")
  expect(retcards[2].cardName).toBe("card3")
  expect(retcards[3].cardName).toBe("card4")
  expect(retcards[4].cardName).toBe("card5")
  expect(retcards[5].cardName).toBe("cardMinus1")

  expect(retcards[0].notableCards.toString()).toBe("2,3,4,5")
  expect(retcards[1].notableCards.toString()).toBe("1,3,4,5")
  expect(retcards[2].notableCards.toString()).toBe("1,2,4,5")
  expect(retcards[3].notableCards.toString()).toBe("1,2,3,5")
  expect(retcards[4].notableCards.toString()).toBe("1,2,3,4")
  expect(retcards[5].notableCards.toString()).toBe("")
})

test('test addNewCard, too large card number', () => {
  const newCards: FlashCard[] = generateCard1000()
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards()
  }
  const returnVal = addNewCardToDeck(newCards, characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(6)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)
  expect(retcards[2].cardNumber).toBe(3)
  expect(retcards[3].cardNumber).toBe(4)
  expect(retcards[4].cardNumber).toBe(5)
  expect(retcards[5].cardNumber).toBe(6)

  expect(retcards[0].cardName).toBe("card1")
  expect(retcards[1].cardName).toBe("card2")
  expect(retcards[2].cardName).toBe("card3")
  expect(retcards[3].cardName).toBe("card4")
  expect(retcards[4].cardName).toBe("card5")
  expect(retcards[5].cardName).toBe("card1000")

  expect(retcards[0].notableCards.toString()).toBe("2,3,4,5")
  expect(retcards[1].notableCards.toString()).toBe("1,3,4,5")
  expect(retcards[2].notableCards.toString()).toBe("1,2,4,5")
  expect(retcards[3].notableCards.toString()).toBe("1,2,3,5")
  expect(retcards[4].notableCards.toString()).toBe("1,2,3,4")
  expect(retcards[5].notableCards.toString()).toBe("")
})

test('test addNewCard, add card to middle of deck', () => {
  const newCards: FlashCard[] = generateNewCard3()
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards()
  }
  const returnVal = addNewCardToDeck(newCards, characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(6)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)
  expect(retcards[2].cardNumber).toBe(3)
  expect(retcards[3].cardNumber).toBe(4)
  expect(retcards[4].cardNumber).toBe(5)
  expect(retcards[5].cardNumber).toBe(6)

  expect(retcards[0].cardName).toBe("card1")
  expect(retcards[1].cardName).toBe("card2")
  expect(retcards[2].cardName).toBe("cardNew")
  expect(retcards[3].cardName).toBe("card3")
  expect(retcards[4].cardName).toBe("card4")
  expect(retcards[5].cardName).toBe("card5")

  expect(retcards[0].notableCards.toString()).toBe("2,4,5,6")
  expect(retcards[1].notableCards.toString()).toBe("1,4,5,6")
  expect(retcards[2].notableCards.toString()).toBe("")
  expect(retcards[3].notableCards.toString()).toBe("1,2,5,6")
  expect(retcards[4].notableCards.toString()).toBe("1,2,4,6")
  expect(retcards[5].notableCards.toString()).toBe("1,2,4,5")
})

test('test addNewCard, add multiple cards to deck', () => {
  const newCards: FlashCard[] = generate3NewCard24and5()
  const characterSRSObject: FlashCardDeck = {
    deckName: "deckName",
    deckInfo: "deckInfo",
    settings: {},
    tags: {},
    cards: generateOldDeckCards()
  }
  const returnVal = addNewCardToDeck(newCards, characterSRSObject)
  const retcards = returnVal.cards
  expect(retcards.length).toBe(8)
  expect(retcards[0].cardNumber).toBe(1)
  expect(retcards[1].cardNumber).toBe(2)
  expect(retcards[2].cardNumber).toBe(3)
  expect(retcards[3].cardNumber).toBe(4)
  expect(retcards[4].cardNumber).toBe(5)
  expect(retcards[5].cardNumber).toBe(6)
  expect(retcards[6].cardNumber).toBe(7)
  expect(retcards[7].cardNumber).toBe(8)

  expect(retcards[0].cardName).toBe("card1")
  expect(retcards[1].cardName).toBe("cardNew")
  expect(retcards[2].cardName).toBe("card2")
  expect(retcards[3].cardName).toBe("cardNew")
  expect(retcards[4].cardName).toBe("cardNew")
  expect(retcards[5].cardName).toBe("card3")
  expect(retcards[6].cardName).toBe("card4")
  expect(retcards[7].cardName).toBe("card5")

  expect(retcards[0].notableCards.toString()).toBe("3,6,7,8")
  expect(retcards[1].notableCards.toString()).toBe("")
  expect(retcards[2].notableCards.toString()).toBe("1,6,7,8")
  expect(retcards[3].notableCards.toString()).toBe("")
  expect(retcards[4].notableCards.toString()).toBe("")
  expect(retcards[5].notableCards.toString()).toBe("1,3,7,8")
  expect(retcards[6].notableCards.toString()).toBe("1,3,6,8")
  expect(retcards[7].notableCards.toString()).toBe("1,3,6,7")
})

function generateNewCard3() {
  const cardNew: FlashCard = {
    cardNumber: 3,
    cardName: "cardNew",
    frontSide: "cardNewFront",
    backSide: "cardNewBack",
    primaryInfo: "cardNewPrim",
    secondaryInfo: "cardNewsec",
    notableCards: [],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  return [cardNew];
}

function generateCard6() {
  const card6: FlashCard = {
    cardNumber: 6,
    cardName: "card6",
    frontSide: "card6Front",
    backSide: "card6Back",
    primaryInfo: "card6Prim",
    secondaryInfo: "card6sec",
    notableCards: [],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  return [card6];
}


function generateCardMinus1() {
  const cardMinus1: FlashCard = {
    cardNumber: -1,
    cardName: "cardMinus1",
    frontSide: "cardMinus1Front",
    backSide: "cardMinus1Back",
    primaryInfo: "cardMinus1Prim",
    secondaryInfo: "cardMinus1sec",
    notableCards: [],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  return [cardMinus1];
}

function generateCard1000() {
  const card1000: FlashCard = {
    cardNumber: 1000,
    cardName: "card1000",
    frontSide: "card1000Front",
    backSide: "card1000Back",
    primaryInfo: "card1000Prim",
    secondaryInfo: "card1000sec",
    notableCards: [],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  return [card1000];
}

function generate3NewCard24and5() {
  const cardNew2: FlashCard = {
    cardNumber: 2,
    cardName: "cardNew",
    frontSide: "cardNewFront",
    backSide: "cardNewBack",
    primaryInfo: "cardNewPrim",
    secondaryInfo: "cardNewsec",
    notableCards: [],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }

  const cardNew4: FlashCard = {
    cardNumber: 4,
    cardName: "cardNew",
    frontSide: "cardNewFront",
    backSide: "cardNewBack",
    primaryInfo: "cardNewPrim",
    secondaryInfo: "cardNewsec",
    notableCards: [],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }

  const cardNew5: FlashCard = {
    cardNumber: 5,
    cardName: "cardNew",
    frontSide: "cardNewFront",
    backSide: "cardNewBack",
    primaryInfo: "cardNewPrim",
    secondaryInfo: "cardNewsec",
    notableCards: [],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  return [cardNew2, cardNew4, cardNew5];
}

function generateOldDeckCards(): FlashCard[] {
  const card1: FlashCard = {
    cardNumber: 1,
    cardName: "card1",
    frontSide: "card1Front",
    backSide: "card1Back",
    primaryInfo: "card1Prim",
    secondaryInfo: "card1sec",
    notableCards: [2,3,4,5],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  const card2: FlashCard = {
    cardNumber: 2,
    cardName: "card2",
    frontSide: "card2Front",
    backSide: "card2Back",
    primaryInfo: "card2Prim",
    secondaryInfo: "card2sec",
    notableCards: [1,3,4,5],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  const card3: FlashCard = {
    cardNumber: 3,
    cardName: "card3",
    frontSide: "card3Front",
    backSide: "card3Back",
    primaryInfo: "card3Prim",
    secondaryInfo: "card3sec",
    notableCards: [1,2,4,5],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  const card4: FlashCard = {
    cardNumber: 4,
    cardName: "card4",
    frontSide: "card4Front",
    backSide: "card4Back",
    primaryInfo: "card4Prim",
    secondaryInfo: "card4sec",
    notableCards: [1,2,3,5],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  const card5: FlashCard = {
    cardNumber: 5,
    cardName: "card5",
    frontSide: "card5Front",
    backSide: "card5Back",
    primaryInfo: "card5Prim",
    secondaryInfo: "card5sec",
    notableCards: [1,2,3,4],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  return [card1,card2,card3,card4,card5];
}

function generateOldDeckCards_forOrderChange(): FlashCard[] {
  const card1: FlashCard = {
    cardNumber: 1,
    cardName: "card1",
    frontSide: "card1Front",
    backSide: "card1Back",
    primaryInfo: "card1Prim",
    secondaryInfo: "card1sec",
    notableCards: [2,3],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  const card2: FlashCard = {
    cardNumber: 2,
    cardName: "card2",
    frontSide: "card2Front",
    backSide: "card2Back",
    primaryInfo: "card2Prim",
    secondaryInfo: "card2sec",
    notableCards: [1,3],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  const card3: FlashCard = {
    cardNumber: 3,
    cardName: "card3",
    frontSide: "card3Front",
    backSide: "card3Back",
    primaryInfo: "card3Prim",
    secondaryInfo: "card3sec",
    notableCards: [2,4],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  const card4: FlashCard = {
    cardNumber: 4,
    cardName: "card4",
    frontSide: "card4Front",
    backSide: "card4Back",
    primaryInfo: "card4Prim",
    secondaryInfo: "card4sec",
    notableCards: [3,5],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  const card5: FlashCard = {
    cardNumber: 5,
    cardName: "card5",
    frontSide: "card5Front",
    backSide: "card5Back",
    primaryInfo: "card5Prim",
    secondaryInfo: "card5sec",
    notableCards: [3,4],
    dateOfLastReview: "0001-01-01",
    repetitionValue: 0,
    repetitionHistory: [],
    tags: []
  }
  return [card1,card2,card3,card4,card5];
}


//slut
