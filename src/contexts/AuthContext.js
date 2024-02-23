import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { apiUrl } from '../constants';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null,
    );

    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/auth?token=${token}`)
            .then((response) => {
                setUser(response.data);
                setAuthToken(token);
            })
            .catch((error) => {
                setUser(null);
                console.log(error);
            });
    }, [token]);

    useEffect(() => {
        setAuthToken(token);
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        setAuthToken(newToken);
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
