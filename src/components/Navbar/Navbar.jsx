import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext.jsx';
import styles from './Navbar.module.css';
import GlitchLogo from "../GlitchLogo/GlitchLogo.jsx";

const Navbar = () => {
    const { token, logout, user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const triggerHeight = window.innerHeight * 0.9;
            setIsVisible(window.scrollY > triggerHeight);
        };

        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <nav className={`${styles.navbarContainer} ${isVisible ? styles.visible : styles.hidden}`}>
            <NavLink to="/">
                <GlitchLogo className={styles.bigLogo}/>
            </NavLink>

            <ul className={styles.navLinks}>
                <li><NavLink to="/about" className="main-heading">About</NavLink></li>
                <li><NavLink to="/shop" className="main-heading">Shop</NavLink></li>
                <li><NavLink to="/reviews" className="main-heading">Reviews</NavLink></li>
                <li><NavLink to="/contact" className="main-heading">Contact</NavLink></li>

                {token ? (
                    <>
                        <li>
                            {/* Dodałem margin-right, żeby nie było za ciasno */}
                            <span className="main-heading" style={{ color: 'var(--yellow)', fontSize: '1rem', marginRight: '5px' }}>
                                HELLO, {user?.username}
                            </span>
                        </li>
                        <li>
                            {/* ZMIANA: Używamy klasy .logoutBtn */}
                            <button onClick={logout} className={styles.logoutBtn}>
                                [EJECT]
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <NavLink to="/login" className="main-heading">ENTER_THE_CLUB</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;