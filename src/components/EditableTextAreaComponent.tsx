import React, { useState, useEffect, useRef } from 'react';
import FlashCardStateManipulation from "../applogic/FlashcardDisplayLogic/FlashCardStateManipulation";

interface EditableTextAreaProps {
    showCard: boolean;
    showArea: boolean;
    info: string;
    infoStringToDisplay: string;
    onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditableTextArea: React.FC<EditableTextAreaProps> =
    ({ showCard, showArea, info, onInputChange }) => {

        const textareaRef = useRef<HTMLTextAreaElement>(null);

        // Function to adjust height of textarea
        const adjustTextareaHeight = () => {
            if (textareaRef.current) {
                const scrollHeight = textareaRef.current.scrollHeight;
                const newHeight = scrollHeight + 20; // Add 20 pixels to the scrollHeight
                textareaRef.current.style.height = '50px'; // Reset to minimum height first
                textareaRef.current.style.height = `${newHeight}px`; // Then adjust to new height
            }
        };

        useEffect(() => {
            adjustTextareaHeight();
        }, [info]); // Adjust height whenever `info` changes

        const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            onInputChange(event);
            adjustTextareaHeight();
        };

        return (showArea && showCard) ? (
            <textarea
                ref={textareaRef}
                value={info}
                onChange={handleChange}
                style={{ width: '300px', height: '50px', overflowY: 'hidden', resize: 'none' }}
            />
        ) : null;
    };

export default EditableTextArea;