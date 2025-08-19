import React, { useState, useEffect, useRef } from 'react';
import './optionmenu.css';

const Menu_activity = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const tabs = ['published', 'draft', 'archived', 'bookmarked'];

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <div className="optionss" ref={wrapperRef}>
      {isOpen && (
        <div className="further_options_menu">
          {tabs.map((tab) => (
            <p
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={activeTab === tab ? 'active-option' : ''}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </p>
          ))}
        </div>
      )}
      <svg
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
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
      </svg>
    </div>
  );
};

export default Menu_activity;
