import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

const SCROLL_DURATION = 0.5;
const BUFFER_LOOP = 4;
const BUFFER_LOOP_placeholder = 4;

const FeaturedRow = ({ category, posts, rowRef }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const setRef = useCallback(
    (el) => {
      scrollRef.current = el;
      if (rowRef && typeof rowRef === 'function') rowRef(el);
    },
    [rowRef]
  );

  if (!Array.isArray(posts) || posts.length === 0) return null;

  const createEmptyPosts = (count) =>
    Array.from({ length: count }, (_, idx) => ({
      _id: `empty-${idx}`,
      isPlaceholder: true,
    }));

 let loopedCards;

if (posts.length >= 6) {
  // Real looping when posts are enough
  loopedCards = [
    ...posts.slice(-BUFFER_LOOP),
    ...posts,
    ...posts.slice(0, BUFFER_LOOP),
  ];
} else {
  // Dynamic placeholder logic
  const totalNeeded = BUFFER_LOOP_placeholder; // per side
  const prePlaceholderCount = Math.max(totalNeeded - Math.floor(posts.length / 2), 0);
  const postPlaceholderCount = Math.max(totalNeeded - Math.ceil(posts.length / 2), 0);


  loopedCards = [
    ...createEmptyPosts(prePlaceholderCount),
    ...posts,
    ...createEmptyPosts(postPlaceholderCount),
  ];
}


  const scroll = (dir) => {
    const node = scrollRef.current;
    if (!node) return;
    gsap.killTweensOf(node);

    const amount = node.offsetWidth * 0.6;
    gsap.to(node, {
      scrollLeft: node.scrollLeft + dir * amount,
      duration: SCROLL_DURATION,
      ease: 'power2.inOut',
    });
  };

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add('dragging');
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    scrollRef.current.classList.remove('dragging');
  };

  const onTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="netflix-row" ref={ref}>
      {inView && (
        <>
          <h2 className="netflix-category-title">#{category}</h2>
          <div className="netflix-scroll-wrapper">

            <button
              className="netflix-arrow left"
              onClick={() => scroll(-1)}
              aria-label="Scroll Left"
            >
              &#8592;
            </button>

            <div className="netflix-scroll-row" ref={setRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {loopedCards.map((post, i) => {
                const isBuffer =
                  i < BUFFER_LOOP || i >= posts.length + BUFFER_LOOP;
                return (
                  <div
                    key={`${post._id || i}-${i}`}
                    className={`netflix-card ${isBuffer ? 'buffer-post' : ''} ${post.isPlaceholder ? 'placeholder-card' : ''
                      }`}
                  >
                    {!post.isPlaceholder ? (
                      <Link
                        to={`/posts/${post._id}`}
                        className="netflix-card-link"
                      >
                        <div className="tag">
                          #{(post.category || 'Uncategorized').replace(/\s/g, '')}
                        </div>
                        <h3 className="title">{post.title}</h3>
                        <p className="author">
                          By {post.authorId.username || 'Unknown'}
                        </p>
                      </Link>
                    ) : (
                      <div className="netflix-card-placeholder">
                        <div className="shimmer-bar shimmer-tag"></div>
                        <div className="shimmer-bar shimmer-title"></div>
                        <div className="shimmer-bar shimmer-author"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              className="netflix-arrow right"
              onClick={() => scroll(1)}
              aria-label="Scroll Right"
            >
              &#8594;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedRow;