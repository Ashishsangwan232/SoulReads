// src/components/Likebutton.js
import React, { useState, useEffect } from 'react';
import { useLikeContext } from '../../context/LikeContext';
import './likebutton.css';
import { HeartButton } from './HeartButton';

const Likebutton = ({ targetId, targetType, initialLikesCount = 0, initialIsLiked = false, atpage }) => {
    const { toggleLike, loadingStates } = useLikeContext();

    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const operationKey = `${targetType}-${targetId}`;
    const isLoading = loadingStates[operationKey] || false;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.lordicon.com/lordicon.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    useEffect(() => {
        setIsLiked(initialIsLiked);
    }, [initialIsLiked]);

    useEffect(() => {
        setLikesCount(initialLikesCount);
    }, [initialLikesCount]);

    const handleLikeToggle = async () => {
        if (isLoading) return;

        try {
            const data = await toggleLike(targetId, targetType);
            setIsLiked(data.liked);
            setLikesCount(data.likesCount);
        } catch (err) {
            console.error("Likebutton: Failed to toggle like in component", err);
            window.dispatchEvent(new CustomEvent('app:toast', {
                detail: { type: 'error', message: err.message || 'Could not update like.' },
            }));
        }
    };

    return (
        <>
            <div className='likebutton'>
                <HeartButton
                    isLiked={isLiked}
                    onClick={handleLikeToggle}
                />
                <span>
                    {likesCount}
                    {targetType !== 'Comment' && atpage !== "explore" && ` Like${likesCount !== 1 ? 's' : ''}`}
                </span>
            </div>
        </>
    );
};
export default Likebutton;
