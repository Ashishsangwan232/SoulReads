import React, { useMemo, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';

import { CustomEditor, renderElement, renderLeaf } from './editorUtils';
import EditorToolbar from './EditorToolbar';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};
const EMPTY_VALUE = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];
const RichTextEditor = ({ value, setValue }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handleKeyDown = (event) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        CustomEditor.toggleMark(editor, HOTKEYS[hotkey]);
      }
    }
  };

  const clearEditor = () => {
    setValue(EMPTY_VALUE);
  };
  return (
    <div className="editor-wrapper">
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <EditorToolbar onClear={clearEditor} />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Start writing your masterpiece..."
          spellCheck
          autoFocus
          className="editable-area"
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
};

export default RichTextEditor;
