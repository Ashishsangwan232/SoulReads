import React from "react";
import './postcardgrid.css'
import NewPostcard from './NewPostcard';
import Startwriting from "../Startwriting";
import { extractPlainTextFromSlate } from '../../../utils/extractPlainTextFromSlate';
import Loading from "../../components/loader/Loading";
import Loadingerror from "../../components/loader/Loadingerror";


const PostcardGrid = ({ filteredPosts, loading, error }) => {

    if (loading) return <div className="featured-posts-message"><Loading /></div>;
    const Posterror = error?.message || error;
    if (error) return <p className="featured-posts-message featured-posts-error"><Loadingerror error={Posterror} /></p>;


    return (
        <>
            <Startwriting />
            <div className='postcardgrid-grid-container'>
                <div className='postcardgrid-grid-item'>
                    <div className='postcardgrid-item-content'>
                        <h1>
                            <span>
                                Latest Stories & Reflections
                            </span>
                        </h1>
                        <p>
                            Discover thought-provoking content from our community of writers, thinkers, and dreamers.
                        </p>
                    </div>
                    <div className='postcardgrid-item-posts'>
                        {filteredPosts.map((post, index) => (
                            <NewPostcard
                                key={index}
                                postt={post}
                                type={post.category}
                                author={post.authorId?.username || "Unknown"}
                                image={post.authorId?.profilePic || "no-image.png"}
                                date={new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'short', day: 'numeric'
                                })}
                                upadteddate={new Date(post.updatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'short', day: 'numeric'
                                })}
                                title={post.title}
                                quote={extractPlainTextFromSlate(post.content, 60)}
                                // quote={post.content.replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').slice(0, 60) + "..."}
                                excerpt={extractPlainTextFromSlate(post.content, 120)}
                                likes={post.likesCount}
                                commentsCount={post.commentsCount}
                                postId={post._id}
                                link={`/posts/${post._id}`}
                                error={error}
                                loading={loading}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostcardGrid;