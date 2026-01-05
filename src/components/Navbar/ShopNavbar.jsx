// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import styles from './ShopNavbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>

            {/* 1. LOGO */}
            <Link to="/" className={styles.logo}>
                <span className={styles.logoRed}>VHS</span>
                _CLUB
            </Link>

            {/* 2. MENU ŚRODKOWE */}
            <ul className={styles.navLinks}>
                <li>
                    <Link to="/about" className={styles.navLink}>About</Link>
                </li>
                <li>
                    <Link to="/reviews" className={styles.navLink}>Reviews</Link>
                </li>
                <li>
                    <Link to="/shop" className={styles.navLink}>Shop</Link>
                </li>
            </ul>

            {/* 3. IKONY (SVG) */}
            <div className={styles.icons}>

                {/* Lupa (Search) */}
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>

                {/* Wózek (Cart) */}
                <Link to="/cart"> {/* Linkujemy ikonę wózka */}
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </Link>

                {/* Ludzik (User) */}
                <Link to="/login">
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </Link>
            </div>
        </nav>
    );
}