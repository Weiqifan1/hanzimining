import React, { useState } from 'react';
import FlashCardStateManipulation from "../applogic/FlashcardDisplayLogic/FlashCardStateManipulation";

interface EditableTextAreaProps {
    show: boolean;
    info: string;
    infoStringToDisplay: string;
    onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>, currentInfo: string) => void;
}


function convertStringToListOfStrings(primaryOrSEcondaryInfo: string, infoStringToDisplay: string) {
    var mylist = primaryOrSEcondaryInfo.split("\n")
    const display: JSX.Element = <section>
        <ul>
            <li><strong>{infoStringToDisplay}</strong></li>
            {mylist.map(
                each => <li style={{textAlign: 'left'}}>`{each}` </li>
            )}
        </ul>
    </section>
    return display
}


const EditableTextArea: React.FC<EditableTextAreaProps> = ({ show, info, infoStringToDisplay, onInputChange }) => {
    const [tempInfo, setTempInfo] = useState(info);

    return show ? (
        <textarea
            value={tempInfo}
            onChange={(e) => setTempInfo(onInputChange(e, info))}
            style={{ width: '300px', height: '200px', overflowY: 'auto' }}
        >
      {convertStringToListOfStrings(tempInfo, infoStringToDisplay)}
    </textarea>
    ) : null;
};

export default EditableTextArea;