import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './temp.css';
import Startwriting from '../components/Startwriting';
import { useMyPosts } from '../context/MyPostsContext';
import { AuthContext } from '../context/AuthContext';
import PostCountCard from '../components/DashBoard/Postcountcard';
import { useDelete } from '../context/DeleteContext';
import { useMyPostsArchived } from '../context/MyPostsContextArchieved';
import { BookmarksContext } from '../context/BookmarksContext';
import MainContent from '../components/DashBoard/MainContent';
import Settings from '../components/DashBoard/Settings';
import DarkModeTogglemenu from '../components/Themetoggle/DarkModeTogglemenu';
import Logoutbutton from '../components/Logoutbutton';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { myPosts, loading, error } = useMyPosts();
  const { myPostsArchived } = useMyPostsArchived();
  const { myPostsDeleted } = useDelete();
  const { bookmarks, loading: loadingBookmarked } = useContext(BookmarksContext);

  const [activeTab, setActiveTab] = useState('published');
  const [bookmarkCategory, setBookmarkCategory] = useState('all');
  const [archiveCategory, setArchiveCategory] = useState('all');
  const [deleteCategory, setDeletedCategory] = useState('all');
  const [draftCategory, setDraftCategory] = useState('all');
  const [publishedCategory, setPublishedCategory] = useState('all');
  const [settingtab, setSettingtab] = useState(false);

  const [loadinglogout, setLoadinglogout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 786);

  const sidebarRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const displayName = user?.username ? user.username : 'Invalid';

  const sidebarLinks = [
    { label: 'My Stories', path: '#' },
    { label: 'Book Reviews', path: '#' },
    { label: 'Autosave-history', path: '/autosave-history' },
  ];

  // Parse URL params for settings tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'settings') {
      setSettingtab(true);
    }
  }, [location.search]);

  // Normalize helper
  const normalize = (str) => str?.toLowerCase().replace(/\s/g, '');

  // Filter helper
  const filterByCategory = (posts, category, status = null) => {
    return posts.filter((post) => {
      const matchStatus = status ? post.status === status : true;
      const matchCategory = category === 'all' || normalize(post.category) === category;
      return matchStatus && matchCategory;
    });
  };
  // console.log(bookmarkedCards)
  const publishedCards = filterByCategory(myPosts, publishedCategory, 'published');
  const draftCards = filterByCategory(myPosts, draftCategory, 'draft');
  const DeleteCards = filterByCategory(myPostsDeleted, deleteCategory);
  const archivedCards = filterByCategory(myPostsArchived, archiveCategory);
  const bookmarkedCards = filterByCategory(bookmarks.map((b) => b.post), bookmarkCategory);

  // Detect screen resiz
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 786;
      setIsMobile(mobile);
      setShowMenu(!mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect click outside sidebar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && showMenu && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu, isMobile]);

  // Logout handler
  const handleLogout = async () => {
    if (!window.confirm('Proceed to logout?')) return;
    setLoadinglogout(true);
    try {
      await logout();
      alert('Logout successful!');
      navigate('/');
    } catch (error) {
      alert('Logout failed. ' + (error.response?.data?.message || ''));
      console.error('Logout error:', error.response?.data);
    } finally {
      setLoadinglogout(false);
    }
  };

  return (
    <>
      <Startwriting />
      <div className="dashboard-container">
        {/* Top Navigation */}
        <motion.div className="topforlogo">
          <motion.div className="dash-logo" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            {/* <img src="/images/logo" alt="SoulReads" /> */}
            <p>SoulReads</p>
          </motion.div>
          <motion.div className="dashboard-topnavlink">
            <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
              <Link to="/"><span className="material-symbols-outlined">home</span></Link>
            </motion.div>
            <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <Link to="/about"><span className="material-symbols-outlined">info</span></Link>
            </motion.div>
            <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <Link to="#" onClick={handleLogout}><span className="material-symbols-outlined">logout</span></Link>
            </motion.div>
            <div className="togglemenuuu">
              <DarkModeTogglemenu dash={true} />
            </div>
          </motion.div>
        </motion.div>

        <div className="main-dash">
          {/* Sidebar Toggle Button */}
          {isMobile && (
            <div className="dashboard_sidebar_menu">
              <span className="material-symbols-outlined" onClick={() => setShowMenu(true)}>
                menu
              </span>
            </div>
          )}

          {/* Sidebar */}
          <aside className={`sidebar ${showMenu || !isMobile ? 'show' : ''}`} ref={sidebarRef}>
            {isMobile && (
              <div className='dashboard_sidebar_close'> 
                <span className="material-symbols-outlined" onClick={() => setShowMenu(false)}>
                close
              </span>
              </div>
            )}
            <motion.div className="image-and-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <img src={user.profilePic} alt="Profile" className="profile-pic" />
            </motion.div>
            <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              {displayName}
            </motion.h4>

            <div className="dashboard-sidebarcontent">
              <div className="dashboard-sidebarupper">
                <ul className="sidebar-menu">
                  {sidebarLinks.map((item, index) => (
                    <motion.li key={item.label} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 * index }}>
                      <Link to={item.path}>{item.label}</Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="dashboard-sidebarlower">
                <hr />
                <PostCountCard />
                <button className="setting-btn" onClick={() => setSettingtab(true)}>
                  <span className="material-symbols-outlined">settings</span>
                  Settings
                </button>
                <Logoutbutton className="dashbaord-sidebar-logout-btn" />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="main-content">
            {!settingtab ? (
              <MainContent
                DeleteCards={DeleteCards}
                deleteCategory={deleteCategory}
                setDeletedCategory={setDeletedCategory}
                publishedCards={publishedCards}
                draftCards={draftCards}
                archivedCards={archivedCards}
                bookmarkedCards={bookmarkedCards}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setBookmarkCategory={setBookmarkCategory}
                archiveCategory={archiveCategory}
                draftCategory={draftCategory}
                publishedCategory={publishedCategory}
                setPublishedCategory={setPublishedCategory}
                bookmarkCategory={bookmarkCategory}
                setDraftCategory={setDraftCategory}
                setArchiveCategory={setArchiveCategory}
                loading={loading}
                error={error}
                loadingBookmarked={loadingBookmarked}
              />
            ) : (
              <Settings setSettingtab={setSettingtab} />
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
