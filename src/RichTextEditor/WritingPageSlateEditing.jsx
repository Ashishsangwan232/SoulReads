import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Appmain.css';
import { AuthContext } from '../context/AuthContext';
import { MyPostsContext } from '../context/MyPostsContext';
import RichTextEditor from './RichTextEditor';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';

const WritingPageSlateEditing = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { refreshMyPosts } = useContext(MyPostsContext);

  const [value, setValue] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('story');
  const [status, setStatus] = useState('published');
  const [postId, setPostId] = useState(null);
  const [message, setMessage] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [originalData, setOriginalData] = useState(null); // store original fetched content

  const location = useLocation();
  const navigate = useNavigate();
  
  const from = location.state?.from?.pathname || '/';

  const API_URL = import.meta.env.VITE_API_URL;

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
        const res = await axios.get(`${API_URL}/posts/${id}`, { withCredentials: true });
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
        setStatus(fetchedStatus);
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
        alert("Failed to load post. Please try again.");
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!value) return;
    const plainText = value.map(n => n.children.map(c => c.text).join('')).join('\n');
    const count = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;
    setWordCount(count);
  }, [value]);

  const handleSave = async (isDraft = false) => {
    const plainText = value?.map(n => n.children.map(c => c.text).join('')).join('\n');

    if (!title.trim() || plainText?.trim() === '') {
      alert("Title and content can't be empty.");
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
        alert("No changes made to the post.");
        return;
      }
    }

    try {
      let response;
      if (postId) {
        response = await axios.patch(`${API_URL}/posts/${postId}`, currentData, {
          withCredentials: true,
        });
      } else {
        response = await axios.post(`${API_URL}/posts/post`, currentData, {
          withCredentials: true,
        });
        setPostId(response.data.id);
      }

      const successMsg = isDraft ? 'Draft saved successfully!' : 'Post published successfully!';
      setMessage(successMsg);
      alert(successMsg);
      refreshMyPosts?.();
      if (!isDraft) {
        setTitle('');
        setValue(null);
        setCategory('story');
        setStatus('published');
        setPostId(null);
      }

    } catch (error) {
      console.error('Error saving post:', error);
      if (error.response) {
        alert(error.response.data.message || `Failed to save post. Status: ${error.response.status}`);
      } else if (error.request) {
        alert('Network error. Please check your connection.');
      } else {
        alert('Failed to set up the request. Please try again.');
      }
    }

    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);
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
              <option value="selfreflection">SelfReflection</option>
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
