import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import api, { getErrorMessage } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check session on first mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get('/auth/profile');
                setUser(res.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    // If any request anywhere in the app comes back 401, the shared api
    // client (src/services/api.js) broadcasts this event so we can clear the
    // logged-in user in one place instead of every context handling it itself.
    useEffect(() => {
        const handleUnauthorized = () => setUser(null);
        window.addEventListener('auth:unauthorized', handleUnauthorized);
        return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
    }, []);

    const login = useCallback(async (email, password, rememberMe) => {
        try {
            const res = await api.post('/auth/signin', { email, password, rememberMe });
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            return { success: false, message: getErrorMessage(err, 'Login failed') };
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await api.post('/auth/signout');
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, []);

    const updateprofile = useCallback(async (updatedUsername, phoneNumber) => {
        try {
            const res = await api.put('/auth/update-profile', {
                newUsername: updatedUsername,
                phoneNumber,
            });
            setUser(res.data.user);
            return { success: true };
        } catch (error) {
            return { success: false, message: getErrorMessage(error, 'Update failed') };
        }
    }, []);

    const updateprofilepic = useCallback(async (profilePicKey) => {
        try {
            const res = await api.put('/auth/avatar', { profilePicKey });
            setUser(res.data.user);
            return { success: true };
        } catch (error) {
            return { success: false, message: getErrorMessage(error, 'Profile pic update failed') };
        }
    }, []);

    const value = useMemo(
        () => ({ user, updateprofile, updateprofilepic, setUser, login, logout, loading }),
        [user, updateprofile, updateprofilepic, login, logout, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
