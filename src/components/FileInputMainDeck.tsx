import React, { useState } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";


interface FileInputProps {
    onContentChange: (content: string) => void;
}

const FileInputMainDeck =  ({ onContentChange }: FileInputProps) => {
    // Using 'any' type to avoid TypeScript errors
    const [files, setFiles] = useState<any[]>([]);
    const [content, setContent] = useState("");

    const handleInit = () => {
        console.log('FilePond instance has initialised');
    }

    return (
        <div className="App">
            <FilePond
                files={files}
                oninit={handleInit}
                allowMultiple={false}
                acceptedFileTypes={['text/plain']}
                onaddfile={(error, fileItem) => {
                    const file = fileItem.file;
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        const content = e.target?.result as string || '';
                        onContentChange(content);
                    };

                    reader.readAsText(file);
                }}
                onupdatefiles={fileItems => {
                    setFiles(fileItems.map(fileItem => fileItem.file));
                }}
            />
            <div>{content}</div>
        </div>
    );
};

export default FileInputMainDeck;
