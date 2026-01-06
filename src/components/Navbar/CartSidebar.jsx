import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import styles from './CartSidebar.module.css';

const CartSidebar = () => {
    // Pobieramy stany z Contextu (w tym isCartOpen!)
    const {
        cart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        clearCart,
        isCartOpen,
        closeCart
    } = useCart();

    const { token, user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!token || !user) {
            closeCart(); // Zamykamy koszyk żeby user widział login
            alert("SYSTEM: LOGGING REQUIRED.");
            navigate('/login');
            return;
        }

        if (cart.length === 0) return;

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
                alert("ORDER SUCCESSFUL!");
                clearCart();
                closeCart(); // Zamykamy po sukcesie
                navigate('/orders');
            } else {
                alert("ERROR PROCESSING ORDER.");
            }
        } catch (error) {
            console.error(error);
            alert("NETWORK ERROR.");
        }
    };

    return (
        <>
            {/* TŁO (kliknięcie zamyka koszyk) */}
            <div
                className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`}
                onClick={closeCart}
            />

            {/* PANEL BOCZNY */}
            <div className={`${styles.sidebar} ${isCartOpen ? styles.open : ''}`}>

                {/* 1. HEADER */}
                <div className={styles.header}>
                    <h2 className="main-heading" style={{margin:0}}>YOUR_CART</h2>
                    <button onClick={closeCart} className={styles.closeBtn}>&times;</button>
                </div>

                {/* 2. LISTA PRODUKTÓW */}
                <div className={styles.cartItems}>
                    {cart.length === 0 ? (
                        <p style={{opacity: 0.5, textAlign: 'center', marginTop: '50px'}}>
                            [ EMPTY SLOT ]
                        </p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className={styles.itemRow}>
                                <img src={item.poster || item.image} alt={item.title} className={styles.itemImage} />

                                <div className={styles.itemDetails}>
                                    <div>
                                        <h4 className={`${styles.itemTitle} main-heading`}>{item.title}</h4>
                                        <div style={{fontSize: '0.9rem', color: '#888'}}>{item.price} zł</div>
                                    </div>

                                    <div className={styles.quantityControls}>
                                        <button onClick={() => updateQuantity(item.id, -1)} className={styles.qtyBtn}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className={styles.qtyBtn}>+</button>
                                    </div>

                                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                                        REMOVE
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* 3. FOOTER (Total + Checkout) */}
                {cart.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.totalRow}>
                            <span className="main-heading">TOTAL:</span>
                            <span className="main-heading">{totalPrice.toFixed(2)} zł</span>
                        </div>
                        <button onClick={handleCheckout} className={`${styles.checkoutBtn} main-heading`}>
                            CHECKOUT
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;