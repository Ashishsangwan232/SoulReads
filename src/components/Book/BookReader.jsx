import React from "react";
import { useParams, Link } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import { useState, useRef } from "react";
import "./reader.css";

const diaryEntries = {
  "2025-07-01": [
    "Woke up feeling energized.",
    "Started working on my daily diary project.",
    "Learned how to implement realistic page flip animations.",
    "Feeling motivated to keep building this project.",
  ],
  "2025-07-02": [
    "Worked on improving CSS themes.",
    "Refined bookshelf layout and animations.",
    "Explored ideas for private diary mode.",
  ],
  "2025-07-03": [
    "Added more diary functionality.",
    "Tested page-flip animations on mobile.",
    "Planning next updates for the blog.",
  ],
};

const DiaryReader = () => {
  const { dateId } = useParams();
  const pages = diaryEntries[dateId] || ["No diary entry for this date."];
  const totalPages = pages.length;

  const [currentPage, setCurrentPage] = useState(0);
  const [jumpPage, setJumpPage] = useState("");
  const bookRef = useRef();

  const handleJump = () => {
    const page = parseInt(jumpPage, 10) - 1;
    if (page >= 0 && page < totalPages) {
      bookRef.current.pageFlip().flip(page);
    } else {
      alert(`Enter a page number between 1 and ${totalPages}`);
    }
    setJumpPage("");
  };

  return (
    <div className="reader-container">
      <Link to="/" className="back-btn">← Back to Diary</Link>

      {/* Top Info */}
      <div className="diary-info">
        <h2>Diary Entry for {dateId}</h2>
        <p>Page {currentPage + 1} of {totalPages}</p>
      </div>

      {/* Jump to Page Input */}
      <div className="jump-container">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          placeholder="Go to page..."
        />
        <button onClick={handleJump}>Jump</button>
      </div>

      <HTMLFlipBook
        width={800}
        height={950}
        showCover={true}
        className="flipbook"
        ref={bookRef}
        onFlip={(e) => setCurrentPage(e.data)}
      >
        {pages.map((content, index) => (
          <div className="page" key={index}>
            <h3>Page {index + 1}</h3>
            <p>{content}</p>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default DiaryReader;
