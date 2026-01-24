import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/Reviews.module.css';
import ShopNavbar from '../components/Navbar/ShopNavbar';
import { useAuth } from '../context/AuthContext/AuthContext';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();

    // Formularz
    const [formData, setFormData] = useState({
        movieId: '',
        rating: 5,
        comment: ''
    });

    // 1. POBIERANIE DANYCH
    useEffect(() => {
        // Pobieramy opinie
        fetch('http://localhost:3000/reviews')
            .then(res => {
                if (!res.ok) throw new Error("Błąd połączenia z bazą reviews");
                return res.json();
            })
            .then(data => {
                console.log("Pobrane opinie:", data); // Zobacz w konsoli (F12) czy tu są dane
                setReviews(data.reverse()); // Najnowsze na górze
            })
            .catch(err => console.error("Błąd fetch reviews:", err));

        // Pobieramy filmy
        fetch('http://localhost:3000/movies')
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(err => console.error("Błąd fetch movies:", err));
    }, []);

    // 2. WYSYŁANIE OPINII
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("ACCESS DENIED: LOG IN FIRST!");
            return;
        }

        // Znajdujemy tytuł filmu (porównujemy jako String, żeby uniknąć błędu typów)
        const selectedMovie = movies.find(m => String(m.id) === String(formData.movieId));

        const newReview = {
            movieId: parseInt(formData.movieId),
            movieTitle: selectedMovie ? selectedMovie.title : "UNKNOWN_TAPE",
            rating: parseInt(formData.rating),
            comment: formData.comment.toUpperCase(),
            author: user.username || "ANONYMOUS",
            date: new Date().toISOString().split('T')[0]
        };

        try {
            const res = await fetch('http://localhost:3000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            });

            if (res.ok) {
                const savedReview = await res.json();
                setReviews([savedReview, ...reviews]); // Dodajemy do listy od razu
                setIsModalOpen(false); // Zamykamy okno
                setFormData({ movieId: '', rating: 5, comment: '' }); // Czyścimy formularz
            }
        } catch (err) {
            alert("ERROR: CONNECTION LOST");
            console.error(err);
        }
    };

    const renderStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

    // Logika wyświetlania (12 TV na ekran)
    const pages = useMemo(() => {
        const itemsPerPage = 12;
        const totalItems = Math.max(itemsPerPage, Math.ceil(reviews.length / itemsPerPage) * itemsPerPage);
        const fullList = [...reviews, ...Array(Math.max(0, totalItems - reviews.length)).fill(null)];

        const chunks = [];
        for (let i = 0; i < fullList.length; i += itemsPerPage) {
            chunks.push(fullList.slice(i, i + itemsPerPage));
        }
        return chunks;
    }, [reviews]);

    return (
        <div className={styles.pageWrapper}>
            {/* Navbar w kontenerze z paddingiem */}
            <div className={styles.navbarContainer}>
                <ShopNavbar />
            </div>

            <div className={styles.scrollContainer}>
                {pages.map((pageItems, pageIndex) => (
                    <section key={pageIndex} className={styles.wallSection}>
                        <div className={styles.tvGrid}>
                            {pageItems.map((item, index) => (
                                <div key={index} className={styles.tvCell}>
                                    <div className={styles.screenContent}>
                                        <div className={styles.scanlines}></div>
                                        {item ? (
                                            <div className={styles.reviewInner}>
                                                <h3 className={styles.movieTitle}>
                                                    <Link to={`/movie/${item.movieId}`}>{item.movieTitle}</Link>
                                                </h3>
                                                <div className={styles.stars}>{renderStars(item.rating)}</div>
                                                <p className={styles.comment}>"{item.comment}"</p>
                                                <small className={styles.author}>// {item.author}</small>
                                            </div>
                                        ) : (
                                            <div className={styles.staticNoise}></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <footer className={styles.footerNav}>
                <span className={styles.info}>* SYSTEM_STATUS: ONLINE ({reviews.length} RECS)</span>
                <div className={styles.footerActions}>
                    <button onClick={() => setIsModalOpen(true)} className={styles.addBtn}>
                        ADD_REVIEW (REC ●)
                    </button>
                    <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className={styles.navBtn}>
                        TOP ▲
                    </button>
                </div>
            </footer>

            {/* MODAL */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>NEW_TRANSMISSION</h2>

                        <form onSubmit={handleSubmit} className={styles.reviewForm}>
                            <label>SELECT_TAPE:</label>
                            <select
                                required
                                value={formData.movieId}
                                onChange={e => setFormData({...formData, movieId: e.target.value})}
                                className={styles.input}
                            >
                                <option value="">-- CHOOSE MOVIE --</option>
                                {movies.sort((a,b) => a.title.localeCompare(b.title)).map(m => (
                                    <option key={m.id} value={m.id}>{m.title}</option>
                                ))}
                            </select>

                            <label>RATING:</label>
                            <div className={styles.ratingSelect}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        type="button"
                                        key={star}
                                        className={formData.rating >= star ? styles.starActive : styles.starInactive}
                                        onClick={() => setFormData({...formData, rating: star})}
                                    >★</button>
                                ))}
                            </div>

                            <label>COMMENT:</label>
                            <textarea
                                required
                                placeholder="TYPE HERE..."
                                value={formData.comment}
                                onChange={e => setFormData({...formData, comment: e.target.value})}
                                className={styles.textarea}
                                maxLength={100}
                            />

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>CANCEL</button>
                                <button type="submit" className={styles.submitBtn}>TRANSMIT ►</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;