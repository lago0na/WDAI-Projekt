import React, { useState, useEffect } from 'react';
import styles from './css/Admin.module.css';

const AdminPanel = () => {
    const [movies, setMovies] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/movies')
            .then(res => res.json())
            .then(data => setMovies(data));
    }, []);

    const deleteMovie = (id) => {
        if (window.confirm("CZY NA PEWNO CHCESZ WYRZUCIĆ TĘ KASETĘ Z KLUBU?")) {
            fetch(`http://localhost:3000/movies/${id}`, {method: 'DELETE'})
                .then(() => setMovies(movies.filter(m => m.id !== id)));
        }
    };
    return (
        <div className={styles.adminWrapper}>
            <header className={styles.adminHeader}>
                <h1 className="main-heading">PANEL_ADMINISTRATORA</h1>
                <button
                    className={styles.addBtn}
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'ZAMKNIJ' : 'DODAJ NOWY FILM +'}
                </button>
            </header>

            {/* Miejsce na formularz dodawania filmu */}
            {showAddForm && (
                <div className={styles.formCard}>
                    <h2 className="main-heading">NOWA_KASETTA</h2>
                    {/* Tutaj dodasz pola formularza: tytuł, rok, director itp. */}
                </div>
            )}

            <section className={styles.listSection}>
                <h2 className="main-heading">LISTA_FILMÓW</h2>
                <div className={styles.movieTable}>
                    {movies.map(movie => (
                        <div key={movie.id} className={styles.movieRow}>
                            <span>{movie.title} ({movie.year})</span>
                            <div className={styles.actions}>
                                <button className={styles.editBtn}>EDYTUJ</button>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => deleteMovie(movie.id)}
                                >
                                    USUŃ
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminPanel;