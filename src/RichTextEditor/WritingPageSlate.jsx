import React, {
    useContext,
    useEffect,
    useState,
    useMemo,
} from 'react';
import axios from 'axios';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
// import './Appmain.css';
import './wrtingpageslate.css';
import { AuthContext } from '../context/AuthContext';
import { MyPostsContext } from '../context/MyPostsContext';
import useAutosave from '../components/DashBoard/useAutosave';
import WritingPage from './WritingPage';

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];

const WritingPageSlate = () => {
    const { user } = useContext(AuthContext);
    const { refreshMyPosts } = useContext(MyPostsContext);

    const userKey = user?.id || user?.email || 'anonymous';
    const [value, setValue] = useState(initialValue);
    const [editorKey, setEditorKey] = useState(0);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('story');
    const [status, setStatus] = useState('published');
    const [postId, setPostId] = useState(null);
    const [message, setMessage] = useState('');
    const [autosaveOn, setAutosaveOn] = useState(true);
    const [autosavedData, setAutosavedData] = useState(null);
    const [showRestorePrompt, setShowRestorePrompt] = useState(false);

    const plainText = value.map(n => n.children.map(c => c.text).join('')).join('\n');
    const wordCount = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;
    const API_URL = import.meta.env.VITE_API_URL;

    useAutosave({
        userKey,
        enabled: autosaveOn,
        data: { title, content: JSON.stringify(value), category },
    });

    useEffect(() => {
        const indexKey = `autosave-${userKey}-index`;
        const versions = JSON.parse(localStorage.getItem(indexKey)) || [];
        if (versions.length > 0) {
            const latest = versions[0];
            try {
                const latestData = JSON.parse(localStorage.getItem(latest.key));
                if (latestData) {
                    setAutosavedData(latestData);
                    setShowRestorePrompt(true);
                }
            } catch (e) {
                console.warn('Corrupted draft:', e);
                localStorage.removeItem(latest.key);
            }
        }
    }, [userKey]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const clearAutosave = () => {
        const indexKey = `autosave-${userKey}-index`;
        const versions = JSON.parse(localStorage.getItem(indexKey)) || [];
        versions.forEach(v => localStorage.removeItem(v.key));
        localStorage.removeItem(indexKey);
    };

    const discardAutosavedData = () => {
        clearAutosave();
        setShowRestorePrompt(false);
    };

    const handleSave = async (isDraft = false) => {
        if (!title.trim() || plainText.trim() === '') {
            alert("Title and content can't be empty.");
            return;
        }

        const postStatus = isDraft ? 'draft' : 'published';
        setStatus(postStatus);

        const postData = {
            title: title.trim(),
            content: JSON.stringify(value),
            category,
            status: postStatus,
        };

        try {
            let response;
            if (postId) {
                response = await axios.patch(`${API_URL}/posts/${postId}`, postData, {
                    withCredentials: true,
                });
            } else {
                response = await axios.post(`${API_URL}/posts/post`, postData, {
                    withCredentials: true,
                });
                setPostId(response.data.id);
            }

            const successMsg = isDraft ? 'Draft saved successfully!' : 'Post published successfully!';
            alert(successMsg);
            setMessage(successMsg);

            if (!isDraft) {
                clearAutosave();
                setTitle('');
                setValue(initialValue);
                setCategory('story');
                setPostId(null);
                setEditorKey(prev => prev + 1); // reset editor
                refreshMyPosts?.();
            }
        } catch (error) {
            console.error('Error saving post:', error);
            alert(error.response?.data?.message || 'Failed to save. Please try again.');
        }
    };

    const handleManualSave = () => {
        const extractTextFromSlate = (value) => {
            if (!value) return '';
            let parsed = value;
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

        const plainText = extractTextFromSlate(value);

        if (title.trim() === '' && plainText === '') {
            alert('Nothing to save.');
            return;
        }

        const timestamp = new Date().toISOString();
        const payload = {
            title: title.trim(),
            content: JSON.stringify(value), // Save raw Slate content
            category: category.trim(),
            _autosaveTime: timestamp,
        };

        const indexKey = `autosave-${userKey}-index`;
        const versionKey = `autosave-${userKey}-v${Date.now()}`;

        try {
            const existingIndex = JSON.parse(localStorage.getItem(indexKey)) || [];

            localStorage.setItem(versionKey, JSON.stringify(payload));

            const updatedIndex = [
                { key: versionKey, time: timestamp },
                ...existingIndex.slice(0, 9),
            ];
            localStorage.setItem(indexKey, JSON.stringify(updatedIndex));

            alert(`✅ Manual version saved at ${new Date(timestamp).toLocaleTimeString()}`);
        } catch (e) {
            console.warn('Manual version save failed:', e);
            alert('❌ Failed to save manually. Check console for details.');
        }
    };

    return (
        <WritingPage
            autosaveOn={autosaveOn}
            setAutosaveOn={setAutosaveOn}
            showRestorePrompt={showRestorePrompt}
            setShowRestorePrompt={setShowRestorePrompt}
            autosavedData={autosavedData}
            setTitle={setTitle}
            setCategory={setCategory}
            setValue={setValue}
            setEditorKey={setEditorKey}
            discardAutosavedData={discardAutosavedData}
            title={title}
            category={category}
            value={value}
            editorKey={editorKey}
            wordCount={wordCount}
            handleSave={handleSave}
            handleManualSave={handleManualSave}
            message={message}
        />
    );

};

export default WritingPageSlate;
