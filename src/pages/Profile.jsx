import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext/AuthContext.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
import styles from './css/Profile.module.css';

const Profile = () => {
    const { user, token, logout } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user && token) {
            fetch(`http://localhost:3000/orders?userId=${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
                })
                .catch(err => console.error("Błąd pobierania historii:", err));
        }
    }, [user, token]);

    if (!user) return <div style={{color:'white', padding: '100px'}}>ACCESS DENIED</div>;

    return (
        <div className={styles.profileWrapper}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className="main-heading">MEMBER_PROFILE</h1>
                    <button onClick={logout} className={styles.logoutBtn}>
                        [EJECT SESSION]
                    </button>
                </div>
                <div className={styles.userCard}>
                    <div className={styles.avatarPlaceholder}>
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userInfo}>
                        <h2 className="main-heading">{user.username}</h2>
                        <p><span className={styles.label}>EMAIL:</span> {user.email}</p>
                        <p><span className={styles.label}>MEMBER ID:</span> #{user.id}</p>
                        <p><span className={styles.label}>ROLE:</span> {user.role.toUpperCase()}</p>
                    </div>
                </div>
                <div className={styles.historySection}>
                    <h2 className="main-heading">PURCHASE_HISTORY ({orders.length})</h2>

                    {orders.length === 0 ? (
                        <p style={{opacity: 0.5}}>[ NO RECORDS FOUND IN DATABASE ]</p>
                    ) : (
                        <div>
                            {orders.map(order => (
                                <div key={order.id} className={styles.orderCard}>
                                    <div className={styles.orderHeader}>
                                        <div className={styles.orderDate}>
                                            {new Date(order.date).toLocaleString()}
                                        </div>
                                        <div className={styles.orderTotal}>
                                            {order.totalAmount.toFixed(2)} zł
                                        </div>
                                    </div>

                                    <div className={styles.itemsList}>
                                        {order.items.map((item, index) => (
                                            <div key={index} className={styles.itemRow}>
                                                <span>{item.title} <span style={{opacity:0.5}}>x{item.quantity}</span></span>
                                                <span>{(item.price * item.quantity).toFixed(2)} zł</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;