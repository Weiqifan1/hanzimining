import {FlashCardDeck} from "../../interfaces/flashcarddeck";
import {FlashCard} from "../../interfaces/flashcard";


export const testDeckList = (): FlashCardDeck[] => [testDeck_a(), testDeck_b(), testDeck_c()]

export const testDeck_a = (): FlashCardDeck => {
    const deck: FlashCardDeck = {
        deckName: "Deck a",
        deckInfo: "deck a info",
        settings: {},
        tags: {
            "tagTitle_a_a": "tagTitle_a_a_content",
            "tagTitle_a_b": "tagTitle_a_b_content",
            "tagTitle_a_c": "tagTitle_a_c_content_valiantFromA",
            "tagTitle_a_d": "tagTitle_a_d_content"
        },
        cards: [testCard_a_001(), testCard_a_002(), testCard_a_003()]
    };
    return deck;
}

export const testDeck_b = (): FlashCardDeck => {
    const deck: FlashCardDeck = {
        deckName: "Deck b",
        deckInfo: "deck b info",
        settings: {},
        tags: {
            "tagTitle_b_a": "tagTitle_b_a_content",
            "tagTitle_b_b": "tagTitle_b_b_content",
            "tagTitle_a_c": "tagTitle_a_c_content_valiantFromB",
            "tagTitle_b_d": "tagTitle_b_d_content"
        },
        cards: [testCard_b_001(), testCard_b_002(), testCard_b_003()]
    };
    return deck;
}

export const testDeck_c = (): FlashCardDeck => {
    const deck: FlashCardDeck = {
        deckName: "Deck c",
        deckInfo: "deck c info",
        settings: {},
        tags: {
            "tagTitle_c_a": "tagTitle_c_a_content",
            "tagTitle_c_b": "tagTitle_c_b_content",
            "tagTitle_a_c": "tagTitle_a_c_content_variantFromC",
            "tagTitle_c_d": "tagTitle_c_d_content"
        },
        cards: [testCard_c_001(), testCard_c_002(), testCard_c_003()]
    };
    return deck;
}

const testCard_a_001 = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 1,
        cardName: "card_a_1",
        frontSide: "card_a_1_front",
        backSide: "card_a_1_back",
        primaryInfo: "card_a_1_primaryinfo",
        secondaryInfo: "card_a_1_secondaryinfo",
        notableCards: [],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_a_a", "tagTitle_a_b"]
    }
    return card;
}

const testCard_a_002 = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 2,
        cardName: "card_a_2",
        frontSide: "card_a_2_front",
        backSide: "card_a_2_back",
        primaryInfo: "card_a_2_primaryinfo",
        secondaryInfo: "card_a_2_secondaryinfo",
        notableCards: [3],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_a_b", "tagTitle_a_c"]
    }
    return card;
}

const testCard_a_003 = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 3,
        cardName: "card_a_3",
        frontSide: "card_a_3_front",
        backSide: "card_a_3_back",
        primaryInfo: "card_a_3_primaryinfo",
        secondaryInfo: "card_a_3_secondaryinfo",
        notableCards: [1,2],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_a_c", "tagTitle_a_d"]
    }
    return card;
}

//TODO: update the a b and c cards to have notable cards, and then create after-merge versions of b and c cards
const testCard_b_001 = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 1,
        cardName: "card_b_1",
        frontSide: "card_b_1_front",
        backSide: "card_b_1_back",
        primaryInfo: "card_b_1_primaryinfo",
        secondaryInfo: "card_b_1_secondaryinfo",
        notableCards: [],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_b_a", "tagTitle_b_b"]
    }
    return card;
}

const testCard_b_002 = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 2,
        cardName: "card_b_2",
        frontSide: "card_b_2_front",
        backSide: "card_b_2_back",
        primaryInfo: "card_b_2_primaryinfo",
        secondaryInfo: "card_b_2_secondaryinfo",
        notableCards: [3],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_b_b", "tagTitle_a_c"]
    }
    return card;
}

