import React from "react";
import { Link } from "react-router-dom";
import "./bookshelf.css";

// Example diary days
const diaryDays = [
  { id: "2025-07-01", title: "July 1, 2025", cover: "/bookcover/fiction-book-cover-template-visme.webp" },
  { id: "2025-07-02", title: "July 2, 2025", cover:  "/bookcover/german.jpg" },
  { id: "2025-07-03", title: "July 3, 2025", cover:  "/bookcover/girl.jpg" },
];

const DiaryBookshelf = () => {
  return (
    <div className="bookshelf-container">
      <h1>My Daily Diary</h1>
      <div className="books-grid">
        {diaryDays.map((day) => (
          <Link to={`/read/${day.id}`} key={day.id} className="book-item">
            <img src={day.cover} alt={day.title} />
            <h4>{day.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DiaryBookshelf;
