import React, { useEffect, useRef } from 'react';
import './NewUpdates.css';
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
