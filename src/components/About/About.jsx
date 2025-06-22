import React from 'react';
import './about.css';
const About = () => {
  return (
    <>
        <section className="about-section">
            <h1>About SoulReads</h1>
            <p className="about-subtitle">A peaceful place to hold onto thoughts that often slip away.</p>
        
            <div className="about-content">
            <p>
                SoulReads is not just a website — it's a reflection a personal journey. I’m <strong>Ashish Sangwan</strong>, the founder of this platform.
                I’ve always had a mind full of thoughts — some random, some meaningful. Many of those deeper thoughts would disappear too quickly,
                and I started wondering how many others feel the same.
            </p>
            <p>
                That’s when the idea of SoulReads came alive — a calm, focused space where anyone can write down their thoughts, 
                personal stories, or reflections before they fade away.
            </p>
            <p>
                I’m not a writer by profession, but I’ve always been curious and introspective. I also dream of reading more books and 
                writing what I genuinely feel and learn from them. That’s why this platform includes book reviews too — not as expert critiques, 
                but as personal viewpoints that come from the heart.
            </p>
            <p>
                If you’ve ever had thoughts you didn’t want to lose, or books you wanted to explore more deeply, 
                then SoulReads is for you — just as much as it's for me.
            </p>
            </div>
        
            <div className="vision-box">
            <h2>💡 Our Vision</h2>
            <p>To become a peaceful, meaningful corner of the internet where thoughts are valued, stories are heard, and voices feel safe to speak.</p>
            </div>
        </section>    

    </>
  );
};

export default About;