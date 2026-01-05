// src/pages/Shop.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/Shop.module.css';
import ShopNavbar from '../components/Navbar/ShopNavbar';

export default function Shop() {
    const [movies, setMovies] = useState([]);
    const [sortOption, setSortOption] = useState('featured');

    // 1. NOWY STAN: Wybrana kategoria (domyślnie 'All' czyli wszystkie)
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetch('http://localhost:3000/movies')
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error("Błąd:", err));
    }, []);

    // 2. LOGIKA: Wyciągamy unikalne kategorie z listy filmów
    // Set usuwa duplikaty, więc dostaniemy czystą listę ["Action", "Drama", "Sci-Fi"...]
    const categories = ["All", ...new Set(movies.map(movie => movie.category))];

    // 3. LOGIKA: Główna funkcja (Filtrowanie + Sortowanie)
    const getProcessedMovies = () => {
        // KROK A: Filtrowanie
        let filteredMovies = movies;

        if (selectedCategory !== 'All') {
            filteredMovies = movies.filter(movie => movie.category === selectedCategory);
        }

        // KROK B: Sortowanie (pracujemy już na przefiltrowanej liście)
        // Musimy zrobić kopię [...filteredMovies], żeby sort() zadziałał poprawnie
        const sorted = [...filteredMovies];

        switch (sortOption) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'az':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'za':
                return sorted.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return sorted;
        }
    };

    const displayMovies = getProcessedMovies();

    return (
        <div className={styles.shopContainer}>
            <ShopNavbar />
            <h1 className={`${styles.pageTitle} main-heading`}>SHOP MOVIES</h1>

            <div className={styles.toolbar}>

                {/* 4. UI: Zmieniamy statyczny napis na działający filtr */}
                <div className={styles.filterOption}>
                    <span>FILTER:</span>
                    <select
                        className={styles.sortSelect}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {/* Mapujemy dostępne kategorie do opcji w liście */}
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.sortOption}>
                    <span>SORT BY:</span>
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

                    <span className={styles.productCount}>
             &nbsp;&nbsp; {displayMovies.length} PRODUCTS
          </span>
                </div>
            </div>

            <div className={styles.productsGrid}>
                {/* Wyświetlamy filmy po przetworzeniu (przefiltrowane i posortowane) */}
                {displayMovies.map((movie) => (
                    <Link
                        to={`/movie/${movie.id}`}
                        key={movie.id}
                        className={styles.productCard}
                    >
                        <div className={styles.imageContainer}>
                            <img
                                src={movie.poster || movie.image}
                                alt={movie.title}
                                className={styles.productImage}
                            />
                        </div>
                        <div className={styles.productInfo}>
                            <h3 className={styles.movieTitle}>{movie.title}</h3>
                            <span className={styles.moviePrice}>
                {movie.price ? `${movie.price} zł` : '-'}
              </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}