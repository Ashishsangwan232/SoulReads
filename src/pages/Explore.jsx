import React, { useContext, useState, useMemo } from "react";
import TagScroller from "../components/Home/TagScroller";
import { AllPostsContext } from "../context/AllPostsContext";
import "../components/Explore/explore.css";
import Startwriting from "../components/Startwriting";
import Fuse from "fuse.js";
import { extractPlainTextFromSlate } from '../../utils/extractPlainTextFromSlate';
import PostCard from "../components/Explore/PostCard";

export default function Explore() {
  const { posts: allposts, loading } = useContext(AllPostsContext);
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

  return (
    <>
      <Startwriting />
      <section className="explore-section">
        <h1>Explore Soulful Thoughts</h1>
        <p className="subtitle-explore">Read stories, journals, reflections, and book reviews from real minds.</p>

        <TagScroller align="center" onSearch={(term) => setSearchTerm(term)} />

        <div className="post-grid">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={index}
              type={post.category}
              author={post.authorId?.username || "Unknown"}
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
              postId={post._id}
              link={`/posts/${post._id}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
