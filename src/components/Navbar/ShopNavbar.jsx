// src/components/Navbar/ShopNavbar.jsx
import { Link } from 'react-router-dom';
import styles from './ShopNavbar.module.css';
import { useCart } from '../../context/CartContext.jsx';
import GlitchLogo from "../GlitchLogo/GlitchLogo.jsx";

export default function Navbar() {
    const { openCart, totalItems } = useCart();

    return (
        <nav className={styles.navbar}>

            <Link to="/" className={styles.logoLink}>
                <GlitchLogo className={styles.logo}/>
            </Link>

            <ul className={`${styles.navLinks} main-heading`}>
                <li><Link to="/about" className={styles.navLink}>About</Link></li>
                <li><Link to="/reviews" className={styles.navLink}>Reviews</Link></li>
                <li><Link to="/shop" className={styles.navLink}>Shop</Link></li>
            </ul>

            <div className={styles.icons}>
                {/* Wózek */}
                <div onClick={openCart} style={{cursor: 'pointer', position: 'relative'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>

                    {/* Licznik */}
                    {totalItems > 0 && (
                        <span style={{
                            position: 'absolute', top: '-5px', right: '-5px',
                            background: '#e5a657', color: 'black',
                            borderRadius: '50%', padding: '2px 5px', fontSize: '0.7rem', fontWeight: 'bold'
                        }}>
                            {totalItems}
                        </span>
                    )}
                </div>

                {/* User */}
                <Link to="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </Link>
            </div>
        </nav>
    );
}