import React, {useState} from "react";
import IPage from "../interfaces/page";
import {useDispatch, useSelector} from "react-redux";
import {cardDisplayActionCreator, State} from '../state/index';
import CardListComponent from "../components/CardListComponent"
import {FlashCard} from "../interfaces/flashcard";
import {bindActionCreators} from "redux";
import CardDisplay from "../interfaces/cardDisplay";
import DisplayTags from "../components/DisplayTags";
import TagFilteringComponentList from "../components/TagFilteringComponentList";

const SearchFlashcards: React.FunctionComponent<IPage> = props => {

    const MAXCARDSTODISPLAY: number = 100;

    const characterSRSstate = useSelector(
        (state: State) => state.characterSRS
    )
    const allTagKeys: string[] = Object.keys(characterSRSstate.tags)

    function prepareNumberToDisplaySize(data: number): number{
        return data > MAXCARDSTODISPLAY ? MAXCARDSTODISPLAY : data
    }
    const allCards: FlashCard[] = characterSRSstate.cards.sort(
        function sortByCardNumbers(a: FlashCard, b: FlashCard){
            if (a.cardNumber < b.cardNumber) {return -1; }
            if (a.cardNumber > b.cardNumber) {return 1;}return 0;})

    //tag filtering
    const [localTagsFilter, setLocalTagsFilter] = useState<Record<string, string>>({})
    const [shouldRerender, setShouldRerender] = useState<boolean>(false)
    const doSetLocalTagsFilter = (input: Record<string, string>) => {
        console.log("nyt elem er sat")
        setLocalTagsFilter(input)
        setShouldRerender(!shouldRerender)
    }

    const [displayChars, setDisplayChars] = useState<FlashCard[]>([])
    const [maxCardsToDisplay, setMaxCardsToDisplay] = useState<number>(prepareNumberToDisplaySize(characterSRSstate.cards.length))
    const [numberIntervalFilter, setNumberIntervalFilter] = useState("")
    const handleChangeNumberIntervalFilter = (e: React.FormEvent<HTMLInputElement>) => {setNumberIntervalFilter(e.currentTarget.value)}
    const [tagSubstringFilter, setTagSubstringFilter] = useState("")
    const handleChangeTagSubstringFilter = (e: React.FormEvent<HTMLInputElement>) => {setTagSubstringFilter(e.currentTarget.value)}
    const [fontSideSubstring, setFontSideSubstring] = useState("")
    const handleChangeFrontSideSubstringFilter = (e: React.FormEvent<HTMLInputElement>) => {setFontSideSubstring(e.currentTarget.value)}
    const [backSideSubstring, setBackSideSubstring] = useState("")
    const handleChangeBackSideSubstringFilter = (e: React.FormEvent<HTMLInputElement>) => {setBackSideSubstring(e.currentTarget.value)}

    const dispatch = useDispatch();

    const {cardDisplayChangeState} = bindActionCreators(cardDisplayActionCreator, dispatch)
    const showCardDisplay: CardDisplay = useSelector(
        (state: State) => state.cardDisplay
    )
    var cardDisplayLocalState: CardDisplay = showCardDisplay
    const changeShowPrimaryInformationValue = () => {
        const currentValue: boolean = cardDisplayLocalState.showPrimaryCardInfo
        const updatedValue: CardDisplay = {...cardDisplayLocalState, showPrimaryCardInfo: !currentValue}
        cardDisplayChangeState(updatedValue, cardDisplayLocalState)
    }
    const changeShowSecondaryInformationValue = () => {
        const currentValue: boolean = cardDisplayLocalState.showSecondaryCardInfo
        const updatedValue: CardDisplay = {...cardDisplayLocalState, showSecondaryCardInfo: !currentValue}
        cardDisplayChangeState(updatedValue, cardDisplayLocalState)
    }

    function sortbyIndexNumberAscendingInclUnknown() {
        const sortedByNumber: FlashCard[] = allCards.sort(
            function sortSmallToLarge(a: FlashCard, b: FlashCard){
                if (a.cardNumber < b.cardNumber) {return -1; }
                if (a.cardNumber > b.cardNumber) {return 1;}return 0;})
        filterCards(sortedByNumber, localTagsFilter)
    }

    function filterByTags(inp: FlashCard[], localTagsFilter: Record<string, string>): FlashCard[] {
        console.log("filterByTags")
        return inp;
    }

    const filterCards = (inp: FlashCard[], localTagsFilter: Record<string, string>) => {
        const inputListOfCards: FlashCard[] = filterByTags(inp, localTagsFilter)
        if (numberIntervalFilter.length > 0) {
            const result = displayByInterval(inputListOfCards)
            setDisplayChars(result.slice(0,maxCardsToDisplay))
        }else if (tagSubstringFilter.length > 0){
            const result = displayByChosenTagTitleSubstring(inputListOfCards)
            setDisplayChars(result.slice(0,maxCardsToDisplay))
        }else if (fontSideSubstring){
            const result = displayByFrontSideOfCard(inputListOfCards)
            setDisplayChars(result.slice(0,maxCardsToDisplay))
        }else if (backSideSubstring) {
            const result = displayByBackSideOfCard(inputListOfCards)
            setDisplayChars(result.slice(0,maxCardsToDisplay))
        }else {
            setDisplayChars(inputListOfCards.slice(0,maxCardsToDisplay))
        }
    }

    function removeUnknown(input: FlashCard[]): FlashCard[] {
        const onlyKnown: FlashCard[] = input.filter(x=>x.repetitionValue>0)
        return onlyKnown
    }

    function sortbyIndexNumberAscending() {
        const sortedByNumber: FlashCard[] = removeUnknown(allCards).sort(
            function sortSmallToLarge(a: FlashCard, b: FlashCard){
                if (a.cardNumber < b.cardNumber) {return -1; }
                if (a.cardNumber > b.cardNumber) {return 1;}return 0;})
        setDisplayChars(sortedByNumber.slice(0,maxCardsToDisplay))
    }
    function sortbyIndexNumberDescending() {
        const sortedByNumber: FlashCard[] = removeUnknown(allCards).sort(
            function sortToLargeToSmall(a: FlashCard, b: FlashCard){
                if (a.cardNumber < b.cardNumber) {return 1; }
                if (a.cardNumber > b.cardNumber) {return -1;}return 0;})
        setDisplayChars(sortedByNumber.slice(0,maxCardsToDisplay))
    }

    function sortbyHistorySumDescending() {
        const sortedByHistorySum: FlashCard[] = removeUnknown(allCards).sort((n1,n2) => getSumOfHistory(n1) - getSumOfHistory(n2));
        setDisplayChars(sortedByHistorySum.slice(0,maxCardsToDisplay))
    }

    function getSumOfHistory(item: FlashCard): number {
        const history: number[] = item.repetitionHistory
        if (history === null ||
            history === undefined ||
            history.length == 0) {
            return 0
        }else {
            try {
                const result: number = history.reduce((sum,current) => sum + current, 0)
                return result
            }catch (e) {
                return 0
            }
        }
    }

    function sortByReviewNumberAscending() {
        const sortedByReviewValue: FlashCard[] = removeUnknown(allCards).sort(
            function sortSmallToLarge(a: FlashCard, b: FlashCard){
                if (a.repetitionValue < b.repetitionValue) {return -1; }
                if (a.repetitionValue > b.repetitionValue) {return 1;}return 0;})
        setDisplayChars(sortedByReviewValue.slice(0,maxCardsToDisplay))
    }
    function sortByReviewNumberDescending() {
        const sortedByReviewValue: FlashCard[] = removeUnknown(allCards).sort(
            function sortLargeToSmall(a: FlashCard, b: FlashCard){
                if (a.repetitionValue < b.repetitionValue) {return 1; }
                if (a.repetitionValue > b.repetitionValue) {return -1;}return 0;})
        setDisplayChars(sortedByReviewValue.slice(0,maxCardsToDisplay))
    }

    function sortByLastReviewDateAscending() {
        const sortedByLastReviewDate: FlashCard[] = removeUnknown(allCards).sort(
            function sortSmallToLarge(a: FlashCard, b: FlashCard){
                if (a.dateOfLastReview < b.dateOfLastReview) {return -1; }
                if (a.dateOfLastReview > b.dateOfLastReview) {return 1;}return 0;})
        setDisplayChars(sortedByLastReviewDate.slice(0,maxCardsToDisplay))
    }
    function sortByLastReviewDateDescending() {
        const sortedByLastReviewDate: FlashCard[] = removeUnknown(allCards).sort(
            function sortLargeToSmall(a: FlashCard, b: FlashCard){
                if (a.dateOfLastReview < b.dateOfLastReview) {return 1; }
                if (a.dateOfLastReview > b.dateOfLastReview) {return -1;}return 0;})
        setDisplayChars(sortedByLastReviewDate.slice(0,maxCardsToDisplay))
    }

    function clearData() {
        setDisplayChars([])
    }

    function toggleSize() {
        if (maxCardsToDisplay < characterSRSstate.cards.length) {
            setMaxCardsToDisplay(characterSRSstate.cards.length)
        }else {
            setMaxCardsToDisplay(MAXCARDSTODISPLAY)
        }
    }

    const displayByFrontSideOfCard = (displayChars: FlashCard[]): FlashCard[] => {
        const stringToLookFor: string = fontSideSubstring
        const result: FlashCard[] = displayChars.filter((eachCard) => {
            return eachCard.frontSide.includes(stringToLookFor)
        })
        return result
    }

    const displayByBackSideOfCard = (displayChars: FlashCard[]): FlashCard[] => {
        const stringToLookFor: string = backSideSubstring
        const result: FlashCard[] = displayChars.filter((eachCard) => {
            return eachCard.backSide.includes(stringToLookFor)
        })
        return result
    }

    const displayByInterval = (displayChars: FlashCard[]): FlashCard[] => {
        const stringToLookFor: string[] = numberIntervalFilter.split("-")
        if (stringToLookFor.length===2 && Number(stringToLookFor[0] && Number(stringToLookFor[1]))){
            const result: FlashCard[] = displayChars.filter((eachCard) => {
                return eachCard.cardNumber >= Number(stringToLookFor[0]) && eachCard.cardNumber <= Number(stringToLookFor[1])
            })
            return result
        }else if (stringToLookFor.length === 1 && Number(stringToLookFor[0])) {
            const result: FlashCard[] = displayChars.filter((eachCard) => {
                return eachCard.cardNumber == Number(stringToLookFor[0])
            })
            return result
        }
        return displayChars
    }

    const displayByChosenTagTitleSubstring = (displayChars: FlashCard[]): FlashCard[] => {
        const stringToLookFor: string = tagSubstringFilter//"ball"
        const result: FlashCard[] = displayChars.filter((eachCard) => {
            var substringIsFound: boolean[] = new Array()
            for (let eachArrayKey in eachCard.tags) {
                const eachTag: string = eachCard.tags[eachArrayKey]
                if (eachTag.toString().toLowerCase().includes(stringToLookFor)) {
                    substringIsFound.push(true)
                }
            }
            return substringIsFound.length>0
        })
        return result
    }

    return <section>
        <h1>Search current flashcard Deck</h1>
        <p>number of cards: {characterSRSstate.cards.length}</p>
        <button type="button" onClick={toggleSize}>toggle size {maxCardsToDisplay}</button>
        <button type="button" onClick={clearData}>clear data</button>
        <button type="button" onClick={sortbyIndexNumberAscendingInclUnknown}>sortAllCardsByCharNumberAscending</button>
        <button type="button" onClick={changeShowPrimaryInformationValue}>showPrimary:{cardDisplayLocalState.showPrimaryCardInfo.toString()}</button>
        <button type="button" onClick={changeShowSecondaryInformationValue}>showSecondary:{cardDisplayLocalState.showSecondaryCardInfo.toString()}</button>
        <p></p>
        <button type="button" onClick={sortbyIndexNumberAscending}>sortKnownCardsByCharNumberAscending</button>
        <button type="button" onClick={sortByReviewNumberAscending}>sortKnownCardsByReviewValueAscending</button>
        <button type="button" onClick={sortByLastReviewDateAscending}>sortKnownCardsByLastReviewDateAscending</button>
        <p></p>
        <button type="button" onClick={sortbyHistorySumDescending}>sortKnownCardsByHistorySumDescending</button>
        <button type="button" onClick={sortbyIndexNumberDescending}>sortKnownCardsByCharNumberDescending</button>
        <button type="button" onClick={sortByReviewNumberDescending}>sortKnownCardsByReviewValueDescending</button>
        <button type="button" onClick={sortByLastReviewDateDescending}>sortKnownCardsByLastReviewDateDescending</button>
        <p></p>
        <TagFilteringComponentList deckTagList={allTagKeys} content={localTagsFilter} setfunction={doSetLocalTagsFilter}/>
        <label htmlFor="interval">interval:</label>
        <input type="text" id="interval" name="interval" value={numberIntervalFilter} onChange={handleChangeNumberIntervalFilter} />
        <label htmlFor="fontside">fontside:</label>
        <input type="text" id="fontside" name="fontside" value={fontSideSubstring} onChange={handleChangeFrontSideSubstringFilter} />
        <label htmlFor="backside">backside:</label>
        <input type="text" id="backside" name="backside" value={backSideSubstring} onChange={handleChangeBackSideSubstringFilter} />
        <label htmlFor="tag">tag:</label>
        <input type="text" id="tag" name="tag" value={tagSubstringFilter} onChange={handleChangeTagSubstringFilter} />
        <CardListComponent data={displayChars} cardDisplay={cardDisplayLocalState}/>
    </section>
};


export default SearchFlashcards;