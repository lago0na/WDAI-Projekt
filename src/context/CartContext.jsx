import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Ładujemy koszyk z localStorage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    // === 1. ZABEZPIECZONE DODAWANIE DO KOSZYKA ===
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);

            // Ile sztuk tego produktu mamy już w koszyku?
            const currentQtyInCart = existingItem ? existingItem.quantity : 0;

            // Ile chcemy mieć łącznie?
            const totalWanted = currentQtyInCart + quantity;

            // /// STOCK PROTECTION ///
            // Jeśli chcemy więcej niż jest w magazynie -> BLOKUJEMY
            if (totalWanted > product.stock) {
                alert(`SORRY! We only have ${product.stock} copies of "${product.title}" in stock.`);
                // Zwracamy stary koszyk bez zmian (lub możesz dodać max dostępną ilość)
                return prevCart;
            }

            // Jeśli jest OK, dodajemy normalnie
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });

        // Otwieramy koszyk tylko jeśli udało się dodać (można dodać warunek, ale uproszczamy)
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // === 2. ZABEZPIECZONA ZMIANA ILOŚCI (+/-) ===
    const updateQuantity = (id, amount) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + amount;

                // /// STOCK PROTECTION ///
                // Jeśli próbujemy zwiększyć ilość (amount > 0) i przekraczamy stock
                if (amount > 0 && newQuantity > item.stock) {
                    alert(`MAX LIMIT REACHED: Only ${item.stock} items available.`);
                    return item; // Zwracamy bez zmian
                }

                // Nie pozwalamy też zejść poniżej 1 (chyba że usuwamy przyciskiem remove)
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalPrice,
            totalItems,
            isCartOpen,
            openCart,
            closeCart,
            toggleCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);