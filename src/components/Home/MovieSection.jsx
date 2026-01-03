import { useState, useEffect } from 'react'; // 1. Dodajemy importy
import { Link } from 'react-router-dom';
import styles from './MovieSection.module.css';

export default function MovieSection() {
    // 2. Tworzymy stan na filmy
    const [movies, setMovies] = useState([]);

    // 3. Pobieramy dane po załadowaniu komponentu
    useEffect(() => {
        fetch('http://localhost:3000/movies')
            .then((res) => res.json())
            .then((data) => {
                // Dane przyjdą w takiej kolejności, w jakiej są w db.json
                setMovies(data);
            })
            .catch((error) => console.error("Błąd pobierania:", error));
    }, []);

    return (
        <section className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} main-heading`}>Our movie selection</h2>

            <div className={styles.gridContainer}>
                {/* 4. Mapujemy pobrane filmy. Jeśli baza jest pusta, nic się nie wyświetli */}
                {movies.map((movie) => (
                    <Link
                        to={`/images/${movies.id}`}
                        key={movie.id}
                        className={styles.movieCard}
                        // Styl bierzemy bezpośrednio z obiektu movie z bazy
                        // Dodajemy zabezpieczenie "|| {}", gdyby w bazie brakowało stylu
                        style={{
                            transform: `translate(${movie.style?.x || 0}px, ${movie.style?.y || 0}px) rotate(${movie.style?.rotate || 0}deg)`
                        }}
                    >
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className={styles.posterImage}
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}