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
    loadingBookmarked
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
                />
                <Menu_activity activeTab={activeTab} setActiveTab={setActiveTab} />
            </motion.div>

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