import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext/AuthContext.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const { user, token } = useAuth();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Zabezpieczenie: jak nie ma tokena, wyrzuć do logowania
        if (!token) {
            navigate('/login');
            return;
        }

        // Pobieramy zamówienia TYLKO dla tego użytkownika
        // JSON-Server pozwala filtrować przez ?userId=...
        fetch(`http://localhost:3000/orders?userId=${user?.id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Ważne dla json-server-auth
            }
        })
            .then(res => res.json())
            .then(data => {
                // Sortujemy: najnowsze na górze
                // (Zakładając, że zapiszemy datę jako string ISO)
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setOrders(sorted);
            })
            .catch(err => console.error("Błąd pobierania zamówień:", err));
    }, [user, token, navigate]);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: '#f4e2ce' }}>
            <Navbar />

            <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '100px', paddingLeft: '20px', paddingRight: '20px' }}>
                <h1 className="main-heading" style={{ fontSize: '2.5rem', marginBottom: '30px', borderBottom: '2px solid #e5a657' }}>
                    TRANSACTION_HISTORY
                </h1>

                {orders.length === 0 ? (
                    <div style={{ opacity: 0.7, textAlign: 'center', marginTop: '50px' }}>
                        <p>[NO RECORDS FOUND IN ARCHIVE]</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {orders.map((order) => (
                            <div key={order.id} style={{
                                backgroundColor: '#1f1f1f',
                                padding: '20px',
                                borderRadius: '5px',
                                border: '1px solid #333',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                            }}>
                                {/* Nagłówek zamówienia */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
                                    <div>
                                        <span style={{ color: '#888', fontSize: '0.8rem', display: 'block' }}>DATE:</span>
                                        <span style={{ fontWeight: 'bold' }}>{new Date(order.date).toLocaleString()}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ color: '#888', fontSize: '0.8rem', display: 'block' }}>TOTAL:</span>
                                        <span style={{ color: '#e5a657', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                            {order.totalAmount?.toFixed(2)} zł
                                        </span>
                                    </div>
                                </div>

                                {/* Lista produktów w tym zamówieniu */}
                                <div>
                                    {order.items.map((item, index) => (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px' }}>
                                            <span style={{ color: '#ddd' }}>{item.title} <span style={{opacity: 0.5}}>x{item.quantity}</span></span>
                                            <span style={{ opacity: 0.6 }}>{(item.price * item.quantity).toFixed(2)} zł</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: '15px', fontSize: '0.8rem', color: '#0f0', letterSpacing: '1px' }}>
                                    STATUS: {order.status}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;