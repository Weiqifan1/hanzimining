import {FlashCardDeck} from "../../interfaces/flashcarddeck";
import {FlashCard} from "../../interfaces/flashcard";


function updateDeckNumbers(newDeck: FlashCardDeck, numberOfCardsInOldDeck: number) {
   var newCards: FlashCard[] = []
   for (let i = 0; i < newDeck.cards.length; i++) {
      const currentCard: FlashCard = newDeck.cards[i]
      const currentCardNumber: number = currentCard.cardNumber
      const updatedCard: FlashCard = {...currentCard, cardNumber: currentCardNumber + numberOfCardsInOldDeck}
      newCards.push(updatedCard)
   }
   const updatedDeck: FlashCardDeck = {...newDeck, cards: newCards}
   return updatedDeck;
}

function updateNotableCards(cardNumberUpdated: FlashCardDeck, numberOfCardsInOldDeck: number) {
   var newCards: FlashCard[] = []
   for (let i = 0; i < cardNumberUpdated.cards.length; i++) {
      const currentCard: FlashCard = cardNumberUpdated.cards[i]
      const notableCards: number[] = currentCard.notableCards
      const updatedNotable: number[] = []
      for (let k = 0; k < notableCards.length; k++) {
         const oldNumber: number = notableCards[k]
         const updatedNum: number = oldNumber + numberOfCardsInOldDeck
         updatedNotable.push(updatedNum)
      }
      const updatedCard: FlashCard = {...currentCard, notableCards: updatedNotable}
      newCards.push(updatedCard)
   }
   const updatedDeck: FlashCardDeck = {...cardNumberUpdated, cards: newCards}
   return updatedDeck;
}

function updateTags(oldDeck: FlashCardDeck, notableCardsUpdated: FlashCardDeck): Record<string, string> {
   const oldDeckTags: Record<string, string> = oldDeck.tags
   const oldTagNames: string[] = mapkeys(oldDeckTags)
   const newDeckTags: Record<string, string> = notableCardsUpdated.tags
   const newTagNames: string[] = mapkeys(newDeckTags)

   var allDeckNames = new Set<string>()
   for (let i = 0; i < oldTagNames.length; i++) {
      const name: string = oldTagNames[i]
      allDeckNames.add(name)
   }
   for (let k = 0; k < newTagNames.length; k++) {
      const name: string = newTagNames[k]
      allDeckNames.add(name)
   }
   const allDeckNamesList: string[] = Array.from(allDeckNames.values()).sort()

   var allDeckValuesList: string[] = []
   for (let m = 0; m < allDeckNamesList.length; m++) {
      const currentkey: string = allDeckNamesList[m]
      const oldValue: string | null = oldDeckTags[currentkey]
      const newValue: string | null = newDeckTags[currentkey]
      var updatedValue: string = ""
      if (oldValue != null) {
         updatedValue = oldValue + "\n"
      }
      if (newValue != null) {
         updatedValue = updatedValue + newValue
      }
      allDeckValuesList.push(updatedValue)
   }

   var updatedDeck: Record<string, string> = {}
   for (let o = 0; o < allDeckNamesList.length; o++) {
      const key: string = allDeckNamesList[o]
      const value: string = allDeckValuesList[o]
      updatedDeck[key] = value
   }
   return updatedDeck
}

export function mergeDecks(oldDeck: FlashCardDeck, newDeck: FlashCardDeck): FlashCardDeck {
   const numberOfCardsInOldDeck: number = oldDeck.cards.length
   //write code that update the deck number of the new deck, by incrementing them by the count of old cards
   const cardNumberUpdated: FlashCardDeck = updateDeckNumbers(newDeck, numberOfCardsInOldDeck)

   //write code that update the card references
   const notableCardsUpdated: FlashCardDeck = updateNotableCards(cardNumberUpdated, numberOfCardsInOldDeck)

   //write code that update the tags, so there are no overlaps
   const updatedDeckTags: Record<string, string> = updateTags(oldDeck, notableCardsUpdated)
   var updatedCards: FlashCard[] = oldDeck.cards
   updatedCards = updatedCards.concat(notableCardsUpdated.cards)

   const updatedWholeDeck: FlashCardDeck = {...oldDeck, cards: updatedCards, tags: updatedDeckTags}
   return updatedWholeDeck
}

function mapkeys <K>(m: Map<K, any>): K[]
function mapkeys (m: { [key: string]: any }): string[]
function mapkeys (m: any): any {
   if (m instanceof Map) return Array.from(m.keys())
   return Object.keys(m)
}