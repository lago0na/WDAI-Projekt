import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/Reviews.module.css';
import ShopNavbar from '../components/Navbar/ShopNavbar';
import { useAuth } from '../context/AuthContext/AuthContext';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. Wyciągamy 'user' z kontekstu, żeby sprawdzić rolę
    const { user } = useAuth();

    const scrollContainerRef = useRef(null);

    const [formData, setFormData] = useState({
        movieId: '',
        rating: 5,
        comment: ''
    });

    // POBIERANIE DANYCH (bez zmian)
    useEffect(() => {
        fetch('http://localhost:3000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data.reverse()))
            .catch(err => console.error(err));

        fetch('http://localhost:3000/movies')
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(err => console.error(err));
    }, []);

    // 2. NOWA FUNKCJA: USUWANIE OPINII (Tylko Admin)
    const handleDelete = async (reviewId) => {
        // Zabezpieczenie na poziomie frontendu
        if (user?.role !== 'admin') {
            alert("ACCESS DENIED: ADMIN ONLY.");
            return;
        }

        if (!window.confirm("WARNING: ERASE TAPE RECORD PERMANENTLY?")) {
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                // Usuwamy z lokalnego stanu, żeby zniknęło natychmiast
                setReviews(reviews.filter(r => r.id !== reviewId));
            } else {
                alert("ERROR: DELETE FAILED.");
            }
        } catch (err) {
            console.error(err);
            alert("ERROR: SYSTEM FAILURE.");
        }
    };

    // WYSYŁANIE (bez zmian)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) { alert("LOGIN REQUIRED"); return; }

        const selectedMovie = movies.find(m => String(m.id) === String(formData.movieId));
        const newReview = {
            movieId: parseInt(formData.movieId),
            movieTitle: selectedMovie ? selectedMovie.title : "UNKNOWN",
            rating: parseInt(formData.rating),
            comment: formData.comment.toUpperCase(),
            author: user.username,
            date: new Date().toISOString().split('T')[0]
        };

        try {
            const res = await fetch('http://localhost:3000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            });
            if (res.ok) {
                const saved = await res.json();
                setReviews([saved, ...reviews]);
                setIsModalOpen(false);
                setFormData({ movieId: '', rating: 5, comment: '' });
                if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err) { console.error(err); }
    };

    const renderStars = (r) => "★".repeat(r) + "☆".repeat(5 - r);

    const pages = useMemo(() => {
        const itemsPerPage = 12;
        const totalItems = Math.max(itemsPerPage, Math.ceil(reviews.length / itemsPerPage) * itemsPerPage);
        const fullList = [...reviews, ...Array(Math.max(0, totalItems - reviews.length)).fill(null)];
        const chunks = [];
        for (let i = 0; i < fullList.length; i += itemsPerPage) chunks.push(fullList.slice(i, i + itemsPerPage));
        return chunks;
    }, [reviews]);

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.navbarContainer}><ShopNavbar /></div>

            <div className={styles.scrollContainer} ref={scrollContainerRef}>
                {pages.map((pageItems, pageIndex) => (
                    <section key={pageIndex} className={styles.wallSection}>
                        <div className={styles.tvGrid}>
                            {pageItems.map((item, index) => (
                                <div key={index} className={styles.tvCell}>
                                    <div className={styles.screenContent}>
                                        <div className={styles.scanlines}></div>
                                        {item ? (
                                            <div className={styles.reviewInner}>

                                                {/* 3. PRZYCISK ADMINA - Widoczny tylko dla roli 'admin' */}
                                                {user?.role === 'admin' && (
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className={styles.deleteBtn}
                                                        title="ADMIN: ERASE RECORD"
                                                    >
                                                        [X]
                                                    </button>
                                                )}

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
                    <button onClick={() => setIsModalOpen(true)} className={styles.addBtn}>ADD_REVIEW (REC ●)</button>
                    <button onClick={() => { if(scrollContainerRef.current) scrollContainerRef.current.scrollTo({top:0, behavior:'smooth'}) }} className={styles.navBtn}>TOP ▲</button>
                </div>
            </footer>

            {/* MODAL (tutaj wklej resztę swojego kodu modala bez zmian) */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        {/* ... kod formularza ... */}
                        {/* Skopiuj go ze swojego poprzedniego pliku, bo tu nic nie zmieniamy */}
                        <h2 className={styles.modalTitle}>NEW_TRANSMISSION</h2>
                        <form onSubmit={handleSubmit} className={styles.reviewForm}>
                            {/* ... inputy ... */}
                            <label>SELECT_TAPE:</label>
                            <select required value={formData.movieId} onChange={e=>setFormData({...formData, movieId:e.target.value})} className={styles.input}>
                                <option value="">-- CHOOSE --</option>
                                {movies.sort((a,b)=>a.title.localeCompare(b.title)).map(m=><option key={m.id} value={m.id}>{m.title}</option>)}
                            </select>
                            <label>RATING:</label>
                            <div className={styles.ratingSelect}>
                                {[1,2,3,4,5].map(s=><button type="button" key={s} onClick={()=>setFormData({...formData, rating:s})} className={formData.rating>=s?styles.starActive:styles.starInactive}>★</button>)}
                            </div>
                            <label>COMMENT:</label>
                            <textarea required value={formData.comment} onChange={e=>setFormData({...formData, comment:e.target.value})} className={styles.textarea} maxLength={80}/>
                            <div className={styles.modalActions}>
                                <button type="button" onClick={()=>setIsModalOpen(false)} className={styles.cancelBtn}>CANCEL</button>
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