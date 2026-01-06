import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
// Importujemy nowy moduł CSS
import styles from './css/Cart.module.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const { token, user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!token || !user) {
            alert("BŁĄD SYSTEMU: BRAK AUTORYZACJI. ZALOGUJ SIĘ PONOWNIE.");
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            alert("SYSTEM MESSAGE: KOSZYK JEST PUSTY.");
            return;
        }

        const newOrder = {
            userId: user.id,
            userEmail: user.email,
            date: new Date().toISOString(),
            items: cart,
            totalAmount: totalPrice,
            status: "COMPLETED"
        };

        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newOrder)
            });

            if (response.ok) {
                alert("TRANSAKCJA UDANA. PRZEKIEROWANIE DO HISTORII...");
                clearCart();
                navigate('/orders');
            } else {
                console.error("Błąd serwera:", response.status);
                alert("BŁĄD BAZY DANYCH: Nie udało się zapisać zamówienia.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("BŁĄD SIECI: Sprawdź czy serwer działa.");
        }
    };

    return (
        <div className={styles.cartWrapper}>
            <Navbar />

            <div className={styles.cartContainer}>
                <h1 className={`${styles.pageTitle} main-heading`}>
                    YOUR_CART_CONTENT
                </h1>

                {cart.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <h2 className={`${styles.emptyMessage} main-heading`}>[ NO TAPES INSERTED ]</h2>
                        <Link to="/shop" className={`${styles.returnLink} main-heading`}>
                            &lt; RETURN TO ARCHIVE (SHOP)
                        </Link>
                    </div>
                ) : (
                    <div>
                        {/* LISTA PRODUKTÓW */}
                        {cart.map((item) => (
                            <div key={item.id} className={styles.itemRow}>
                                <img
                                    src={item.poster || item.image}
                                    alt={item.title}
                                    className={styles.itemImage}
                                />

                                <div className={styles.itemInfo}>
                                    <h3 className={`${styles.itemTitle} main-heading`}>{item.title}</h3>
                                    <p className={styles.itemPriceSmall}>{item.price} zł</p>
                                </div>

                                <div className={styles.quantityControl}>
                                    <button onClick={() => updateQuantity(item.id, -1)} className={styles.qtyBtn}>-</button>
                                    <span className={styles.qtyNumber}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className={styles.qtyBtn}>+</button>
                                </div>

                                <div className={styles.itemTotalPrice}>
                                    {(item.price * item.quantity).toFixed(2)} zł
                                </div>

                                <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                                    &times;
                                </button>
                            </div>
                        ))}

                        {/* PODSUMOWANIE */}
                        <div className={styles.summarySection}>
                            <h2 className={`${styles.totalPrice} main-heading`}>
                                TOTAL: {totalPrice.toFixed(2)} zł
                            </h2>

                            <button onClick={handleCheckout} className={`${styles.checkoutBtn} main-heading`}>
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;