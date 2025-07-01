import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import './readmore.css';
import { useSinglePost } from '../../context/SinglePostContext.jsx';
import Addcomment from '../comment/Addcomment.jsx';
import { useComments } from '../../context/CommentsContext.jsx';
import LikeButton from '../LikeButton/Likebutton.jsx';
import { useLikeContext } from '../../context/Likecontext.jsx';
import BookmarkButton from '../LikeButton/HeartButton.jsx';
import ShareButton from './ShareButton.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import OptionsMenu from '../DashBoard/OptionMenu.jsx';
import RichTextViewer from '../../RichTextEditor/RichTextViewer.jsx';
import Time_ago from '../Time_ago/Time_ago.jsx';
import UserProfile from '../userdetails/UserProfile';
import CommentDeleteoption from '../DashBoard/CommentDeleteoption';
import PostLoading from './PostLoading';

const ReadMore = () => {
  const { id: postId } = useParams();
  const { user } = useContext(AuthContext);
  const { post, loading: postLoading, fetchPostById } = useSinglePost();
  const { comments, loadingComments, error: commentsError, fetchComments, deleteComment } = useComments();
  const { checkUserLikeStatus } = useLikeContext();

  const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);
  const [currentLikesCount, setCurrentLikesCount] = useState(0);
  const [initialLikeStatusLoading, setInitialLikeStatusLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupCommentUserId, setPopupCommentUserId] = useState(null);

  const isOwner = useMemo(() => (
    post && user && String(post.authorId?._id) === String(user._id)
  ), [post, user]);

  useEffect(() => {
    if (postId && (!post || String(post._id) !== postId)) {
      fetchPostById(postId);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) fetchComments(postId);
  }, [postId]);

  useEffect(() => {
    if (post && String(post._id) === postId) {
      setCurrentLikesCount(post.likesCount || 0);

      const fetchStatus = async () => {
        setInitialLikeStatusLoading(true);
        try {
          const statusData = await checkUserLikeStatus(postId, 'Post');
          setIsCurrentUserLiked(statusData.liked);
        } catch (error) {
          console.error("Failed to fetch like status:", error);
          setIsCurrentUserLiked(false);
        } finally {
          setInitialLikeStatusLoading(false);
        }
      };

      fetchStatus();
    }
  }, [post]);

  if (postLoading) {
    return <div className="post-detail-loading"><PostLoading /></div>;
  }

  if (!post) {
    return <div className="post-detail-notfound"><h2>Post not found.</h2></div>;
  }

  const displayAuthor = post.authorId?.username || 'Unknown Author';
  const authorProfilePic = post.authorId?.profilePic || '/default-avatar.png';

  return (
    <div className='readmore-container-div'>

      {showPopup && (
        <div className='userprofile-popup'>
          <UserProfile userId={post.authorId?._id} onClose={() => setShowPopup(false)} />
        </div>
      )}

      {popupCommentUserId && (
        <div className='userprofile-popup'>
          <UserProfile userId={popupCommentUserId} onClose={() => setPopupCommentUserId(null)} />
        </div>
      )}

      <section className="post-detail">

        <div className="back">
          <button className="back-btn" onClick={() => window.history.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <line x1="40" y1="12" x2="9" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          <div className="add-fav" role="button">
            <BookmarkButton postId={postId} />
          </div>
        </div>

        <div className='readmore-animation-line'><hr /></div>

        <h1 className='readmore-title'>{post.title}</h1>

        <div className="meta-info">
          <h4 onClick={() => setShowPopup(true)} className='meta-info-name'>
            <img src={authorProfilePic} alt="Profile" />
            {displayAuthor} • #{post.category}
          </h4>
          <h4>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</h4>
        </div>

        <div className="post-content">
          <RichTextViewer content={post.content} />
        </div>

        <div className='readmore-share-like'>
          <div className='readmore-like-btn'>
            {!initialLikeStatusLoading ? (
              <LikeButton
                targetId={postId}
                targetType="Post"
                initialLikesCount={currentLikesCount}
                initialIsLiked={isCurrentUserLiked}
              />
            ) : <p>Loading Likes...</p>}
          </div>

          <div className='readmore-share'>
            <ShareButton />
            {isOwner && (
              <OptionsMenu
                postId={post._id}
                archivestatus={post.archive}
                status={post.status}
              />
            )}
          </div>
        </div>

        {post.author_bio && (
          <div className="author-bio">
            <h3>About the Author</h3>
            <p>{post.author_bio}</p>
          </div>
        )}

        <div className="comments-section">
          <h3>Comments</h3>

          {loadingComments && comments.length === 0 ? (
            <p>Loading comments...</p>
          ) : commentsError ? (
            <p className="error">{commentsError}</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => {
              const commentProfilePic = comment.authorProfilePic || '/avatar/oggy.jpg';
              const commentAuthorId = comment.authorId?._id;

              return (
                <div key={comment._id} className="comment">
                  <div className='reamdome-comment-author-option'>
                    <div className='reamdome-comment-author'>
                      <span
                        className="comment-author"
                        onClick={() => setPopupCommentUserId(commentAuthorId)}
                      >
                        <img src={commentProfilePic} alt="Profile" />
                        @{comment.authorName}
                      </span>
                      <Time_ago createdAt={comment.createdAt} />
                    </div>
                    {(String(commentAuthorId) === user?._id || String(post.authorId?._id) === user?._id) && (
                      <CommentDeleteoption
                        commentId={comment._id}
                        postId={postId}
                        deleteComment={deleteComment}
                      />
                    )}
                  </div>

                  <div className='readmore-comment-content'>
                    <p>{comment.content}</p>
                    <LikeButton
                      targetId={comment._id}
                      targetType="Comment"
                      initialLikesCount={comment.likesCount}
                      initialIsLiked={comment.isLikedByCurrentUser}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className='Nocomments'>No comments yet.</p>
          )}
        </div>

        <Addcomment postId={postId} onCommentAdded={() => fetchComments(postId)} />

      </section>
    </div>
  );
};

export default ReadMore;
