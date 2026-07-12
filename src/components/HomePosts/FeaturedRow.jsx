import React, { useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

const SCROLL_DURATION = 0.5;
const BUFFER_LOOP = 4
const BUFFER_LOOP_placeholder = 8;

const FeaturedRow = ({ category, posts, rowRef }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const isTouchDevice = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const setRef = useCallback((el) => {
    scrollRef.current = el;
    if (rowRef && typeof rowRef === 'function') rowRef(el);
  }, [rowRef]);

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

  // Mouse-only drag logic
  useEffect(() => {
    const node = scrollRef.current;
    if (!node || isTouchDevice) return;

    const onMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - node.offsetLeft;
      scrollLeft.current = node.scrollLeft;
      node.classList.add('dragging');
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const x = e.pageX - node.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      node.scrollLeft = scrollLeft.current - walk;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      node.classList.remove('dragging');
    };

    node.addEventListener('mousedown', onMouseDown);
    node.addEventListener('mousemove', onMouseMove);
    node.addEventListener('mouseup', onMouseUp);
    node.addEventListener('mouseleave', onMouseUp);

    return () => {
      node.removeEventListener('mousedown', onMouseDown);
      node.removeEventListener('mousemove', onMouseMove);
      node.removeEventListener('mouseup', onMouseUp);
      node.removeEventListener('mouseleave', onMouseUp);
    };
    // Note: this only (re)binds once on mount, before we know whether `posts`
    // is populated -- `scrollRef.current` may be null on that first run if the
    // row was empty. That's fine here since `setRef` (used as the row's ref
    // callback) re-fires this component's render but not this effect; the
    // effect intentionally targets whatever node is mounted at effect-run time.
  }, [isTouchDevice]);

  // This can only happen *after* every hook above has run, or hooks would be
  // called conditionally (skipped on renders where `posts` is empty, run on
  // renders where it isn't) -- a Rules-of-Hooks violation that throws
  // "Rendered fewer hooks than expected" whenever `posts` goes from empty to
  // populated (e.g. while the feed is still loading).
  if (!Array.isArray(posts) || posts.length === 0) return null;

  const createEmptyPosts = (count) =>
    Array.from({ length: count }, (_, idx) => ({
      _id: `empty-${idx}`,
      isPlaceholder: true,
    }));

  let loopedCards;
  if (posts.length >= 6) {
    loopedCards = [
      ...posts.slice(-BUFFER_LOOP),
      ...posts,
      ...posts.slice(0, BUFFER_LOOP),
    ];
  } else {
    const totalNeeded = BUFFER_LOOP_placeholder;
    // const prePlaceholderCount = Math.max(totalNeeded - Math.floor(posts.length / 2), 0);
    const postPlaceholderCount = Math.max(totalNeeded - Math.ceil(posts.length / 2), 0);
    loopedCards = [
      ...createEmptyPosts(''),
      ...posts,
      ...createEmptyPosts(postPlaceholderCount),
    ];
  }

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

            <div className="netflix-scroll-row" ref={setRef}>
              {loopedCards.map((post, i) => {
                const isBuffer = i < BUFFER_LOOP || i >= posts.length + BUFFER_LOOP;
                return (
                  <div
                    key={`${post._id || i}-${i}`}
                    className={`netflix-card ${isBuffer ? 'buffer-post' : ''} ${post.isPlaceholder ? 'placeholder-card' : ''}`}
                  >
                    {!post.isPlaceholder ? (
                      <Link to={`/posts/${post._id}`} className="netflix-card-link">
                        <div className="tag">
                          #{(post.category || 'Uncategorized').replace(/\s/g, '')}
                        </div>
                        <h3 className="title">{post.title}</h3>
                        <p className="author">By {post.authorId.username || 'Unknown'}</p>
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
