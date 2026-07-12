import React, { useState, useEffect, useRef } from 'react';
import { useArchive } from '../../context/ArchiveContext';
import { useDelete } from '../../context/DeleteContext';
import './optionmenu.css';
import { useMyPostsArchived } from '../../context/MyPostsContextArchived';
import { useNavigate } from 'react-router-dom';
import { useMyPosts } from '../../context/MyPostsContext';
import { useUIFeedback } from '../UIFeedback/UIFeedbackProvider';
import { getErrorMessage } from '../../services/api';

const OptionsMenu = ({ postId, archivestatus, status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refreshMyPosts: refreshMine } = useMyPosts();
  const { refreshMyPosts: refreshArchived } = useMyPostsArchived();
  const wrapperRef = useRef(null);
  const { softDelete, hardDelete, refreshMyPosts: refreshDeleted } = useDelete();
  const { toggleArchive } = useArchive();
  const navigate = useNavigate();
  const { confirm, showToast } = useUIFeedback();

  const handleHardDelete = async () => {
    // This is the *permanent* delete (irreversible) — the confirm copy must say so.
    const confirmed = await confirm(
      'This will permanently delete this post and cannot be undone. Continue?',
      { confirmLabel: 'Delete permanently' }
    );
    if (!confirmed) return;

    try {
      await hardDelete(postId);
      showToast('Post deleted successfully.', 'success');
      setIsOpen(false);
      refreshMine?.();
      refreshArchived?.();
      refreshDeleted?.();
    } catch (err) {
      showToast('Permanent delete failed: ' + getErrorMessage(err), 'error');
      console.error("Delete error:", err);
    }
  };
  const handleDelete = async () => {
    const confirmed = await confirm('Are you sure you want to move this post to trash?');
    if (!confirmed) return;

    try {
      await softDelete(postId);
      showToast('Post deleted successfully.', 'success');
      setIsOpen(false);
      refreshMine?.();
      refreshArchived?.();
      refreshDeleted?.();
    } catch (err) {
      showToast('Delete failed: ' + getErrorMessage(err), 'error');
      console.error("Delete error:", err);
    }
  };

  const handleToggle = async () => {
    try {
      await toggleArchive(postId);
      showToast('Post archive status toggled.', 'success');
      setIsOpen(false);
      refreshMine?.();
      refreshArchived?.();
    }
    catch (err) {
      showToast('Archive failed: ' + getErrorMessage(err), 'error');
      console.error("Archive error:", err);
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
      <div className='svgoption'>
        <svg
          className='circle'
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
          <circle cy="12" cx="5" r="2" />
          <circle cy="12" cx="12" r="2.5" />
          <circle cy="12" cx="19" r="2" />
        </svg>
      </div>

      {isOpen && (
        <div className="further_options">
          {status !== 'draft' &&
            <p onClick={handleToggle} className='archive-btn'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="archive-icon"
              >
                <rect width="20" height="5" x="2" y="3" rx="1"></rect>
                <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"></path>
                <path d="M10 12h4"></path>
              </svg>
              {archivestatus ? 'Unarchive' : 'Archive'}
            </p>}
          <p className='edit-btn' onClick={() => {
            navigate(`/editing/${postId}`);
            setIsOpen(false);
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="edit-icon"
            >
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
            </svg>
            Edit</p>
          {/* Move to Trash (soft delete) -- previously commented out, meaning
              this app's entire Trash feature (see TrashContext / the Trash
              page) was unreachable: the only visible "Delete" action skipped
              straight to permanent deletion. Restored as its own clearly
              labeled option, distinct from permanent delete below. */}
          <p className='Delete-btn' onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="trash-icon"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Move to Trash
          </p>
          <p className='Delete-btn' onClick={handleHardDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="trash-icon"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete Permanently
          </p>
        </div>
      )
      }

    </div >
  );
};

export default OptionsMenu;
