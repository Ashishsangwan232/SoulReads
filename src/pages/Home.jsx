import React from 'react';
import FeaturedPosts from '../components/HomePosts/FeaturedPosts';
import TagScroller from '../components/Home/TagScroller';
import Hero from '../components/Home/Hero';
import Navbar from '../components/Navbar/Navbar';

const Home = () => {
  return (
    <>
    <Hero />
    <TagScroller align="left"/>
    <FeaturedPosts />
    </>
  );
};

export default Home;