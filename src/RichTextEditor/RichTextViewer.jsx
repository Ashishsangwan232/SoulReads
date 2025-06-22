// export default RichTextViewer;

import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

// Renderer for inline formatting (bold, italic, etc.)
const renderLeaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  return <span {...attributes}>{children}</span>;
};

// Renderer for block elements (paragraph, heading, etc.)
const renderElement = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'code-block':
      return <pre {...attributes}><code>{children}</code></pre>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'paragraph':
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const RichTextViewer = ({ content }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const fallbackSlate = [
    {
      type: 'paragraph',
      children: [{ text: 'Invalid or unsupported content format' }],
    },
  ];

  let isHtml = false;
  let parsedContent = fallbackSlate;

  if (typeof content === 'string') {
    const trimmed = content.trim();
    if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
      isHtml = true;
    } else {
      try {
        const json = JSON.parse(content);
        if (Array.isArray(json) && json[0]?.children) {
          parsedContent = json;
        }
      } catch (err) {
        console.warn('RichTextViewer: Content is not valid Slate JSON or HTML.', err);
        isHtml = true;
      }
    }
  } else if (Array.isArray(content)) {
    parsedContent = content;
  }

  if (isHtml) {
    return (
      <div
        className="html-viewer"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <Slate editor={editor} initialValue={parsedContent}>
      <Editable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="No content available..."
      />
    </Slate>
  );
};

export default RichTextViewer;
