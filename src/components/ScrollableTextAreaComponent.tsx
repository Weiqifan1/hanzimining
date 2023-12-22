import React from 'react';

interface ScrollableTextAreaProps {
    text: string;
}

const ScrollableTextArea: React.FC<ScrollableTextAreaProps> = ({ text }) => {
    return (
        <textarea
            value={text}
            style={{ width: '300px', height: '200px', overflowY: 'auto' }}
            readOnly
        />
    );
};

export default ScrollableTextArea;