import React, { useState, useEffect, useRef } from 'react';
import './optionmenu.css';

const CommentDeleteoption = ({ commentId, postId, deleteComment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="optionss" ref={wrapperRef}>
      <div className='svgoption'>
        <svg
          className='circle'
          onClick={() => setIsOpen(!isOpen)}
          width="24"
          height="24"
          fill="#ffffff"
          viewBox="0 0 24 24"
          role="button"
          aria-label="Options menu"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen);
          }}
        >
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </div>

      {isOpen && (
        <div className="further_options">
          <p
            className="delete-comment-btn"
            onClick={() => {
              setIsOpen(false);
              deleteComment(commentId, postId);
            }}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentDeleteoption;
