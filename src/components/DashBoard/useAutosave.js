// import { useEffect, useRef } from 'react';

// const useAutosave = ({ userKey, data, enabled }) => {
//     const timer = useRef(null);
//     const lastSavedRef = useRef({});

//     useEffect(() => {
//         if (!enabled || !data || !userKey) return;

//         const { title = '', content = '', category = '' } = data;
//         const plainContent = content.replace(/<[^>]*>/g, '').trim();

//         if (title.trim() === '' && plainContent === '') return;
//         const currentHash = JSON.stringify({ title: title.trim(), content: content, category });

//         const lastHash = lastSavedRef.current.hash;

//         if (lastHash === currentHash) return;

//         const saveToLocal = () => {
//             const indexKey = `autosave-${userKey}-index`;
//             const timestamp = new Date().toISOString();
//             const versionKey = `autosave-${userKey}-ver-${Date.now()}`;

//             const payload = {
//                 ...data,
//                 _autosaveTime: timestamp,
//             };

//             try {
//                 const existingIndex = JSON.parse(localStorage.getItem(indexKey)) || [];

//                 localStorage.setItem(versionKey, JSON.stringify(payload));

//                 const updatedIndex = [
//                     { key: versionKey, time: timestamp },
//                     ...existingIndex.slice(0, 9),
//                 ];
//                 localStorage.setItem(indexKey, JSON.stringify(updatedIndex));

//                 lastSavedRef.current.hash = currentHash;
//             } catch (error) {
//                 console.warn('Failed to autosave:', error);
//             }
//         };

//         clearTimeout(timer.current);
//         timer.current = setTimeout(saveToLocal, 5500);

//         return () => clearTimeout(timer.current);
//     }, [data, enabled, userKey]);
// };

// export default useAutosave;
import { useEffect, useRef } from 'react';

// Extract plain text from Slate JSON (or stringified JSON)
const extractTextFromSlate = (value) => {
  let parsed = value;

  if (!value) return '';
  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value);
    } catch {
      return '';
    }
  }

  if (!Array.isArray(parsed)) return '';

  return parsed
    .map(block => {
      if (!block?.children) return '';
      return block.children.map(child => child.text || '').join('');
    })
    .join(' ')
    .trim();
};

const useAutosave = ({ userKey, data, enabled }) => {
  const timer = useRef(null);
  const lastSavedRef = useRef({ hash: null });

  useEffect(() => {
    if (!enabled || !data || !userKey) return;

    const { title = '', content = '', category = '' } = data;
    const plainContent = extractTextFromSlate(content);
    const trimmedTitle = title.trim();

    // Skip autosave if content is empty
    if (trimmedTitle === '' && plainContent === '') return;

    // Normalize hash to only use essential fields
    const currentHash = JSON.stringify({
      title: trimmedTitle,
      content: plainContent,
      category: category.trim(),
    });

    // If nothing has changed, don't autosave
    if (lastSavedRef.current.hash === currentHash) return;

    const saveToLocal = () => {
      const indexKey = `autosave-${userKey}-index`;
      const timestamp = new Date().toISOString();
      const versionKey = `autosave-${userKey}-ver-${Date.now()}`;

      const payload = {
        ...data,
        _autosaveTime: timestamp,
      };

      try {
        const existingIndex = JSON.parse(localStorage.getItem(indexKey)) || [];

        // Save versioned content
        localStorage.setItem(versionKey, JSON.stringify(payload));

        // Maintain only latest 10 versions
        const updatedIndex = [
          { key: versionKey, time: timestamp },
          ...existingIndex.slice(0, 9),
        ];

        localStorage.setItem(indexKey, JSON.stringify(updatedIndex));

        // Store new hash
        lastSavedRef.current.hash = currentHash;
      } catch (error) {
        console.warn('Failed to autosave:', error);
      }
    };

    // Delay actual save to prevent rapid saves on fast typing
    clearTimeout(timer.current);
    timer.current = setTimeout(saveToLocal, 5500);

    return () => clearTimeout(timer.current);
  }, [data, enabled, userKey]);
};

export default useAutosave;
