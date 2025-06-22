import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './temp.css';
import LogoutButton from '../components/LogoutButton';
import Startwriting from '../components/Startwriting';
import { useMyPosts } from '../context/MyPostsContext';
import { AuthContext } from '../context/AuthContext';
import PostCountCard from '../components/DashBoard/Postcountcard';
import { useDelete } from '../context/DeleteContext';
import { useMyPostsArchived } from '../context/MyPostsContextArchieved';
import { BookmarksContext } from '../context/BookmarksContext';
import MainContent from '../components/DashBoard/MainContent';
import Settings from '../components/DashBoard/Settings';
import { useLocation } from 'react-router-dom';
import DarkModeToggle from '../components/Themetoggle/DarkModeToggle';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
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
  const location = useLocation();
  const [settingtab, setSettingtab] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loadinglogout, setLoadinglogout] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'settings') {
      setSettingtab(true);
    }
  }, [location.search]);

  // const displayName = user?.username ? user.username.split(' ')[0] : '';
  const displayName =user.username? user.username : "Invalid" ;

  const normalize = str => str?.toLowerCase().replace(/\s/g, '');

  const filterByCategory = (posts, category, status = null) => {
    return posts.filter(post => {
      const matchStatus = status ? post.status === status : true;
      const matchCategory = category === 'all' || normalize(post.category) === category;
      return matchStatus && matchCategory;
    });
  };

  const handleLogout = async () => {
    const isconfirm = window.confirm("proced for logout")
    if (!isconfirm) return;
    setLoadinglogout(true);
    try {
      await logout();
      alert("Logout successful!");
      navigate("/login");
    } catch (error) {
      alert("Logout failed. " + (error.response?.data?.message || ""));
      console.error("Logout error:", error.response?.data);
    } finally {
      setLoadinglogout(false);
    }
  };
  const publishedCards = filterByCategory(myPosts, publishedCategory, 'published');
  const draftCards = filterByCategory(myPosts, draftCategory, 'draft');
  const DeleteCards = filterByCategory(myPostsDeleted, deleteCategory);
  const archivedCards = filterByCategory(myPostsArchived, archiveCategory);
  const bookmarkedCards = filterByCategory(bookmarks.map(b => b.post), bookmarkCategory);


  const sidebarLinks = [
    { label: 'My Stories', path: '#' },
    { label: 'Book Reviews', path: '#' },
    { label: 'Autosave-history', path: '/autosave-history' },
  ];

  return (
    <>
      <Startwriting />
      <div className="dashboard-container">
        <motion.div className='topforlogo'>
          <motion.div className="logo" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <img src="/images/logo" alt="SoulReads" />
          </motion.div>
          <DarkModeToggle />
          <div className='dashboard-topnavlink'>
            <Link to="/">
              <span className="material-symbols-outlined">home</span></Link>
            <Link to="/about">
              <span className="material-symbols-outlined">info</span></Link>
            <Link onClick={handleLogout}>
              <span className="material-symbols-outlined">logout</span></Link>

          </div>
        </motion.div>

        <div className='main-dash'>
          <aside className="sidebar">
            <motion.div className="image-and-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <img src={user.profilePic} alt="Profile" className="profile-pic" />
            </motion.div>
            <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>{displayName}</motion.h4>

            <div className='dashboard-sidebarcontent'>
              <div className='dashboard-sidebarupper'>
                <ul className="sidebar-menu">
                  {sidebarLinks.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link to={item.path}>{item.label}</Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className='dashboard-sidebarlower'>
                <hr />
                <PostCountCard />
                <button className="setting-btn" onClick={() => setSettingtab(true)}>
                  <span className="material-symbols-outlined">settings</span>
                  Settings</button>
                <LogoutButton className="dashbaord-sidebar-logout-btn" />
              </div>
            </div>
          </aside>
          <main className="main-content">
            {!settingtab ?
              (<MainContent
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
              ) : (<Settings setSettingtab={setSettingtab} />)
            }
          </main>
        </div>
      </div>
    </>
  );
};


export default Dashboard;

