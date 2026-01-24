import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/About.module.css';
import ShopNavbar from '../components/Navbar/ShopNavbar';

const About = () => {
    return (
        <div className={styles.aboutWrapper}>
            {/* Dodano padding: '30px 4rem' do stylu inline */}
            <div style={{position: 'absolute', top: 0, width: '100%', zIndex: 100, padding: '30px 4rem'}}>
                <ShopNavbar />
            </div>

            <div className={styles.aboutCard}>
                <h1 className={styles.glitchTitle} data-text="MISSION_STATEMENT">
                    MISSION_STATEMENT
                </h1>
                <div className={styles.content}>
                    <p className={styles.manifesto}>
                        Welcome to <span className={styles.highlight}>VHS_CLUB</span>.
                        We are more than just a store; we are a sanctuary for celluloid enthusiasts.
                        Our mission is to uphold <span className={styles.bold}>traditional film values</span> in an
                        increasingly digital world.
                    </p>
                    <p className={styles.description}>
                        We believe in the texture of magnetic tape and the soul of analog playback.
                        While we celebrate the classics, we constantly supplement our unique collection
                        with <span className={styles.bold}>modern productions</span>, proving that the VHS format
                        is timeless.
                    </p>
                    <div className={styles.ctaSection}>
                        <p className={styles.suggestion}>SELECT YOUR NEXT MOVE:</p>
                        {/* Nawigacja wewnątrz strony */}
                        <div className={styles.internalNav}>
                            <Link to="/shop" className={styles.navBtn}>[VIEW_SHOP]</Link>
                            <Link to="/contact" className={styles.navBtn}>[CONTACT_US]</Link>
                            <Link to="/reviews" className={styles.navBtn}>[REVIEWS]</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.footerInfo}>
                    * ESTABLISHED 1998 // UPDATED 2026
                </div>
            </div>
        </div>
    );
};

export default About;