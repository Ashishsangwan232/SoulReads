import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <div className="loader">
      <p>loading</p>
      <div className="words">
        <span className="word">Posts</span>
        <span className="word">Stories</span>
        <span className="word">Reviews</span>
        <span className="word">cards</span>
        <span className="word">Posts</span>
      </div>
    </div>
  )
}

export default Loading