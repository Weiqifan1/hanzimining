import React, { useState } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {FlashCardDeck} from "../interfaces/flashcarddeck";
//import { FlashCardDeck } from './FlashCardDeck'; // Assume this is where you import from

type Props = {
    handleContent: (decks: FlashCardDeck[]) => void,
    // other props as needed
};


const FileInputMergeFiles: React.FC<Props> = ({ handleContent }) => {

    //lav mappen om til: Map<number, [string, FlashCardDeck | null]>
    const [flashCardDecks, setFlashCardDecks] =
        useState<Map<string, [number, FlashCardDeck | null]>>(new Map());

    function updateDeckState(deck: Map<string, [number, FlashCardDeck | null]>) {
        setFlashCardDecks(deck);
        const flatDeck = getArrayOfFlashCardDeck(deck);
        handleContent(flatDeck);
    }

    function getHashCode(deck: FlashCardDeck): string {
        // Convert object to string
        // You might want to select certain properties of the `FlashCardDeck` object if not all are needed
        let str = JSON.stringify(deck);

        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
        }
        return hash.toString();
    }

    const readAndParseFile = (file: any): Promise<FlashCardDeck | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = (event) => {
                let data: FlashCardDeck | null = null;
                if (event.target?.readyState == FileReader.DONE) {
                    let strToParse: string | ArrayBuffer | null = event.target.result;
                    try {
                        if (strToParse != null) {
                            data = JSON.parse(String(strToParse));
                        }
                    } catch (e) {
                        console.error('Could not parse JSON from file');
                    }
                    resolve(data);  // Move this
                }
            };
            reader.onerror = () => {
                console.error('File could not be read');
                reject();
            };
            reader.readAsText(file.file);
        });
    }

    function getArrayOfFlashCardDeck(myMap: Map<string, [number, FlashCardDeck | null]>): FlashCardDeck[] {
        // Transform map values into an array
        let mapValues: [number, FlashCardDeck | null][] = Array.from(myMap.values());
        let sortedArray: [number, FlashCardDeck | null][] =
            mapValues.sort((a, b) => a[0] - b[0]);
        // Filter out tuples where the second element is null
        let filteredArray: FlashCardDeck[] = sortedArray
            .filter((item): item is [number, FlashCardDeck] => item[1] !== null)
            .map(item => item[1] as FlashCardDeck);
        return filteredArray;
    }

    const handleProcessedFile = async (error: any, file: any) => {
        //const data: FlashCardDeck | null = readAndParseFile(error, file);
        const data: FlashCardDeck | null = await readAndParseFile(file);
        if (data) {
            let deck: Map<string, [number, FlashCardDeck | null]> = flashCardDecks;
            let hashCodeOfDeck: string = getHashCode(data);
            deck.set(hashCodeOfDeck, [flashCardDecks.size, data]);
            updateDeckState(deck);
        }
    }

    const handleRemoveFile = async (error: any, file: any) => {
        //const data: FlashCardDeck | null = readAndParseFile(error, file);
        const data: FlashCardDeck | null = await readAndParseFile(file);
        if (data) {
            let hashCodeOfDeck: string = getHashCode(data);
            var deckToChange: Map<string, [number, FlashCardDeck | null]> = flashCardDecks;
            if (deckToChange.has(hashCodeOfDeck)) {
                let oldValue = deckToChange.get(hashCodeOfDeck);
                if (!(oldValue) || oldValue[0] === undefined) {
                    console.log(`Old value in deck has undefined index`);
                } else {
                    const oldIndexNumber: number = oldValue[0];
                    // Set the new value for this key in the map
                    deckToChange.set(hashCodeOfDeck, [oldIndexNumber, null]);
                    updateDeckState(deckToChange);
                }
            } else {
                console.log(`Deck named: ${data.deckName} is not found in the map.`);
            }
        }
    }


    return (
        <div>
            <FilePond
                allowMultiple={true}
                acceptedFileTypes={['application/json']} // If files are JSON
                onaddfile={handleProcessedFile}
                onremovefile={handleRemoveFile}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </div>
    );
};

export default FileInputMergeFiles;



