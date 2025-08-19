import React from 'react'
import { motion } from 'framer-motion';
import Menu_activity from './Menu_activity'
import { CardsArchived, CardsBookmarked, Cardsdeleted, CardsDraft, CardsPublished } from './Userpost';
import Filtercards from './Filtercards';

const MainContent = ({
    publishedCards,
    draftCards,
    archivedCards,
    bookmarkedCards,
    activeTab,
    setActiveTab,
    setBookmarkCategory,
    archiveCategory,
    draftCategory,
    setDraftCategory,
    publishedCategory,
    setPublishedCategory,
    bookmarkCategory,
    setArchiveCategory,
    DeleteCards,
    deleteCategory,
    setDeletedCategory,
    loading,
    error,
    loadingBookmarked,
    authpostcount
}) => {
    return (
        <>
            <motion.div className='tabs_opt' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Filtercards
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    bookmarkCategory={bookmarkCategory}
                    setBookmarkCategory={setBookmarkCategory}
                    archiveCategory={archiveCategory}
                    setArchiveCategory={setArchiveCategory}
                    draftCategory={draftCategory}
                    setDraftCategory={setDraftCategory}
                    publishedCategory={publishedCategory}
                    setPublishedCategory={setPublishedCategory}
                    deleteCategory={deleteCategory}
                    setDeletedCategory={setDeletedCategory}
                    authpostcount={authpostcount}
                />
                <motion.div className='dash-menuactivity'>
                    <div className='sideactivetab'>
                        {activeTab === 'draft' && <h5>Draft</h5>}
                        {activeTab === 'archived' && <h5>Archived</h5>}
                        {activeTab === 'bookmarked' && <h5>Bookmarked</h5>}
                        {activeTab === 'published' && <h5>Published</h5>}
                        {activeTab === 'deleted' && <h5>deleted</h5>}
                    </div>
                    <Menu_activity activeTab={activeTab} setActiveTab={setActiveTab} />
                </motion.div>
            </motion.div>

            <div className='horizontal-line2'></div>

            {loading && <p>Loading your posts...</p>}
            {error && <p className="error">Error: {error}</p>}
            {loadingBookmarked && <p>Loading bookmarks...</p>}

            {activeTab === 'published' && <CardsPublished cards={publishedCards} />}
            {activeTab === 'draft' && <CardsDraft cards={draftCards} />}
            {activeTab === 'archived' && <CardsArchived cards={archivedCards} />}
            {activeTab === 'bookmarked' && <CardsBookmarked cards={bookmarkedCards} />}
            {activeTab === 'deleted' && <Cardsdeleted cards={DeleteCards} />}

        </>
    )
}

export default MainContent