import React, { useContext, useEffect, useState } from 'react';
import './HeartButton.css';
import { BookmarksContext } from '../../context/BookmarksContext';

export const HeartButton = ({ isLiked = false, onClick }) => {
  const [animClass, setAnimClass] = useState('');

  useEffect(() => {
    setAnimClass(isLiked ? 'animate-like' : 'animate-unlike');
  }, [isLiked]);

  return (
    <button
      className="heart-button"
      onClick={onClick}
      aria-pressed={isLiked}
      aria-label="Like button"
      type="button"
    >
      <div className="button-icon">
        {/* <svg className="heart heart--stroke" viewBox="0 0 24 24">
          <path
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5
               C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08
               C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5
               C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
          />
        </svg> */}

        <svg className={`heart heart--fill ${animClass}`} viewBox="0 0 24 24">
          <path
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5
               C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08
               C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5
               C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
          />
        </svg>
      </div>
    </button>
  );
};

const BookmarkButton = ({ postId }) => {
  const { isBookmarked, toggleBookmark } = useContext(BookmarksContext);
  const [animClass, setAnimClass] = useState('');
  const bookmarked = isBookmarked(postId);

  useEffect(() => {
    setAnimClass(bookmarked ? 'animate-bookmark' : 'animate-unbookmark');
  }, [bookmarked]);

  const handleClick = () => {
    toggleBookmark(postId);
  };

  return (
    <button
      className="bookmark-button"
      onClick={handleClick}
      aria-pressed={bookmarked}
      aria-label="Bookmark button"
      type="button"
    >
      <div className="button-icon">
        <svg
          className={`bookmark-icon ${animClass}`}
          viewBox="0 0 24 24"
          fill={bookmarked ? 'var(--primary-color)' : 'none'}
          stroke="var(--primary-color)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      </div>
    </button>
  );
};

export default BookmarkButton;

