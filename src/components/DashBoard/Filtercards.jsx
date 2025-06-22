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
  setDeletedCategory
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
          {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {activeTab === 'published' && renderSubTabs(publishedCategory, setPublishedCategory)}
      {activeTab === 'draft' && renderSubTabs(draftCategory, setDraftCategory)}
      {activeTab === 'archived' && renderSubTabs(archiveCategory, setArchiveCategory)}
      {activeTab === 'bookmarked' && renderSubTabs(bookmarkCategory, setBookmarkCategory)}
      {activeTab === 'deleted' && renderSubTabs(deleteCategory, setDeletedCategory)}

      <div className='sideactivetab'>
        {activeTab === 'draft' && <h5>Draft</h5>}
        {activeTab === 'archived' && <h5>Archived</h5>}
        {activeTab === 'bookmarked' && <h5>Bookmarked</h5>}
        {activeTab === 'published' && <h5>Published</h5>}
        {activeTab === 'deleted' && <h5>deleted</h5>}
      </div>
    </>
  );
};

export default Filtercards;
