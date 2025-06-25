import React from 'react'

const sidebar = () => {
    return (
        <>
            <div className='sidebar_menu'>
                <span className="material-symbols-outlined" onClick={() => setShowMenu(!showMenu)}>
                    menu
                </span>
            </div>
            <aside className="sidebar">
                <span class="material-symbols-outlined">
                    close
                </span>
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
                        {/* <LogoutButton /> */}
                        {/* <LogoutButton className="dashbaord-sidebar-logout-btn" /> */}
                        <Logoutbutton className="dashbaord-sidebar-logout-btn" />
                    </div>
                </div>
            </aside>
        </>
    )
}

export default sidebar