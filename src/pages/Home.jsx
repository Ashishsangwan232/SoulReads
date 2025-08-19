import React from 'react';
import FeaturedPosts from '../components/HomePosts/FeaturedPosts';
import TagScroller from '../components/Home/TagScroller';
import Hero from '../components/Home/Hero';
import ThemeSettings from '../components/Themetoggle/ThemeSettings';

const Home = () => {
  return (
    <>
    <Hero />
    <TagScroller align="left"/>
    <FeaturedPosts />
    {/* <ThemeSettings /> */}
    </>
  );
};

export default Home;