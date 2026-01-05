import { useState, useEffect } from 'react';
import styles from './MovieSection.module.css';
import MoviePopup from '../MoviePopup/MoviePopup.jsx';

export default function MovieSection() {
    const [movies, setMovies] = useState([]);

    // 1. Nowy stan: który film jest aktualnie otwarty w popupie? (null = żaden)
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/movies')
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error("Błąd pobierania:", error));
    }, []);

    return (
        <section className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} main-heading`}>Our movie selection</h2>

            <div className={styles.gridContainer}>
                {movies.map((movie) => (
                    // 2. Zmieniamy Link na div
                    <div
                        key={movie.id}
                        className={styles.movieCard}
                        style={{
                            transform: `translate(${movie.style?.x || 0}px, ${movie.style?.y || 0}px) rotate(${movie.style?.rotate || 0}deg)`,
                            cursor: 'pointer' // Ważne: kursor rączki, żeby było wiadomo że można klikać
                        }}
                        // 3. Po kliknięciu ustawiamy ten film jako wybrany
                        onClick={() => setSelectedMovie(movie)}
                    >
                        <img
                            src={movie.poster || movie.image}
                            alt={movie.title}
                            className={styles.posterImage}
                        />
                    </div>
                ))}
            </div>

            {/* 4. Wyświetlamy Popup TYLKO gdy selectedMovie istnieje */}
            {selectedMovie && (
                <MoviePopup
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)} // Zamknięcie ustawia stan na null
                />
            )}
        </section>
    );
}