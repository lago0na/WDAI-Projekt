// src/components/MoviePopup.jsx
import styles from './MoviePopup.module.css';

export default function MoviePopup({ movie, onClose }) {
    if (!movie) return null;

    // 1. Sprawdzamy czy tytuł jest długi (powyżej 20 znaków)
    const isLongTitle = movie.title.length > 20;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>

                <div className={styles.headerBar}>
                    <div className={`${styles.headerLogo} main-heading`} data-text="VHS_CLUB">
                        VHS_CLUB
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                </div>

                <div className={styles.contentBody}>
                    <div className={styles.infoSection}>

                        <h2 className={`
                            ${styles.title} 
                            main-heading 
                            ${isLongTitle ? styles.longTitle : ''}
                        `}>
                            {movie.title}
                        </h2>

                        <p className={styles.description}>
                            {movie.description || "No description available."}
                        </p>

                        <div className={styles.meta}>
                            <p><strong>Director:</strong> {movie.director}</p>
                            <p><strong>Year:</strong> {movie.year}</p>
                            <p><strong>Genre:</strong> {movie.category}</p>
                        </div>
                    </div>

                    <div className={styles.imageSection}>
                        <img
                            src={movie.poster || movie.image}
                            alt={movie.title}
                            className={styles.poster}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}