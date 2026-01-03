import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
      <div className="app-container">
        <Navbar />

        <Routes>
          {/* === TO CZYNI HOME STRONĄ DOMYŚLNĄ === */}
          {/* Użytkownik wchodząc na "twojastrona.pl/" zobaczy Home */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* === OBSŁUGA BŁĘDÓW / PRZEKIEROWANIE === */}
          {/* Gwiazdka "*" oznacza "wszystko inne". */}
          {/* Jeśli ktoś wpisze zły adres, zostanie przeniesiony do Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
  );
}

export default App;