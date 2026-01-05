import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    // Jeśli nie ma tokenu, wyrzuć usera do logowania
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;