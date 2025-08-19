import React, { useEffect, useState } from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Floatingman from './Floatingman.jsx'; // Update path if needed

function Hero() {
    const [pageReady, setPageReady] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // 👈 NEW state

    useEffect(() => {
        const onLoad = () => setPageReady(true);
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, []);

    useEffect(() => {
        AOS.init({
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    useEffect(() => {
        if (pageReady) AOS.refreshHard();
    }, [pageReady]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.lordicon.com/lordicon.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const taglines = [
        "Let your thoughts breathe. Trace your feelings. Find echoes of yourself in stories and pages.",
        "Speak your silence. Reflect on your inner world. Connect through the shared weight of words.",
        "Write what you can’t say aloud. Reflect on your inner world. Connect through the shared weight of words.",
        "A home for wandering thoughts. A space to reflect. A place where words bring souls together."
    ];

    const [tagline] = useState(() =>
        taglines[Math.floor(Math.random() * taglines.length)]
    );

    // const tagline = taglines[Math.floor(Math.random() * taglines.length)];

    return (
        <div className='hero-container'>
            <div className="hero-wrapper">
                <div className={`hero ${isHovered ? 'active' : ''}`}>
                    <div className="hero-content">
                        <h1
                            className="tagline"
                            data-aos="fade-right"
                            data-aos-duration="1000"
                        >
                            {tagline}
                        </h1>
                        <p
                            className="subtitle"
                            data-aos="fade-up"
                            data-aos-duration="1500"
                        >
                            A peaceful space for writers and readers.
                        </p>

                        <div className='Homehero-buttondiv'>
                            <div className='curved-circle'>
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='svg-clip1'>
                                    <defs>
                                        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="var(--shape-color)" />
                                            <stop offset="100%" stopColor="var(--primary-color)" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        fill="url(#blobGradient)"
                                        d="M37.1,-59.2C47.6,-58.2,55.4,-47.3,63.3,-35.8C71.2,-24.3,79.3,-12.2,78.6,-0.4C78,11.4,68.6,22.8,58.7,30.8C48.7,38.9,38.4,43.7,28.5,47.1C18.6,50.5,9.3,52.6,1.2,50.5C-6.9,48.4,-13.8,42.1,-25.7,39.8C-37.5,37.6,-54.4,39.4,-60.8,33.4C-67.1,27.4,-63,13.7,-64.3,-0.8C-65.7,-15.3,-72.5,-30.5,-66,-36.2C-59.4,-41.9,-39.5,-37.9,-26.3,-37.4C-13.1,-36.9,-6.5,-39.7,3.4,-45.6C13.3,-51.4,26.6,-60.2,37.1,-59.2Z"
                                        transform="translate(100 100)" />
                                </svg>
                                <div className='hero-button'>
                                    <Link to="/writing" className="startwriting">
                                        <button className="cta">Start Writing</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className='floatingman'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Floatingman />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
