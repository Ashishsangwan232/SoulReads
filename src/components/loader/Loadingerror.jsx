import React from 'react';
import './loadingerror.css';

const Loadingerror = ({error}) => {
  return (
    <div className="error-loader">
      <p>Error</p>
      <div className="error-words">
        <span className="error-word">{error}</span>
        <span className="error-word">Server connection failed.</span>
        <span className="error-word">{error}</span>
        <span className="error-word">Server connection failed.</span>
        <span className="error-word">{error}</span>
      </div>
    </div>
  )
}

export default Loadingerror;