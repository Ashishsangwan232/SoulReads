import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
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
// import { useTotalPostCount } from 'src/context/CountPostContext';
import { useTotalPostCount } from "../context/CountPostContext";

// Helper Functions (outside component to avoid re-creation)
const normalize = (str) => str?.toLowerCase().replace(/\s/g, '');

const filterByCategory = (posts, category, status = null) => {
  return posts.filter((post) => {
    const matchStatus = status ? post.status === status : true;
    const matchCategory = category === 'all' || normalize(post.category) === category;
    return matchStatus && matchCategory;
  });
};


const Dashboard = () => {
  const { count } = useTotalPostCount();
  const [settingtab, setSettingtab] = useState(false);

  const sidebarLinks = [
    {
      label: 'My Stories',
      path: '/dashboard',
      count: `${count}`,
      click: true,
      icon: (<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="pen-tool-icon"
      >
        <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
        <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
        <path d="m2.3 2.3 7.286 7.286"></path>
        <circle cx="11" cy="11" r="2"></circle>
      </svg>
      )
    },
    {
      label: 'Book Reviews',
      click: null,
      count: null,
      path: '#'
      , icon: (<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="star-icon"
      >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
      </svg>)
    },
    {
      label: 'Autosave-history',
      click: null,
      count: null,
      path: '/autosave-history'
      , icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="history-icon"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" ></path>
          <path d="M3 3v5h5" ></path>
          <path d="M12 7v5l4 2" ></path>
        </svg >
      )
    },
  ];
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

  const [loadinglogout, setLoadinglogout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 786);

  const sidebarRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const displayName = user?.username ? user.username : 'Invalid';

  // Parse URL params for settings tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'settings') {
      setSettingtab(true);
    }
  }, [location.search]);

  // Memoized filtered lists
  const publishedCards = useMemo(() => filterByCategory(myPosts, publishedCategory, 'published'), [myPosts, publishedCategory]);
  const draftCards = useMemo(() => filterByCategory(myPosts, draftCategory, 'draft'), [myPosts, draftCategory]);
  const DeleteCards = useMemo(() => filterByCategory(myPostsDeleted, deleteCategory), [myPostsDeleted, deleteCategory]);
  const archivedCards = useMemo(() => filterByCategory(myPostsArchived, archiveCategory), [myPostsArchived, archiveCategory]);
  const bookmarkedCards = useMemo(() => filterByCategory(bookmarks.map((b) => b.post), bookmarkCategory), [bookmarks, bookmarkCategory]);

  // Debounced screen resize
  useEffect(() => {
    const debounce = (fn, delay) => {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
      };
    };

    const handleResize = debounce(() => {
      const mobile = window.innerWidth < 786;
      setIsMobile(mobile);
      setShowMenu(!mobile);
    }, 150);

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
            <img src="/logo/logobook2.svg" alt="" />
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
            <div className="image-and-btn" >
              <img src={user?.profilePic || '/default-avatar.png'} alt="Profile" className="profile-pic" />
              <div className="profile-info">
                <h4>{displayName} Sangwan</h4>
                <p>Writer</p>
              </div>
            </div>

            <div className='horizontal-line'></div>

            <div className="dashboard-sidebarcontent">
              <div className="dashboard-sidebarupper">
                <ul className="sidebar-menu">
                  {sidebarLinks.map((item, index) => (
                    <motion.li key={item.label} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 * index }}>
                      <Link to={item.path}
                        onClick={(e) => {
                          if (item.click === true) {
                            e.preventDefault();
                            setSettingtab(false); // or setSettingtab(item.label) if needed
                          } else if (item.click === false) {
                            e.preventDefault(); // block interaction
                          }
                          // item.click === null → allow navigation
                        }}

                      >
                        <span className="icon-wrapper">{item.icon}</span>
                        <span>{item.label}</span>
                        <span className='sidebar-count'>{item.count}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="dashboard-sidebarlower">
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
            <div className='dashboard-header-Top'>
              <div className='dashboard-header-Top-left'>
                <h1>Dashboard</h1>
                <p>Welcome back, {displayName}! Ready to continue your writing journey?</p>
              </div>
              <div className='dashboard-header-Top-right'>
                <p>Last updated</p>
                <h4>{new Date(user.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric'
                })}</h4>
              </div>
            </div>
            <div className='horizontal-line2'></div>
            <div>
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
                  authpostcount={count}
                />
              ) : (
                <Settings setSettingtab={setSettingtab} />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
