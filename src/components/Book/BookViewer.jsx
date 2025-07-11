import HTMLFlipBook from 'react-pageflip';
import './BookViewer.css';
const BookViewer = () => {
  return (
    <div className="book-container">
      <HTMLFlipBook width={400} height={600} showCover={true}>
        <div className="page">Page 1 content</div>
        <div className="page">Page 2 content</div>
        <div className="page">Page 3 content</div>
        <div className="page">Page 4 content</div>
        <div className="page">Page 5 content</div>
        <div className="page">Page 6 content</div>
        {/* Add more pages */}
      </HTMLFlipBook>
    </div>
  );
};

export default BookViewer;
