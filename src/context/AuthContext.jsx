// Let's say your app is a house.
// Local state (useState) is like writing something in your own room — others can't see it.
// React Context is like writing on a whiteboard in the hallway — everyone in the house can read or change it.
// So, if a user logs in on the Login Page, the Navbar, Dashboard, and other pages can see who is logged in immediately, because they all check the whiteboard (Context).

//authContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true; // Always send cookies

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;
    // Check session on first mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${API_URL}/auth/profile`);
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    // Login function
    const login = async (email, password, rememberMe) => {
        try {
            const res = await axios.post(`${API_URL}/auth/signin`, {
                email,
                password,
                rememberMe,
            });
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || 'Login failed',
            };
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.post(`${API_URL}/auth/signout`);
            setUser(null);
            window.location.reload(); // This refreshes the page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const updateprofile = async (updatedUsername, phoneNumber) => {
        try {
            const res = await axios.put(`${API_URL}/auth/update-profile`, {
                newUsername: updatedUsername,
                phoneNumber: phoneNumber,
            });
            setUser(res.data.user);
            return { success: true };
        } catch (error) {
            console.error('Update failed:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Update failed',
            };
        }
    };

    const updateprofilepic = async (profilePicKey) => {
        try {
            const res = await axios.put(`${API_URL}/auth/avatar`, {
                profilePicKey
            });
            setUser(res.data.user);
            return { success: true };
        } catch (error) {
            console.error('Profile pic Update failed:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Profile pic Update failed',
            };
        }
    };

    // const refreshToken = (req, res) => {
    //     const token = req.cookies?.refreshToken;
    //     if (!token) return res.status(401).json({ message: 'No refresh token.' });

    //     jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
    //         if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    //         const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    //         res.json({ accessToken });
    //     });
    // };

    return (
        <AuthContext.Provider value={{ user, updateprofile, updateprofilepic, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

