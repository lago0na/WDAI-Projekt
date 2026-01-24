// src/pages/Shop.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/Shop.module.css';
import ShopNavbar from '../components/Navbar/ShopNavbar';

export default function Shop() {
    const [movies, setMovies] = useState([]);
    const [sortOption, setSortOption] = useState('featured');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Stan wyszukiwarki zostaje tutaj
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/movies')
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error("Błąd:", err));
    }, []);

    const categories = ["All", ...new Set(movies.map(movie => movie.category))];

    const getProcessedMovies = () => {
        let filteredMovies = movies;

        if (selectedCategory !== 'All') {
            filteredMovies = filteredMovies.filter(movie => movie.category === selectedCategory);
        }

        if (searchQuery.trim() !== '') {
            filteredMovies = filteredMovies.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        const sorted = [...filteredMovies];
        switch (sortOption) {
            case 'price-low': return sorted.sort((a, b) => a.price - b.price);
            case 'price-high': return sorted.sort((a, b) => b.price - a.price);
            case 'az': return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'za': return sorted.sort((a, b) => b.title.localeCompare(a.title));
            default: return sorted;
        }
    };

    const displayMovies = getProcessedMovies();

    return (
        <div className={styles.shopContainer}>
            {/* Navbar jest teraz "czysty", nie potrzebuje propsów */}
            <ShopNavbar />

            <h1 className={`${styles.pageTitle} main-heading`}>SHOP MOVIES</h1>

            {/* --- TOOLBAR: SEARCH | FILTER | SORT --- */}
            <div className={styles.toolbar}>

                {/* 1. NOWA SEKCJA WYSZUKIWANIA W TOOLBARZE */}
                <div className={styles.searchWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px', opacity: 0.7}}>
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="SEARCH TITLE..."
                        className={styles.toolbarInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={styles.controlsRight}>
                    <div className={styles.filterOption}>
                        <span>FILTER:</span>
                        <select
                            className={styles.sortSelect}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.sortOption}>
                        <span>SORT:</span>
                        <select
                            className={styles.sortSelect}
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="az">Name: A-Z</option>
                            <option value="za">Name: Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* --- KONIEC TOOLBARA --- */}

            <div className={styles.productsGrid}>
                {displayMovies.length > 0 ? (
                    displayMovies.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className={styles.productCard}>
                            <div className={styles.imageContainer}>
                                <img src={movie.poster || movie.image} alt={movie.title} className={styles.productImage} />
                            </div>
                            <div className={styles.productInfo}>
                                <h3 className={styles.movieTitle}>{movie.title}</h3>
                                <span className={styles.moviePrice}>{movie.price ? `${movie.price} zł` : '-'}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px', opacity: 0.6}}>
                        <h2>[ NO TAPES FOUND ]</h2>
                        <p>TRY ANOTHER SEARCH TERM</p>
                    </div>
                )}
            </div>
        </div>
    );
}