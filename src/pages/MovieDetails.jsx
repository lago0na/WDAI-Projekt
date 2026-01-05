// src/pages/MovieDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx'; // Dodajemy Navbar
import styles from './css/MovieDetails.module.css';

export default function MovieDetails() {
    const { id } = useParams(); // Pobiera ID z adresu URL (np. /movie/1)
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Pobieramy konkretny film po ID
        fetch(`http://localhost:3000/movies/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Błąd:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className={styles.container}>Loading...</div>;
    if (!movie) return <div className={styles.container}>Movie not found</div>;

    return (
        <div className={styles.container}>
            <Navbar />

            <div className={styles.contentWrapper}>

                {/* LEWA STRONA: Informacje */}
                <div className={styles.infoSection}>
                    <h1 className={styles.title}>{movie.title}</h1>

                    <p className={styles.description}>
                        {movie.description || "No description available."}
                    </p>

                    <div className={styles.metaInfo}>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Year:</strong> {movie.year}</p>
                        <p><strong>Genre:</strong> {movie.category}</p>
                    </div>

                    <div className={styles.price}>
                        {movie.price ? `${movie.price} zł` : "Out of stock"}
                    </div>

                    <button
                        className={styles.addToCartBtn}
                        onClick={() => alert(`Dodano ${movie.title} do koszyka!`)} // Tymczasowa akcja
                    >
                        Add to Cart
                    </button>
                </div>

                {/* PRAWA STRONA: Plakat */}
                <div className={styles.imageSection}>
                    <img
                        src={movie.poster || movie.image} // Obsługa dwóch nazw pól z bazy
                        alt={movie.title}
                        className={styles.poster}
                    />
                </div>

            </div>
        </div>
    );
}