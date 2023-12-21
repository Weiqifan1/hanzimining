import React, { useState } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

const FileInput = () => {
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
                        setContent(e.target?.result as string || '');
                    };

                    reader.readAsText(file);
                }}
                onupdatefiles={fileItems => {
                    // Using 'any' for the file items to avoid TypeScript errors
                    setFiles(fileItems.map(fileItem => fileItem.file));
                }}
            />
            <div>{content}</div>
        </div>
    );
};

export default FileInput;
