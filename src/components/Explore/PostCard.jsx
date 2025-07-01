import React, { useContext, useEffect, useState } from "react";
import './Postcard.css';
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/Likebutton";
import { useLikeContext } from '../../context/Likecontext';
import { AllPostsContext } from "../../context/AllPostsContext";
import Loading from "../loader/Loading";
import Loadingerror from "../loader/Loadingerror";

export default function PostCard({ type, author, date, title, quote, excerpt, link, likes, commentsCount, postId, error, loading }) {
  const { posts } = useContext(AllPostsContext)

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

 
  return (
    <div className="post-card">
      <div className="card-header">
        <span className={`badge ${type === "Book Review" ? "book" : ""}`}>{type}</span>
        <span className="meta">by {author} • {date}</span>
      </div>
      <h2>{title}</h2>
      <blockquote>“{quote}”</blockquote>
      <p>{excerpt}</p>
      <div className="explore-more">
        <Link to={link} className="read-more">
          Read full {type} →
        </Link>
        <div className="explore-like-btn">
          <div className="explore-comment-count">
            <span className="material-symbols-outlined">
              chat
            </span>
            {commentsCount}
          </div>
          <div className="explore-like-count">
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
        </div>
      </div>
    </div>
  );
}
