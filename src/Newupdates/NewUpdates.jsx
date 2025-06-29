// // import React from 'react';
// // import './newupdates.css';

// // const NewUpdates = () => {
// //   const updates = [
// //     {
// //       title: '🗑️ Delete Comments by Owner or Post Author',
// //       description: 'Now, comment owners and post authors can delete comments directly using a clean three-dot menu.',
// //     },
// //     {
// //       title: '⚙️ Three-Dot Options Menu for Comments',
// //       description: 'We added a stylish, interactive three-dot menu on each comment to manage actions like delete, with click outside to close support.',
// //     },
// //     {
// //       title: '🔄 Silent Polling for Comments',
// //       description: 'Comments now refresh every 10 seconds without showing the loading screen after the initial load, giving a smooth experience.',
// //     },
// //     {
// //       title: '✅ Optimized Initial Comment Loading',
// //       description: 'We show the loading state only on the very first fetch of comments. Subsequent background polling happens without interrupting the UI.',
// //     },
// //     {
// //       title: '🛠 Backend Hard Delete via PATCH',
// //       description: 'Comment deletion now uses PATCH requests targeting the hard delete route for immediate and permanent removal.',
// //     },
// //     {
// //       title: '💬 Like Status Synced for Comments',
// //       description: 'Like status for each comment is now properly synced during fetch and polling intervals for real-time accuracy.',
// //     },
// //     {
// //       title: '🚀 Performance Optimizations',
// //       description: 'Better state management for comments, reduced unnecessary API calls, and improved polling efficiency.',
// //     }
// //   ];

// //   return (
// //     <div className="newupdates-container">
// //       <h1>🚀 Latest Updates</h1>

// //       {updates.map((update, index) => (
// //         <div key={index} className="update-card">
// //           <h3>{update.title}</h3>
// //           <p>{update.description}</p>
// //         </div>
// //       ))}

// //       <p className="footer-note">We keep improving based on your feedback. Stay tuned for more!</p>
// //     </div>
// //   );
// // };

// // export default NewUpdates;
// import React from 'react';
// import './newupdates.css';

// const NewUpdates = () => {
//   return (
//     <div className="newupdates-container">
//       <h1>🚀 New Updates & Features</h1>

//       <div className="update-card">
//         <h3>🗑️ Delete Comments by Owner or Post Author</h3>
//         <p>Comment owners or post authors can now delete any comment directly. Click the three-dot menu on a comment to remove it.</p>
//       </div>

//       <div className="update-card">
//         <h3>💬 Improved Comment Experience with Background Refresh</h3>
//         <p>Comments refresh every 10 seconds silently. No more annoying 'loading' flashes after initial page load.</p>
//       </div>

//       <div className="update-card">
//         <h3>⚙️ Sleek Three Dot Menu for Comment Options</h3>
//         <p>A clean options menu with three-dot icon is now added for each comment. Easily manage your comments with style.</p>
//       </div>

//       <div className="update-card">
//         <h3>🔄 Like Status Synced for Comments</h3>
//         <p>Comment likes are now correctly tracked and updated along with post likes for better user engagement tracking.</p>
//       </div>

//       <div className="update-card">
//         <h3>🛠 Backend Improvements</h3>
//         <p>Enhanced Comment API structure, optimized polling logic, and better error handling for smoother performance.</p>
//       </div>

//       <p className="footer-note">We keep improving based on your feedback. Stay tuned for more awesome features!</p>
//     </div>
//   );
// };

// export default NewUpdates;


import React, { useEffect, useRef } from 'react';
import './newupdates.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const updates = [
  {
    title: "User Profiles Feature",
    description: "You can now view detailed profiles of users by clicking on their name. Explore their bio and get to know the people behind the posts.",
    img: "/images/popup image.png"
  },
  {
    title: "Performance Optimizations",
    description: "We’ve optimized background tasks like comment fetching to ensure smooth, responsive performance without interrupting your reading experience.",
    img: "/images/performance.png"
  },
  {
    title: "Comment Delete Option",
    description: "Both comment owners and post owners can now delete unwanted comments, ensuring clean and moderated discussions.",
    img: "/images/comment delete.png"
  },
  {
    title: "Visible Likes & Comment Count on Posts",
    description: "Like and comment counts are now displayed directly on post cards, making it easier to engage with popular content from the explore page.",
    img: "/images/comment likte btn.png"
  },
  {
    title: "New Theme Added",
    description: "A fresh new theme has been added to enhance your reading experience. Easily switch between themes for a personalized look.",
    img: "/images/new-theme-preview.png"
  },
  {
    title: "Bug Fixes & Stability Improvements",
    description: "We’ve fixed multiple bugs and improved stability to provide a seamless and reliable experience across the platform.",
    img: "/images/bug-fix.png"
  },
  {
    title: "We Keep Improving!",
    description: "We’re continuously evolving based on your feedback. Stay tuned for more exciting features and improvements coming soon.",
    img: "/images/keep-improving.png"
  }
];


const NewUpdates = () => {
  const containerRef = useRef([]);

  useEffect(() => {
    containerRef.current.forEach((el, index) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  return (
    <div className="newupdates-wrapper">
      <h1 className="page-title">What's New</h1>
      {updates.map((update, index) => (
        <div
          key={index}
          className={`update-card ${index % 2 === 0 ? 'left' : 'right'}`}
          ref={(el) => (containerRef.current[index] = el)}
        >
          <div className="update-content">
            <h2>{update.title}</h2>
            <p>{update.description}</p>
          </div>
          <div className="update-image">
            <img src={update.img} alt={update.title} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewUpdates;
