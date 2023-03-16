import {FlashCard} from "../../interfaces/flashcard";

export const calculateFilter = (inp: FlashCard[], localTagsFilter: Record<string, string>):　number[] => {
    var result: number[] = []
    const allNumbersFromRecord: number[] = Object.keys(localTagsFilter).map(Number).sort()
    var stringsToHandle: string[] = []
    for (var num in allNumbersFromRecord) {
        const str: string = localTagsFilter[num.toString()]
    }

    return []
}

/*
const test_flashcardsForTesting = (): FlashCard[] => {
  var card1: FlashCard = test_generateCard(1, ["t1-8"])
  var card2: FlashCard = test_generateCard(2, ["t1-8", "t2-8"])
  var card3: FlashCard = test_generateCard(3, ["t1-8", "t2-8", "t3-8"])
  var card4: FlashCard = test_generateCard(4, ["t1-8", "t2-8", "t3-8", "t4-8"])
  var card5: FlashCard = test_generateCard(5, ["t1-8", "t2-8", "t3-8", "t4-8", "t5-8"])
  var card6: FlashCard = test_generateCard(6, ["t1-8", "t2-8", "t3-8", "t4-8", "t5-8", "t6-8"])
  var card7: FlashCard = test_generateCard(7, ["t1-8", "t2-8", "t3-8", "t4-8", "t5-8", "t6-8", "t7-8"])
  var card8: FlashCard = test_generateCard(8, ["t1-8", "t2-8", "t3-8", "t4-8", "t5-8", "t6-8", "t7-8", "t8-8"])
  return [card1, card2, card3, card4, card5, card6, card7, card8]
}

test("test flash card filtering", () => {
  var rec: Record<string, string> = {}
  rec["1"] = "t2-8 ONLY"
  rec["2"] = "t3-8 NOTHING"
  rec["3"] = "t6-8 INCLUDE"
  rec["4"] = "t4-8 EXCLUDE"
  const inp: FlashCard[] = test_flashcardsForTesting()

      ///, localTagsFilter: Record<string, string>
  const filteringCalc: number[] = calculateFilter(inp, rec)
  expect(filteringCalc).toBe([2, 3, 6, 7, 8])
*/