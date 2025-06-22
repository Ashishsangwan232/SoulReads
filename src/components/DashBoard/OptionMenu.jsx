import React, { useState, useEffect, useRef } from 'react';
import { useArchive } from '../../context/ArchiveContext';
import { useDelete } from '../../context/DeleteContext';
import './optionmenu.css';
import { useMyPostsArchived } from '../../context/MyPostsContextArchieved';
import { useNavigate } from 'react-router-dom';
import { useMyPosts } from '../../context/MyPostsContext';

const OptionsMenu = ({ postId, archivestatus, status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refreshMyPosts: refreshMine } = useMyPosts();
  const { refreshMyPosts: refreshArchived } = useMyPostsArchived();
  const wrapperRef = useRef(null);
  const { softDelete, HardDelete, refreshMyPosts: refreshDeleted } = useDelete();
  const { toggleArchive } = useArchive();
  const [statusMessage, setStatusMessage] = useState(null);
  const navigate = useNavigate();

  const handleHardDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to move this post to trash?");
    if (!confirmed) return;

    try {
       await HardDelete(postId);
      setStatusMessage('Post deleted successfully.');
      setIsOpen(false);
      refreshMine?.();
      refreshArchived?.();
      refreshDeleted?.();
      // refreshMyPosts();
    } catch (err) {
      alert("Hard Delete failed: " + (err.response?.data?.message || err.message));
      console.error("Delete error:", err.response?.data);
    }
  };
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to move this post to trash?");
    if (!confirmed) return;

    try {
      await softDelete(postId);
      setStatusMessage('Post deleted successfully.');
      setIsOpen(false);
      refreshMine?.();
      refreshArchived?.();
      refreshDeleted?.();
      // refreshMyPosts();
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
      console.error("Delete error:", err.response?.data);
    }
  };

  const handleToggle = async () => {
    try {
      const tog = await toggleArchive(postId);
      setStatusMessage('Post archive status toggled.');
      setIsOpen(false);
      refreshMine?.();
      refreshArchived?.();
    }
    catch (err) {
      alert("Archive failed: " + (err.response?.data?.message || err.message));
      console.error("Archive error:", err.response?.data);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="optionss" ref={wrapperRef}>
      {isOpen && (
        <div className="further_options">
          {status !== 'draft' &&
            <p onClick={handleToggle}>
              {archivestatus ? 'Unarchive' : 'Archive'}
            </p>}
          <p onClick={() => {
            navigate(`/editing/${postId}`);
            setIsOpen(false);
          }}>
            Edit</p>
          {/* <p onClick={handleDelete}>Delete</p> */}
          <p onClick={handleHardDelete}>Delete</p>
        </div>
      )
      }
      <svg
        onClick={() => setIsOpen(!isOpen)}
        width="24"
        height="24"
        fill="#ffffff"
        viewBox="0 0 24 24"
        role="button"
        aria-label="Options menu"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen);
        }}
      >
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
      </svg>
    </div >
  );
};

export default OptionsMenu;
