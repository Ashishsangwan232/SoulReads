import React from 'react';

const Filtercards = ({
  activeTab,
  setActiveTab,
  bookmarkCategory,
  setBookmarkCategory,
  archiveCategory,
  setArchiveCategory,
  draftCategory,
  setDraftCategory,
  publishedCategory,
  setPublishedCategory,
  deleteCategory,
  setDeletedCategory,
  authpostcount
}) => {
  const baseCategories = ['all', 'story', 'selfreflection', 'journal', 'favorites'];
  const categories = activeTab !== 'published' ? [...baseCategories, 'published'] : baseCategories;

  const renderSubTabs = (currentCategory, setCategory) => (
    <div className="tabs sub-tabs">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`tab ${(cat === 'published' && activeTab === 'published') || currentCategory === cat ? 'active' : ''
            }`}
          onClick={() => {
            if (cat === 'published') {
              setActiveTab('published'); // Switch main tab
            } else {
              setCategory(cat); // Set sub-category
            }
          }}
        >
          {cat === 'all' ? `All\u00A0\u00A0 ${authpostcount}` : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className='mainfiltercards'>
        <div className='mainfiltercards-filterby'>
          Filter by:
        </div>
        {activeTab === 'published' && renderSubTabs(publishedCategory, setPublishedCategory)}
        {activeTab === 'draft' && renderSubTabs(draftCategory, setDraftCategory)}
        {activeTab === 'archived' && renderSubTabs(archiveCategory, setArchiveCategory)}
        {activeTab === 'bookmarked' && renderSubTabs(bookmarkCategory, setBookmarkCategory)}
        {activeTab === 'deleted' && renderSubTabs(deleteCategory, setDeletedCategory)}
      </div>
    </>
  );
};

export default Filtercards;
