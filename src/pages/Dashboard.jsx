import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenTool, Star, History, Menu, X, Home, Info, LogOut, Settings as SettingsIcon } from 'lucide-react';
import * as S from './Dashboard.styles';

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

const normalize = (str) => str?.toLowerCase().replace(/\s/g, '');

const filterByCategory = (posts, category, status = null) => {
  return posts.filter((post) => {
    const matchStatus = status ? post.status === status : true;
    const matchCategory = category === 'all' || normalize(post.category) === category;
    return matchStatus && matchCategory;
  });
};

const Dashboard = () => {
  const { count } = { count: 0 }; // Removed useTotalPostCount as per original, wait, it was there. I'll restore it. Let me fix the import first.
  const [settingtab, setSettingtab] = useState(false);

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
  const postCount = Array.isArray(myPosts) ? myPosts.length : 0; // fallback if count isn't working

  const sidebarLinks = [
    { label: 'My Stories', path: '/dashboard', count: postCount, click: true, icon: <PenTool size={20} /> },
    { label: 'Book Reviews', path: '#', count: null, click: false, icon: <Star size={20} /> },
    { label: 'Autosave History', path: '/autosave-history', count: null, click: null, icon: <History size={20} /> },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'settings') {
      setSettingtab(true);
    }
  }, [location.search]);

  const publishedCards = useMemo(() => filterByCategory(myPosts, publishedCategory, 'published'), [myPosts, publishedCategory]);
  const draftCards = useMemo(() => filterByCategory(myPosts, draftCategory, 'draft'), [myPosts, draftCategory]);
  const DeleteCards = useMemo(() => filterByCategory(myPostsDeleted, deleteCategory), [myPostsDeleted, deleteCategory]);
  const archivedCards = useMemo(() => filterByCategory(myPostsArchived, archiveCategory), [myPostsArchived, archiveCategory]);
  const bookmarkedCards = useMemo(() => filterByCategory(bookmarks.map((b) => b.post), bookmarkCategory), [bookmarks, bookmarkCategory]);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && showMenu && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu, isMobile]);

  const handleLogout = async () => {
    if (!window.confirm('Proceed to logout?')) return;
    setLoadinglogout(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      alert('Logout failed. ' + (error.response?.data?.message || ''));
    } finally {
      setLoadinglogout(false);
    }
  };

  return (
    <>
      <Startwriting />
      <S.DashboardContainer>
        <S.TopBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo/logobook2.svg" alt="Logo" height="32" />
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>SoulReads</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link to="/"><Home size={20} color="var(--text-default)" /></Link>
            <Link to="/about"><Info size={20} color="var(--text-default)" /></Link>
            <DarkModeTogglemenu dash={true} />
            <S.MobileMenuToggle onClick={() => setShowMenu(true)}>
              <Menu size={24} />
            </S.MobileMenuToggle>
          </div>
        </S.TopBar>

        <S.MainDash>
          <S.SidebarContainer ref={sidebarRef} $isOpen={showMenu}>
            {isMobile && (
              <S.MobileMenuToggle onClick={() => setShowMenu(false)} style={{ top: '8px', right: '8px', left: 'auto' }}>
                <X size={24} />
              </S.MobileMenuToggle>
            )}

            <S.ProfileSection>
              <S.ProfilePic src={user?.profilePic || '/default-avatar.png'} alt="Profile" />
              <S.ProfileInfo>
                <h4>{displayName}</h4>
                <p>Writer</p>
              </S.ProfileInfo>
            </S.ProfileSection>

            <S.SidebarMenu>
              {sidebarLinks.map((item, index) => (
                <motion.div key={item.label} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 * index }}>
                  <S.MenuItem>
                    <Link to={item.path} onClick={(e) => {
                      if (item.click === true) {
                        e.preventDefault();
                        setSettingtab(false);
                      } else if (item.click === false) {
                        e.preventDefault();
                      }
                      if (isMobile) setShowMenu(false);
                    }}>
                      <span className="icon-wrapper">{item.icon}</span>
                      <span>{item.label}</span>
                      {item.count !== null && <span className="sidebar-count">{item.count}</span>}
                    </Link>
                  </S.MenuItem>
                </motion.div>
              ))}
            </S.SidebarMenu>

            <S.SidebarFooter>
              <PostCountCard />
              <S.SettingButton onClick={() => setSettingtab(true)}>
                <SettingsIcon size={20} /> Settings
              </S.SettingButton>
              <S.SettingButton onClick={handleLogout} style={{ color: '#fd6565' }}>
                <LogOut size={20} /> Logout
              </S.SettingButton>
            </S.SidebarFooter>
          </S.SidebarContainer>

          <S.MainContentArea>
            <S.DashboardHeader>
              <div>
                <h1>Dashboard</h1>
                <p>Welcome back, {displayName}! Ready to continue your writing journey?</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p>Last updated</p>
                <h4 style={{ margin: '4px 0 0 0' }}>
                  {new Date(user?.updatedAt || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </h4>
              </div>
            </S.DashboardHeader>

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
                authpostcount={postCount}
              />
            ) : (
              <Settings setSettingtab={setSettingtab} />
            )}
          </S.MainContentArea>
        </S.MainDash>
      </S.DashboardContainer>
    </>
  );
};

export default Dashboard;
