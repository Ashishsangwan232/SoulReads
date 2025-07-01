import React, { useContext, useMemo, useRef } from 'react';
import { AllPostsContext } from '../../context/AllPostsContext.jsx';
import FeaturedRow from './FeaturedRow.jsx';
import './FeaturedPost.css';
import Loading from '../loader/Loading.jsx';
import Loadingerror from '../loader/Loadingerror.jsx';

const MAX_FEATURED = 100;

const FeaturedPosts = () => {
  const { posts, loading, error } = useContext(AllPostsContext);
  const rowRefs = useRef([]);

  const featured = useMemo(() => (
    Array.isArray(posts) ? posts.slice(0, MAX_FEATURED) : []
  ), [posts]);

  const grouped = useMemo(() => {
    return featured.reduce((acc, post) => {
      const category = post.category?.trim() || 'Uncategorized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(post);
      return acc;
    }, {});
  }, [featured]);

  const categories = Object.entries(grouped);

  if (loading) return <div className="featured-posts-message"><Loading /></div>;
  const Posterror= error?.message || error;
  if (error) return <p className="featured-posts-message featured-posts-error"><Loadingerror  error={Posterror}/></p>;
  if (!featured.length) return <p className="featured-posts-message">No featured posts available.</p>;

  return (
    <section className="netflix-container">
      {categories.map(([category, catPosts], i) => (
        <FeaturedRow
          key={category}
          category={category}
          posts={catPosts}
          rowRef={(el) => (rowRefs.current[i] = el)}
        />
      ))}
    </section>
  );
};

export default FeaturedPosts;
