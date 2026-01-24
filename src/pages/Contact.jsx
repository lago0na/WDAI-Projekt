import React, { useState } from 'react';
import styles from './css/Contact.module.css';
import ShopNavbar from '../components/Navbar/ShopNavbar';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`TRANSMISSION SENT.\nTHANK YOU, ${formData.name.toUpperCase()}.`);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className={styles.contactWrapper}>
            <div className={styles.navbarWrapper}>
                <ShopNavbar />
            </div>

            <div className={styles.contactCard}>
                <div className={styles.headerSection}>
                    <h1 className={styles.glitchTitle}>CONTACT_US</h1>
                    <p className={styles.subtitle}>// ESTABLISH_CONNECTION</p>
                </div>

                <div className={styles.splitLayout}>
                    <div className={styles.infoColumn}>
                        <div className={styles.infoBlock}>
                            <h3>HEADQUARTERS:</h3>
                            <p>VHS_CLUB VIDEO STORE</p>
                            <p>1984 ANALOG STREET</p>
                            <p>LOS ANGELES, CA 90028</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3>HOTLINE:</h3>
                            <p className={styles.highlight}>(555) 0199-VHS</p>
                            <p className={styles.small}>* LINES OPEN 24/7</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3>DIGITAL MAIL:</h3>
                            <p>SUPPORT@VHS.CLUB</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.formColumn}>
                        <div className={styles.inputGroup}>
                            <label>CODENAME:</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="YOUR NAME..."
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>FREQUENCY (EMAIL):</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="YOUR@EMAIL.COM..."
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>MESSAGE_DATA:</label>
                            <textarea
                                required
                                rows="5"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                placeholder="TYPE YOUR MESSAGE HERE..."
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            SEND TRANSMISSION ►
                        </button>
                    </form>
                </div>

                <div className={styles.footerInfo}>
                    * ENCRYPTED CONNECTION ESTABLISHED
                </div>
            </div>
        </div>
    );
};

export default Contact;