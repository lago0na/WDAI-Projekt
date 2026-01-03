import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const triggerHeight = window.innerHeight * 0.9;
            setIsVisible(window.scrollY > triggerHeight);
        };

        window.addEventListener('scroll', checkScroll);
        return() => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <nav className={`${styles.navbarContainer} ${isVisible ? styles.visible : styles.hidden}`}>

            <NavLink to="/"
                     className={`${styles.heading} main-heading`}
                     data-text="VHS_CLUB">
                VHS_CLUB
            </NavLink>

            <ul className={styles.navLinks}>
                <li>
                    <NavLink to="/" className="main-heading">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className="main-heading">About</NavLink>
                </li>
                <li>
                    <NavLink to="/shop" className="main-heading">Shop</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className="main-heading">Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;