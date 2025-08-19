// import React from 'react'
import React, { useContext, useState, useMemo } from "react";
import './explorepage.css';
import Searchpost from '../Home/Searchpost';
import PostcardGrid from './PostcardGrid';

import { AllPostsContext } from "../../context/AllPostsContext";
import Fuse from "fuse.js";

const Explorepage = () => {

    const { posts: allposts, loading, error } = useContext(AllPostsContext);
    const [searchTerm, setSearchTerm] = useState("");

    const fuse = useMemo(() => {
        return new Fuse(allposts, {
            keys: ["title", "content", "category", "authorId.username"],
            threshold: 0.4,
        });
    }, [allposts]);

    // Filter posts with fuzzy search
    const filteredPosts = useMemo(() => {
        if (!searchTerm) return allposts;
        return fuse.search(searchTerm).map(result => result.item);
    }, [searchTerm, fuse]);


    const trendingTags = [
        "#SelfDiscovery",
        "#BookReview",
        "#Poetry",
        "#Mindfulness",
        "#InnerJourney",
        "#Reflection",
        "#WisdomWords",
        "#Storytelling"
    ]
    return (
        <>
            <div className='Explorepage-container'>
                <div className='Explorepage-content-header'>
                    <h1 className='Explorepage-heading-text'>Explore Soulful Thoughts</h1>
                    <p className='Explorepage-heading-muted'>Discover stories that touch the heart,
                        journals that inspire the mind, <br /> and
                        reflections that nurture the soul.
                        Every word is a journey within.
                    </p>
                </div>
                <div className='Explorepage-content-search'>
                    <Searchpost onSearch={(term) => setSearchTerm(term)} />
                </div>
                <div>
                    <div class="Explorepage-trending-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="CurrentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            className='Explorepage-sparkle-icon'>
                            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z">
                            </path>
                            <path d="M20 3v4"></path>
                            <path d="M22 5h-4"></path>
                            <path d="M4 17v2"></path>
                            <path d="M5 18H3"></path>
                        </svg>
                        <span class="Explorepage-trending-text">Trending now</span>
                    </div>
                    <div className="Explorepage-tag-container">
                        <div className="Explorepage-tag-scroll">
                            {trendingTags.map((tag, index) => (
                                <button
                                    key={tag}
                                    className="Explorepage-tag-button"
                                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                                >
                                    <span className="Explorepage-tag-text">{tag}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <PostcardGrid filteredPosts={filteredPosts} loading={loading} error={error} />
        </>
    )
}

export default Explorepage