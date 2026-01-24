import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShopNavbar from '../components/Navbar/ShopNavbar.jsx'; // <--- ZMIANA: ShopNavbar zamiast Navbar
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

    // LOGIKA Z POPUPU: Sprawdzamy długość tytułu
    const isLongTitle = movie.title.length > 14;

    return (
        <div className={styles.container}>
            {/* Używamy ShopNavbar, żeby mieć koszyk i ciągłość designu */}
            <ShopNavbar />

            <div className={styles.contentWrapper}>
                <div className={styles.infoSection}>

                    {/* ZMIANA: Klasy main-heading i obsługa długiego tytułu */}
                    <h1 className={`
                        ${styles.title} 
                        main-heading 
                        ${isLongTitle ? styles.longTitle : ''}
                    `}>
                        {movie.title}
                    </h1>

                    <p className={styles.description}>{movie.description}</p>

                    <div className={styles.metaInfo}>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Year:</strong> {movie.year}</p> {/* Dodane, bo było w popupie */}
                        <p><strong>Genre:</strong> {movie.category}</p> {/* Dodane */}

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