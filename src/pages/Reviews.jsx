import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/Reviews.module.css';
import ShopNavbar from '../components/Navbar/ShopNavbar';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const loadData = () => {
            const mockData = [
                { id: 1, movieTitle: "PULP_FICTION", movieId: "1", rating: 5, comment: "TOTALNY KLASYK.", author: "ZED" },
                { id: 2, movieTitle: "ALIEN", movieId: "3", rating: 5, comment: "W KOSMOSIE NIKT NIE USŁYSZY...", author: "RIPLEY" },
                { id: 3, movieTitle: "THE_THING", movieId: "4", rating: 5, comment: "NAJLEPSZE EFEKTY PRAKTYCZNE.", author: "MACREADY" },
                { id: 4, movieTitle: "TERMINATOR_2", movieId: "5", rating: 5, comment: "HASTA LA VISTA, BABY.", author: "T-800" },
                { id: 5, movieTitle: "BLADE_RUNNER", movieId: "2", rating: 4, comment: "WIDZIAŁEM RZECZY, KTÓRYM WY...", author: "ROY_BATTY" },
            ];
            setTimeout(() => setReviews(mockData), 150);
        };
        loadData();
    }, []);

    const renderStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

    const pages = useMemo(() => {
        const itemsPerPage = 12;
        const totalItems = Math.max(itemsPerPage, Math.ceil(reviews.length / itemsPerPage) * itemsPerPage);
        const fullList = [...reviews, ...Array(totalItems - reviews.length).fill(null)];

        const chunks = [];
        for (let i = 0; i < fullList.length; i += itemsPerPage) {
            chunks.push(fullList.slice(i, i + itemsPerPage));
        }
        return chunks;
    }, [reviews]);

    return (
        <div className={styles.pageWrapper}>
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
                <span className={styles.info}>* SYSTEM_STATUS: MONITORING_ACTIVE</span>
                <div className={styles.footerActions}>
                    <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className={styles.navBtn}>TOP ▲</button>
                </div>
            </footer>
        </div>
    );
};

export default Reviews;