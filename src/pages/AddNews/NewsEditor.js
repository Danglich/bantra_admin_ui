import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewsEditor = ({ content, onChange, onSave }) => {
    //const [content, setContent] = useState('');
    const reactQuillRef = useRef(null);

    const handleEditorChange = (value) => {
        console.log(content);
        onChange(value);
    };

    const handleSave = () => {
        onSave();
    };

    const handleHeadingChange = (e) => {
        const quill = reactQuillRef.current.getEditor();
        const index = quill.getSelection().index;
        const level = parseInt(e.target.value, 10);
        quill.format('header', level);
    };

    const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image'],
    ];

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'link',
        'image',
    ];

    return (
        <div className="container mx-auto p-8">
            <div className="mb-4">
                <label htmlFor="content" className="block font-bold mb-2">
                    Content:
                </label>
                <ReactQuill
                    value={content}
                    onChange={handleEditorChange}
                    modules={{
                        toolbar: {
                            container: toolbarOptions,
                        },
                    }}
                    formats={formats}
                    ref={reactQuillRef}
                    className="quill-editor"
                />
            </div>
            <button
                onClick={handleSave}
                className="text-white bg-[blue] px-[16px] py-[4px] rounded-[8px] mt-[8px]"
            >
                Lưu
            </button>
        </div>
    );
};

export default NewsEditor;
