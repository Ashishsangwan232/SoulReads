import React, { useContext, useEffect, useState } from 'react';
import api, { getErrorMessage } from '../services/api';
import './Appmain.css';
import { MyPostsContext } from '../context/MyPostsContext';
import RichTextEditor from './RichTextEditor';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useUIFeedback } from '../components/UIFeedback/UIFeedbackProvider';

const WritingPageSlateEditing = () => {
  const { id } = useParams();
  const { refreshMyPosts } = useContext(MyPostsContext);
  const { showToast } = useUIFeedback();

  const [value, setValue] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('story');
  const [postId, setPostId] = useState(null);
  const [message, setMessage] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [originalData, setOriginalData] = useState(null); // store original fetched content

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const res = await api.get(`/posts/${id}`);
        const post = res.data;

        const fetchedTitle = post.title || '';
        const fetchedCategory = post.category || 'story';
        const fetchedStatus = post.status || 'draft';
        const fetchedId = post._id || id;

        let parsedContent;
        try {
          parsedContent = JSON.parse(post.content);
        } catch {
          console.warn('Post content is not valid JSON.');
          parsedContent = [{ type: 'paragraph', children: [{ text: '' }] }];
        }

        setTitle(fetchedTitle);
        setCategory(fetchedCategory);
        setPostId(fetchedId);
        setValue(parsedContent);

        setOriginalData({
          title: fetchedTitle,
          category: fetchedCategory,
          status: fetchedStatus,
          content: JSON.stringify(parsedContent),
        });

        const plainText = parsedContent.map(n => n.children.map(c => c.text).join('')).join('\n');
        const count = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;
        setWordCount(count);

      } catch (err) {
        console.error('Failed to fetch post:', err);
        showToast('Failed to load post. Please try again.', 'error');
      }
    };
    fetchPost();
  }, [id, showToast]);

  useEffect(() => {
    if (!value) return;
    const plainText = value.map(n => n.children.map(c => c.text).join('')).join('\n');
    const count = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;
    setWordCount(count);
  }, [value]);

  const handleSave = async (isDraft = false) => {
    const plainText = value?.map(n => n.children.map(c => c.text).join('')).join('\n');

    if (!title.trim() || plainText?.trim() === '') {
      showToast("Title and content can't be empty.", 'error');
      return;
    }

    const postStatus = isDraft ? 'draft' : 'published';
    const currentData = {
      title: title.trim(),
      content: JSON.stringify(value),
      category,
      status: postStatus,
    };

    // Avoid saving if no changes made
    if (postId && originalData) {
      const noChanges =
        originalData.title === currentData.title &&
        originalData.category === currentData.category &&
        originalData.status === currentData.status &&
        originalData.content === currentData.content;

      if (noChanges) {
        showToast('No changes made to the post.', 'info');
        return;
      }
    }

    try {
      let response;
      if (postId) {
        response = await api.patch(`/posts/${postId}`, currentData);
      } else {
        response = await api.post('/posts/post', currentData);
        setPostId(response.data.id);
      }

      const successMsg = isDraft ? 'Draft saved successfully!' : 'Post published successfully!';
      setMessage(successMsg);
      showToast(successMsg, 'success');
      refreshMyPosts?.();
      if (!isDraft) {
        setTitle('');
        setValue(null);
        setCategory('story');
        setPostId(null);
      }

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);

    } catch (error) {
      console.error('Error saving post:', error);
      showToast(getErrorMessage(error, 'Failed to save post.'), 'error');
    }
  };

  return (
    <div className="wrt-pg-cont">
      {/* Left Side */}
      <div className='wrt-pg-leftside'>
        <div className="wrt-header-logo">
          <Link to="/" className="wrt-brand">SoulReads</Link>
        </div>
      </div>

      {/* Middle */}
      <div className='wrt-pg-middle'>
        <div className="wrt-title-bar">
          <div className='wrt-pg-title-div'>
            <textarea
              placeholder="Untitled document"
              rows={1}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="wrt-title-input"
            />
          </div>
          <div className='wrt-pg-selection'>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="story">Story</option>
              <option value="journal">Journal</option>
              {/* Value must match the API's exact enum casing (camelCase) or saves 422. */}
              <option value="selfReflection">Self Reflection</option>
            </select>
          </div>
        </div>

        <main className="wrt-editor">
          {value ? (
            <RichTextEditor value={value} setValue={setValue} />
          ) : (
            <p>Loading editor...</p>
          )}
        </main>
      </div>

      {/* Right Side */}
      <div className='wrt-pg-rightside'>
        <footer className="wrt-footer">
          <div className="wrt-wordcount">{wordCount} words</div>
          <div className="footer-buttons">
            <button onClick={() => handleSave(false)}>Publish</button>
            <button onClick={() => handleSave(true)}>Save as Draft</button>
          </div>
        </footer>
      </div>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default WritingPageSlateEditing;