const testCard_b_003 = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 3,
        cardName: "card_b_3",
        frontSide: "card_b_3_front",
        backSide: "card_b_3_back",
        primaryInfo: "card_b_3_primaryinfo",
        secondaryInfo: "card_b_3_secondaryinfo",
        notableCards: [1,2],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_a_c", "tagTitle_b_d"]
    }
    return card;
}

const testCard_c_001 = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 1,
        cardName: "card_c_1",
        frontSide: "card_c_1_front",
        backSide: "card_c_1_back",
        primaryInfo: "card_c_1_primaryinfo",
        secondaryInfo: "card_c_1_secondaryinfo",
        notableCards: [],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_c_a", "tagTitle_c_b"]
    }
    return card;
}

const testCard_c_002 = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 2,
        cardName: "card_c_2",
        frontSide: "card_c_2_front",
        backSide: "card_c_2_back",
        primaryInfo: "card_c_2_primaryinfo",
        secondaryInfo: "card_c_2_secondaryinfo",
        notableCards: [3],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_c_b", "tagTitle_a_c"]
    }
    return card;
}

const testCard_c_003 = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 3,
        cardName: "card_c_3",
        frontSide: "card_c_3_front",
        backSide: "card_c_3_back",
        primaryInfo: "card_c_3_primaryinfo",
        secondaryInfo: "card_c_3_secondaryinfo",
        notableCards: [1,2],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_a_c", "tagTitle_c_d"]
    }
    return card;
}

//*********************  test cards ***************************

export const testCard_b_001_afterMerge_notCommulative = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 4,
        cardName: "card_b_1",
        frontSide: "card_b_1_front",
        backSide: "card_b_1_back",
        primaryInfo: "card_b_1_primaryinfo",
        secondaryInfo: "card_b_1_secondaryinfo",
        notableCards: [],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_b_a", "tagTitle_b_b"]
    }
    return card;
}

export const testCard_b_002_afterMerge_notCommulative = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 5,
        cardName: "card_b_2",
        frontSide: "card_b_2_front",
        backSide: "card_b_2_back",
        primaryInfo: "card_b_2_primaryinfo",
        secondaryInfo: "card_b_2_secondaryinfo",
        notableCards: [6],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_b_b", "tagTitle_a_c"]
    }
    return card;
}

export const testCard_b_003_afterMerge_notCommulative = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 6,
        cardName: "card_b_3",
        frontSide: "card_b_3_front",
        backSide: "card_b_3_back",
        primaryInfo: "card_b_3_primaryinfo",
        secondaryInfo: "card_b_3_secondaryinfo",
        notableCards: [4,5],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_a_c", "tagTitle_b_d"]
    }
    return card;
}

export const testCard_c_001_afterMerge_notCommulative = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 7,
        cardName: "card_c_1",
        frontSide: "card_c_1_front",
        backSide: "card_c_1_back",
        primaryInfo: "card_c_1_primaryinfo",
        secondaryInfo: "card_c_1_secondaryinfo",
        notableCards: [],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_c_a", "tagTitle_c_b"]
    }
    return card;
}

export const testCard_c_002_afterMerge_notCommulative = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 8,
        cardName: "card_c_2",
        frontSide: "card_c_2_front",
        backSide: "card_c_2_back",
        primaryInfo: "card_c_2_primaryinfo",
        secondaryInfo: "card_c_2_secondaryinfo",
        notableCards: [9],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_c_b", "tagTitle_a_c"]
    }
    return card;
}

export const testCard_c_003_afterMerge_notCommulative = (): FlashCard => {
    const card: FlashCard = {
        cardNumber: 9,
        cardName: "card_c_3",
        frontSide: "card_c_3_front",
        backSide: "card_c_3_back",
        primaryInfo: "card_c_3_primaryinfo",
        secondaryInfo: "card_c_3_secondaryinfo",
        notableCards: [7,8],
        dateOfLastReview: "",
        repetitionValue: 0,
        repetitionHistory: [],
        tags: ["tagTitle_a_c", "tagTitle_c_d"]
    }
    return card;
}

