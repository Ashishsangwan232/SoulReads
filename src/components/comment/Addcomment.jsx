import React, { useContext, useState } from 'react';
import './addcomment.css';
import { useComments } from '../../context/CommentsContext';
import { AuthContext } from '../../context/AuthContext';
import { useUIFeedback } from '../UIFeedback/UIFeedbackProvider';

const AddComment = ({ postId, onCommentAdded }) => {
  const {user}=useContext(AuthContext);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addComment } = useComments(); // From context
  const { showToast } = useUIFeedback();

  const handleSubmit = async () => {
    if (!user) return showToast('You need to log in first!', 'error');
    const trimmedComment = commentText.trim();
    if (!trimmedComment) return;

    setSubmitting(true);

    try {
      const result = await addComment(postId, trimmedComment);

      if (result.success) {
        setCommentText('');
        onCommentAdded?.(); // Optional callback if parent wants to act
      } else {
        showToast(result.error || 'Could not post comment. Try again.', 'error');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      showToast('Could not post comment. Please try again later.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comment_section">
      <textarea
        id="text"
        rows="3"
        placeholder="Add comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        disabled={submitting}
        aria-label="Write your comment"
      />
      <div className="postcomment">
        <button onClick={handleSubmit} disabled={submitting || !commentText.trim()}>
          {submitting ? 'Posting...' : 'Comment'}
        </button>
      </div>
    </div>
  );
};

export default AddComment;

