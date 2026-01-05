import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const { user } = useAuth();
  return (
      <div className="app-container">
        <Navbar />

        <Routes>
          {/* === TO CZYNI HOME STRONĄ DOMYŚLNĄ === */}
          {/* Użytkownik wchodząc na "twojastrona.pl/" zobaczy Home */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={
                <ProtectedRoute>
                    <Shop />
                </ProtectedRoute>
            } />

            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
            <Route path="/admin" element={
                <ProtectedRoute>
                    {user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />}
                </ProtectedRoute>
            } />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* === OBSŁUGA BŁĘDÓW / PRZEKIEROWANIE === */}
          {/* Gwiazdka "*" oznacza "wszystko inne". */}
          {/* Jeśli ktoś wpisze zły adres, zostanie przeniesiony do Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
  );
}

export default App;