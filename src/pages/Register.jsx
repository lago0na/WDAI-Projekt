import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './css/Login.module.css'; // Używamy tych samych stylów

const Register = () => {
    const [userData, setUserData] = useState({ username: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                alert("WELCOME TO THE CLUB! You can log in now.");
                navigate('/login');
            } else {
                alert("ERROR: Username or email already taken!");
            }
        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.loginCard}>
                <h1 className={`${styles.glitchTitle} main-heading`} data-text="REGISTER">
                    REGISTER
                </h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>USERNAME</label>
                        <input type="text" name="username" placeholder="USER_ID" required
                               className={styles.input} onChange={(e) => setUserData({...userData, username: e.target.value})} />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>E-MAIL</label>
                        <input type="email" name="email" placeholder="MAIL@VHS.PL" required
                               className={styles.input} onChange={(e) => setUserData({...userData, email: e.target.value})} />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>PASSWORD</label>
                        <input type="password" name="password" placeholder="********" required
                               className={styles.input} onChange={(e) => setUserData({...userData, password: e.target.value})} />
                    </div>
                    <button type="submit" className={styles.playBtn} style={{backgroundColor: 'var(--glitch-cyan)'}}>
                        JOIN THE CLUB (REC ●)
                    </button>
                </form>
                <Link to="/login" className={styles.footerInfo} style={{display: 'block', textDecoration: 'none'}}>
                    ALREADY HAVE AN ACCOUNT? LOG IN
                </Link>
            </div>
        </div>
    );
};

export default Register;