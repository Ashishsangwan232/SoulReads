import React from 'react';
import { useSlate } from 'slate-react';
import {
    FaBold, FaItalic, FaUnderline, FaCode,
    FaHeading, FaQuoteLeft, FaListUl, FaListOl, FaEraser
} from 'react-icons/fa';
import { CustomEditor } from './editorUtils';

const Toolbar = ({ children }) => <div className="toolbar">{children}</div>;

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    const isActive = CustomEditor.isMarkActive(editor, format);
    return (
        <button
            className={isActive ? 'active' : ''}
            onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleMark(editor, format);
            }}
        >
            {icon}
        </button>
    );
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    const isActive = CustomEditor.isBlockActive(editor, format);
    return (
        <button
            className={isActive ? 'active' : ''}
            onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleBlock(editor, format);
            }}
        >
            {icon}
        </button>
    );
};

const EditorToolbar = ({ onClear }) => (
    <Toolbar>
        <MarkButton format="bold" icon={<FaBold />} />
        <MarkButton format="italic" icon={<FaItalic />} />
        <MarkButton format="underline" icon={<FaUnderline />} />
        <MarkButton format="code" icon={<FaCode />} />
        <span className="toolbar-separator" />
        <BlockButton format="heading-one" icon={<><FaHeading />1</>} />
        <BlockButton format="heading-two" icon={<><FaHeading />2</>} />
        <BlockButton format="block-quote" icon={<FaQuoteLeft />} />
        <BlockButton format="numbered-list" icon={<FaListOl />} />
        <BlockButton format="bulleted-list" icon={<FaListUl />} />
        <span className="toolbar-separator" />

        <button
            className="clear-button"
            onClick={(e) => {
                e.preventDefault();
                if (onClear) onClear();
            }}
            title="Clear All"
        >
            <FaEraser />
        </button>

    </Toolbar>
);

export default EditorToolbar;
