import React, { useEffect, useState } from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Hero() {
    const [pageReady, setPageReady] = useState(false);
    useEffect(() => {
        const onLoad = () => setPageReady(true);
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, []);

    useEffect(() => {
        AOS.init({
            // duration: 1000,
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

    const tagline = taglines[Math.floor(Math.random() * taglines.length)];

    return (
        <section className="hero">
                <img src="/logo/logobook2.svg" alt="logo" />
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

                <Link
                    to="/writing"
                    className="startwriting"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                >
                    <div className="anim">
                        <lord-icon
                            src="https://cdn.lordicon.com/xuoapdes.json"
                            trigger="morph"
                            target=".startwriting"
                            loading="lazy"
                            className="current-width"
                            state="morph-detach"
                            colors="primary:#ffffff"
                            // style={{ width: "24px", height: "24px" }}
                        />
                    </div>
                    <button className="cta">Start Writing</button>
                </Link>
            </div>
        </section>
    );
}

export default Hero;
