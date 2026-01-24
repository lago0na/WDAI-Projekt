import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useAuth } from './context/AuthContext/AuthContext';
import AdminPanel from './pages/AdminPanel';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import MovieDetails from './pages/MovieDetails';
import Reviews from "./pages/Reviews.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import Orders from './pages/Orders.jsx';
import CartSidebar from "./components/Navbar/CartSidebar.jsx";

function App() {
    const { user } = useAuth();
    const location = useLocation();

    const hiddenNavbarRoutes = ['/shop', '/orders', '/movie', '/admin'];

    const shouldHideNavbar = hiddenNavbarRoutes.some(path => location.pathname.startsWith(path));

    return (
        <div className="app-container">

            {!shouldHideNavbar && <Navbar/>}

            <CartSidebar />

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>

                <Route path="/shop" element={
                    <ProtectedRoute>
                        <Shop/>
                    </ProtectedRoute>
                }/>

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                }/>

                <Route path="/admin" element={
                    <ProtectedRoute>
                        {user?.role === 'admin' ? <AdminPanel/> : <Navigate to="/"/>}
                    </ProtectedRoute>
                }/>

                <Route path="/movie/:id" element={<MovieDetails/>}/>
                <Route path="/reviews" element={<Reviews/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/orders" element={
                    <ProtectedRoute>
                        <Orders/>
                    </ProtectedRoute>
                }/>

                <Route path="*" element={<Navigate to="/" replace/>}/>
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </div>
    );
}

export default App;