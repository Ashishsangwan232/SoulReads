// // import React, { useState } from 'react';
// // import RichTextEditor from './RichTextEditor';
// // import './Appmain.css'; // We will create this file for styling

// // // Initial content for the editor
// // const initialValue = [
// //   {
// //     type: 'heading-one',
// //     children: [{ text: '🚀 Welcome to Your Slate.js Editor!' }],
// //   },
// //   {
// //     type: 'paragraph',
// //     children: [
// //       { text: 'This is a rich text editor built with ' },
// //       { text: 'React', bold: true },
// //       { text: ' and ' },
// //       { text: 'Slate.js', bold: true },
// //       { text: '. You can edit this text, add formatting, and more.' },
// //     ],
// //   },
// //   {
// //     type: 'block-quote',
// //     children: [{ text: '“The beautiful thing about learning is that nobody can take it away from you.” — B.B. King' }],
// //   },
// //   {
// //     type: 'paragraph',
// //     children: [{ text: 'Try out the toolbar above! Use keyboard shortcuts like Ctrl+B for bold.' }],
// //   },
// // ];

// // function Appmain() {
// //   // State to hold the editor's value
// //   const [value, setValue] = useState(initialValue);

// //   return (
// //     <div className="app-container">
// //       <header className="app-header">
// //         <h1>React & Slate Rich Text Editor</h1>
// //       </header>
// //       <main className="editor-container">
// //         <RichTextEditor value={value} setValue={setValue} />
// //       </main>
// //     </div>
// //   );
// // }

// // export default Appmain;


// // import React, { useState } from 'react';
// // import RichTextEditor from './RichTextEditor';
// // import './Appmain.css';

// // const initialValue = [
// //   {
// //     type: 'heading-one',
// //     children: [{ text: '✨ Welcome to SoulReads' }],
// //   },
// //   {
// //     type: 'paragraph',
// //     children: [
// //       {
// //         text:
// //           'SoulReads is your creative sanctuary — a space to write, reflect, and share thoughts that matter. Whether it’s a fleeting idea or a deep story, your words belong here.',
// //       },
// //     ],
// //   },
// //   {
// //     type: 'block-quote',
// //     children: [
// //       {
// //         text: '“Write what disturbs you, what you fear, what you have not been willing to speak about. Be willing to be split open.” — Natalie Goldberg',
// //       },
// //     ],
// //   },
// //   {
// //     type: 'paragraph',
// //     children: [
// //       {
// //         text:
// //           'Use the toolbar above or shortcuts like ',
// //       },
// //       { text: 'Ctrl+B', bold: true },
// //       {
// //         text: ' to style your text. Happy writing!',
// //       },
// //     ],
// //   },
// // ];

// // function Appmain() {
// //   const [value, setValue] = useState(initialValue);

// //   return (
// //     <div className="app-container">
// //       <main className="editor-container">
// //         <RichTextEditor value={value} setValue={setValue} />
// //       </main>
// //     </div>
// //   );
// // }

// // export default Appmain;






// // import React, { useState } from 'react';
// // import RichTextEditor from './RichTextEditor';
// // import './Appmain.css';

// // const welcomeText = [
// //   {
// //     type: 'heading-one',
// //     children: [{ text: '✨ Welcome to SoulReads' }],
// //   },
// //   {
// //     type: 'paragraph',
// //     children: [
// //       {
// //         text:
// //           'SoulReads is your creative sanctuary — a space to write, reflect, and share thoughts that matter. Whether it’s a fleeting idea or a deep story, your words belong here.',
// //       },
// //     ],
// //   },
// //   {
// //     type: 'block-quote',
// //     children: [
// //       {
// //         text: '“Write what disturbs you, what you fear, what you have not been willing to speak about. Be willing to be split open.” — Natalie Goldberg',
// //       },
// //     ],
// //   },
// //   {
// //     type: 'paragraph',
// //     children: [
// //       { text: 'Use the toolbar above or shortcuts like ' },
// //       { text: 'Ctrl+B', bold: true },
// //       { text: ' to style your text. Happy writing!' },
// //     ],
// //   },
// // ];

// // function Appmain() {
// //   const [value, setValue] = useState(welcomeText);

// //   const clearEditor = () => {
// //     setValue([
// //       {
// //         type: 'paragraph',
// //         children: [{ text: '' }],
// //       },
// //     ]);
// //   };

// //   return (
// //     <div className="app-container">
// //       <div className="editor-toolbar-top">
// //         <button onClick={clearEditor} className="clear-btn">
// //           Clear
// //         </button>
// //       </div>
// //       <main className="editor-container">
// //         <RichTextEditor value={value} setValue={setValue} />
// //       </main>
// //     </div>
// //   );
// // }

// // export default Appmain;




// import React, { useState } from 'react';
// import RichTextEditor from './RichTextEditor';
// import './Appmain.css';

// const welcomeText = [
//   {
//     type: 'heading-one',
//     children: [{ text: '✨ Welcome to SoulReads' }],
//   },
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text:
//           'SoulReads is your creative sanctuary — a space to write, reflect, and share thoughts that matter. Whether it’s a fleeting idea or a deep story, your words belong here.',
//       },
//     ],
//   },
//   {
//     type: 'block-quote',
//     children: [
//       {
//         text: '“Write what disturbs you, what you fear, what you have not been willing to speak about. Be willing to be split open.” — Natalie Goldberg',
//       },
//     ],
//   },
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text:
//           'Use the toolbar above or shortcuts like ',
//       },
//       { text: 'Ctrl+B', bold: true },
//       {
//         text: ' to style your text. Happy writing!',
//       },
//     ],
//   },
// ];

// function Appmain() {
//   const [value, setValue] = useState(welcomeText);
//   const [editorKey, setEditorKey] = useState(0);
  
//   const clearEditor = () => {
//     const isEmpty = value.length === 1 && value[0].type === 'paragraph' && value[0].children?.[0]?.text === '';

//     if (!isEmpty) {
//       const confirmed = window.confirm('Are you sure you want to clear all content?');
//       if (!confirmed) return;
//     }

//     setValue([
//       {
//         type: 'paragraph',
//         children: [{ text: '' }],
//       },
//     ]);
//     setEditorKey(prev => prev + 1); // force remount
//   };


//   return (
//     <div className="app-container">
//       <button onClick={clearEditor} className="clear-btn">
//         Clear
//       </button>
//       <main className="editor-container">
//         <RichTextEditor key={editorKey} value={value} setValue={setValue} />
//       </main>
//     </div>
//   );
// }

// export default Appmain;
