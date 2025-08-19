import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/Likebutton";
import { useLikeContext } from '../../context/Likecontext';
import './NewPostcard.css';
import BookmarkButton from "../LikeButton/HeartButton";

const NewPostcard = ({ type, author, date, title, quote, excerpt, link, likes, commentsCount, postId, error, loading,image,postt }) => {

    const { checkUserLikeStatus } = useLikeContext();
    const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);
    const [currentLikesCount, setCurrentLikesCount] = useState(0);
    const [initialLikeStatusLoading, setInitialLikeStatusLoading] = useState(true);

    useEffect(() => {
        if (postId) {
            setCurrentLikesCount(likes || 0);
            const fetchStatus = async () => {
                setInitialLikeStatusLoading(true);
                try {
                    const statusData = await checkUserLikeStatus(postId, 'Post');
                    setIsCurrentUserLiked(statusData.liked);
                } catch (error) {
                    console.error("ReadMore: Failed to fetch initial like status for post:", postId, error);
                    setIsCurrentUserLiked(false);
                } finally {
                    setInitialLikeStatusLoading(false);
                }
            };
            fetchStatus();
        }
    }, [postId, likes, checkUserLikeStatus]);
    // console.log("NewPostcard: postId:", postId, "likes:", likes, "isCurrentUserLiked:", isCurrentUserLiked);
    console.log("post",image);
    // console.log("post",postt);
    return (
        <>
            <div className='Nwpstcd-container'>
                <div className="Nwpstcd-header">
                    <span className="Nwpstcd-badge">{type}</span>
                    <span className="Nwpstcd-bookmark">
                        <BookmarkButton postId={postId} />
                    </span>
                </div>
                <div className='Nwpstcd-post-title'>
                    <h3>{title}</h3>
                </div>
                <div className="Nwpstcd-quote">
                    <blockquote>
                        {quote}
                    </blockquote>
                </div>
                <div className="Nwpstcd-excerpt-content">
                    <p>
                        {excerpt}
                    </p>
                </div>
                <div className="Nwpstcd-details">
                    <div className="Nwpstcd-image">
                        <img src={image} alt="Author" />
                    </div>
                    <div className="Nwpstcd-author-details">
                        <h4>{author}</h4>
                        <p>{date} ~ 3 min read</p>
                    </div>
                </div>
                <div className="Nwpstcd-tags">
                    <p>{type}</p>
                    <p>Silence</p>
                    <p>selfDiscovery</p>
                    <h4>+1 more</h4>
                </div>
                <div className="hori-line"></div>
                <div className="Nwpstcd-actions">
                    <div className="Nwpstcd-like-comment">
                        <div className="Nwpstcd-like-button">

                            {!initialLikeStatusLoading ? (
                                <LikeButton
                                    targetId={postId}
                                    targetType="Post"
                                    atpage="explore"
                                    initialLikesCount={currentLikesCount}
                                    initialIsLiked={isCurrentUserLiked}
                                />
                            ) : (
                                <p>like</p>
                            )}
                        </div>

                        <div className="Nwpstcd-comment-count">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                class="message-icon"
                            ><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                            </svg>
                            {commentsCount}
                        </div>
                    </div>
                    <div className="Nwpstcd-read-more">
                        <button>
                            <Link to={link} className="read-more">
                                Read more
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewPostcard