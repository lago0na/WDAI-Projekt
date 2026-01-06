//trzymanie tokenu i danych uzytkownika

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (userData, accessToken) => {
        setUser(userData);
        setToken(accessToken);
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // <--- DODAJ TĘ LINIJKĘ
    };

    return(
        <AuthContext.Provider value={{user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



