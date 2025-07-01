import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <div class="loader">
      <p>loading</p>
      <div class="words">
        <span class="word">Posts</span>
        <span class="word">Stories</span>
        <span class="word">Reviews</span>
        <span class="word">cards</span>
        <span class="word">Posts</span>
      </div>
    </div>
  )
}

export default Loading