import React, { useEffect, useState } from 'react'
import './Searchpost.css'
const Searchpost = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

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
        <>
            <div className='search-area'>
                <button
                    className="search-btn"
                    onClick={handleSearchClick}
                    disabled={!searchTerm.trim()}
                >
                    <img src="search_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Search" />
                </button>
                <input
                    type="text"
                    className='search-input'
                    placeholder='search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </>
    );
};

export default Searchpost;