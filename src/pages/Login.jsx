import React, { useState } from 'react';
import styles from './css/Login.module.css';
import { useAuth } from '../context/AuthContext/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("LOGOWANIE DANYMI:", credentials);

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();

            if (response.ok) {
                const token = data.accessToken || data.token;
                login(data.user, token);
                navigate('/');
            } else {
                console.error("Błąd serwera:", data);
                alert("CLUB ERROR: ACCESS DENIED (Check Email/Password)");
            }
        } catch (err) {
            console.error("System failure:", err);
            alert("CRITICAL ERROR: Is the server running?");
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.loginCard}>
                <div className={styles.scanline}></div>

                <h1 className={`${styles.glitchTitle} main-heading`} data-text="ENTER_THE_CLUB">
                    ENTER_THE_CLUB
                </h1>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputWrapper}>
                        <label className={`${styles.label}`}>E-MAIL ACCESS</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="MAIL@VHS.PL"
                            className={styles.input}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={`${styles.label}`}>ACCESS PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            className={styles.input}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className={`${styles.playBtn} main-heading`}>
                        PLAY SESSION (PLAY ►)
                    </button>
                </form>

                <div className={styles.registerBox}>
                    <p className={styles.registerText}>FIRST TIME AT THE CLUB?</p>
                    <Link to="/register" className={`${styles.registerLink}`}>
                        CREATE AN ACCOUNT (REC ●)
                    </Link>
                </div>

                <div className={styles.footerInfo}>
                    * JWT_TOKEN AUTHORIZATION REQUIRED
                </div>
            </div>
        </div>
    );
};

export default LoginPage;