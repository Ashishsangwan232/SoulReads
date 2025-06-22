import React from "react";
import "../css/component css/startwriting.css"; 
import { Link } from "react-router-dom";

const Animated = () => {
  return (
    <Link to="/writing" className="floating-button">
      <img src="/feather-pen.gif" alt="Write" />
      <span className="label">Write</span>
    </Link>
  );
};

export default Animated;
