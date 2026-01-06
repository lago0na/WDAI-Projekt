import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import styles from './css/MovieDetails.module.css';
// 1. IMPORTUJEMY CONTEXT
import { useCart } from '../context/CartContext.jsx';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    // 2. WYCIĄGAMY FUNKCJĘ Z CONTEXTU
    const { addToCart } = useCart();

    useEffect(() => {
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

    const handleAddToCart = () => {
        // 3. LOGIKA DODAWANIA
        if (movie) {
            addToCart(movie);
            //alert(`ADDED TO VHS CART: ${movie.title}`);
        }
    };

    if (loading) return <div className={styles.container}>Loading...</div>;
    if (!movie) return <div className={styles.container}>Movie not found</div>;

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.contentWrapper}>
                <div className={styles.infoSection}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <p className={styles.description}>{movie.description}</p>

                    <div className={styles.metaInfo}>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Price:</strong> {movie.price} zł</p>
                        {/* Wymóg: dostępna ilość */}
                        <p><strong>Stock:</strong> {movie.stock} copies left</p>
                    </div>

                    <button
                        className={styles.addToCartBtn}
                        onClick={handleAddToCart}
                        // Blokada przycisku jeśli brak towaru
                        disabled={movie.stock <= 0}
                        style={movie.stock <= 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                        {movie.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
                    </button>
                </div>

                <div className={styles.imageSection}>
                    <img src={movie.poster || movie.image} alt={movie.title} className={styles.poster} />
                </div>
            </div>
        </div>
    );
}