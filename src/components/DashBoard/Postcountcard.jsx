import React, { useEffect } from "react";
import { useTotalPostCount } from "../../context/CountPostContext"; // adjust path

const PostCountCard = () => {
  const { count, loading, error, fetchTotalPost } = useTotalPostCount();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Refresh page..</p>;

  return (
    <div className="post-count-card">
      <h1>{count}</h1>
      <div className="post-count-card-content">
        <h5>
          Total Posts
        </h5>
        <button onClick={fetchTotalPost}>
          {/* Refresh */}
          <lord-icon
            src="https://cdn.lordicon.com/valwmkhs.json"
            trigger="hover"
            className="current-color"
            style={{ width: "16px", height: "16px" }}
          >
          </lord-icon>
        </button>
      </div>
    </div>
  );
};

export default PostCountCard;
