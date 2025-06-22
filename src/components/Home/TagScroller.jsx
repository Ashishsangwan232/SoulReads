import React, { useEffect, useState } from 'react';
import './tags.css';
import { useLocation } from 'react-router-dom';

const TagScroller = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (onSearch) onSearch(searchTerm.trim());
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, onSearch]);

  const handleSearchClick = () => {
    if (onSearch) onSearch(searchTerm.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="tags">
      <div className='tags-span'>
        <span>#SelfDiscovery</span>
        <span>#Romance</span>
        <span>#BookReview</span>
        <span>#Journal</span>
        <span>#Memoir</span>
      </div>

      {!isHomePage && (
        <div className='tag-area'>
          <input
            type="text"
            className='tag-search-input'
            placeholder='search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="tag-search-btn"
            onClick={handleSearchClick}
            disabled={!searchTerm.trim()}
          >
            <img src="search_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Search" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TagScroller;
