import styles from './HeroSection.module.css';

export default function HeroSection() {
    return (
        <div className={styles.heroContainer}>
            <h1 className={`${styles.heading} main-heading`}>
                VHS_CLUB
            </h1>
        </div>
    );
}