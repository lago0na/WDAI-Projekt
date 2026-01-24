import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShopNavbar from '../components/Navbar/ShopNavbar.jsx';
import styles from './css/MovieDetails.module.css';
import { useCart } from '../context/CartContext.jsx';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
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
        if (movie) {
            addToCart(movie);
        }
    };

    if (loading) return <div className={styles.container}>Loading...</div>;
    if (!movie) return <div className={styles.container}>Movie not found</div>;

    const isLongTitle = movie.title.length > 14;

    return (
        <div className={styles.container}>
            <ShopNavbar />

            <div className={styles.contentWrapper}>
                {/* POPRAWKA 1: Usunięty ukośnik "\" na końcu linii */}
                <div className={styles.infoSection}>

                    <Link to="/shop" className={styles.backLink}>
                        &lt; BACK TO SHOP
                    </Link>

                    {/* POPRAWKA 2: Dodane spacje między klasami w backticks `` */}
                    <h1 className={`${styles.title} main-heading ${isLongTitle ? styles.longTitle : ''}`}>
                        {movie.title}
                    </h1>

                    <p className={styles.description}>{movie.description}</p>

                    <div className={styles.metaInfo}>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Year:</strong> {movie.year}</p>
                        <p><strong>Genre:</strong> {movie.category}</p>

                        <p className={styles.priceRow}>
                            <strong>Price:</strong> <span className={styles.priceHighlight}>{movie.price} zł</span>
                        </p>

                        <p><strong>Stock:</strong> {movie.stock} copies left</p>
                    </div>

                    <button
                        className={styles.addToCartBtn}
                        onClick={handleAddToCart}
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