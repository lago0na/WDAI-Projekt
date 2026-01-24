import React, { useState, useEffect } from 'react';
import styles from './css/Admin.module.css';
import ShopNavbar from '../components/Navbar/ShopNavbar';
import { useAuth } from '../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMovie, setCurrentMovie] = useState({
        title: '',
        director: '',
        year: '',
        category: '',
        price: '',
        stock: '',
        image: '/images/placeholder.jpg',
        description: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    const fetchMovies = () => {
        fetch('http://localhost:3000/movies')
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("WARNING: DELETE TAPE FROM DATABASE?")) return;

        try {
            await fetch(`http://localhost:3000/movies/${id}`, { method: 'DELETE' });
            setMovies(movies.filter(m => m.id !== id));
        } catch (err) {
            alert("SYSTEM ERROR: DELETE FAILED");
        }
    };

    const openModal = (movie = null) => {
        if (movie) {
            setCurrentMovie(movie);
        } else {

            setCurrentMovie({
                title: '',
                director: '',
                year: 2000,
                category: 'Drama',
                price: 0,
                stock: 1,
                image: '/images/',
                description: '',
                style: {
                    rotate: Math.floor(Math.random() * 10) - 5, // -5 do 5
                    x: Math.floor(Math.random() * 20) - 10,
                    y: Math.floor(Math.random() * 20) - 10
                }
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const isEditing = !!currentMovie.id;
        const url = isEditing
            ? `http://localhost:3000/movies/${currentMovie.id}`
            : 'http://localhost:3000/movies';

        const method = isEditing ? 'PUT' : 'POST';
        const payload = {
            ...currentMovie,
            price: parseFloat(currentMovie.price),
            year: parseInt(currentMovie.year),
            stock: parseInt(currentMovie.stock)
        };

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                fetchMovies();
                setIsModalOpen(false);
            }
        } catch (err) {
            alert("ERROR: SAVE FAILED");
        }
    };

    if (!user || user.role !== 'admin') return null;

    return (
        <div className={styles.adminWrapper}>
            <div className={styles.navbarContainer}><ShopNavbar /></div>

            <div className={styles.contentContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>DATABASE_MANAGEMENT // MOVIES</h1>
                    <button onClick={() => openModal()} className={styles.addBtn}>
                        [+] NEW_TAPE
                    </button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>TITLE</th>
                            <th>STOCK</th>
                            <th>PRICE</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies.map(movie => (
                            <tr key={movie.id}>
                                <td className={styles.idCell}>#{movie.id}</td>
                                <td>
                                    <div className={styles.movieName}>{movie.title}</div>
                                    <div className={styles.subInfo}>{movie.director} ({movie.year})</div>
                                </td>
                                <td style={{ color: movie.stock < 5 ? 'red' : 'inherit' }}>
                                    {movie.stock} PCS
                                </td>
                                <td>{movie.price} PLN</td>
                                <td className={styles.actions}>
                                    <button onClick={() => openModal(movie)} className={styles.editBtn}>EDIT</button>
                                    <button onClick={() => handleDelete(movie.id)} className={styles.deleteBtn}>DEL</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>{currentMovie.id ? 'EDIT_DATA' : 'NEW_ENTRY'}</h2>
                        <form onSubmit={handleSave} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.group}>
                                    <label>TITLE:</label>
                                    <input required value={currentMovie.title} onChange={e => setCurrentMovie({...currentMovie, title: e.target.value})} />
                                </div>
                                <div className={styles.group}>
                                    <label>DIRECTOR:</label>
                                    <input required value={currentMovie.director} onChange={e => setCurrentMovie({...currentMovie, director: e.target.value})} />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.group}>
                                    <label>CATEGORY:</label>
                                    <input required value={currentMovie.category} onChange={e => setCurrentMovie({...currentMovie, category: e.target.value})} />
                                </div>
                                <div className={styles.group}>
                                    <label>YEAR:</label>
                                    <input type="number" required value={currentMovie.year} onChange={e => setCurrentMovie({...currentMovie, year: e.target.value})} />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.group}>
                                    <label>PRICE (PLN):</label>
                                    <input type="number" step="0.01" required value={currentMovie.price} onChange={e => setCurrentMovie({...currentMovie, price: e.target.value})} />
                                </div>
                                <div className={styles.group}>
                                    <label>STOCK (PCS):</label>
                                    <input type="number" required value={currentMovie.stock} onChange={e => setCurrentMovie({...currentMovie, stock: e.target.value})} />
                                </div>
                            </div>

                            <div className={styles.group}>
                                <label>IMAGE PATH (e.g. /images/film.jpg):</label>
                                <input required value={currentMovie.image} onChange={e => setCurrentMovie({...currentMovie, image: e.target.value})} />
                            </div>

                            <div className={styles.group}>
                                <label>DESCRIPTION:</label>
                                <textarea rows="3" required value={currentMovie.description} onChange={e => setCurrentMovie({...currentMovie, description: e.target.value})} />
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>ABORT</button>
                                <button type="submit" className={styles.saveBtn}>SAVE_DATA</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;