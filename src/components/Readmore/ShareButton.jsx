import React from 'react';

const ShareButton = ({ title = 'Check this out!', text = 'This is amazing!', url = window.location.href }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported on this browser. Please copy the link manually.');
    }
  };

  return (
    <button onClick={handleShare} className="native-share-button">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6C16 6.18266 16.0237 6.35956 16.0689 6.52896L8.84315 10.7645C8.3739 10.2876 7.71189 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14C7.71189 14 8.3739 13.7124 8.84315 13.2355L16.0689 17.471C16.0237 17.6404 16 17.8173 16 18C16 19.1046 16.8954 20 18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C17.2881 16 16.6261 16.2876 16.1569 16.7645L8.93114 12.529C8.97634 12.3596 9 12.1827 9 12C9 11.8173 8.97634 11.6404 8.93114 11.471L16.1569 7.23547C16.6261 7.71244 17.2881 8 18 8Z"
          strokeWidth="0.99"
        />
      </svg>
    </button>
  );
};

export default ShareButton;
