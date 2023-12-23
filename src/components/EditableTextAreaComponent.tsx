import React, { useState } from 'react';
import FlashCardStateManipulation from "../applogic/FlashcardDisplayLogic/FlashCardStateManipulation";

interface EditableTextAreaProps {
    showCard: boolean
    showArea: boolean;
    info: string;
    infoStringToDisplay: string;
    onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}


const EditableTextArea: React.FC<EditableTextAreaProps> =
    ({showCard,
         showArea,
         info,
         infoStringToDisplay,
         onInputChange}) => {

    return (showArea && showCard) ? (
        <textarea
            value={info}
            onChange={(e) => onInputChange(e)}
            style={{ width: '800px', height: '300px', overflowY: 'auto' }}
        >
    </textarea>
    ) : null;
};

export default EditableTextArea;