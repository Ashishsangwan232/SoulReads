// // src/contexts/likeContext.js
// import React, { createContext, useContext, useState, useCallback } from 'react';
// import axios from 'axios';

// const LikeContext = createContext();

// export const useLikeContext = () => {
//     const context = useContext(LikeContext);
//     if (!context) {
//         throw new Error('useLikeContext must be used within a LikeProvider');
//     }
//     return context;
// };

// export const LikeProvider = ({ children }) => {
//     const [loadingStates, setLoadingStates] = useState({});
//     const [errorStates, setErrorStates] = useState({});
//     const API_URL = import.meta.env.VITE_API_URL;

//     const toggleLike = useCallback(async (targetId, targetType) => {
//         const operationKey = `${targetType}-${targetId}`;
//         setLoadingStates(prev => ({ ...prev, [operationKey]: true }));
//         setErrorStates(prev => ({ ...prev, [operationKey]: null }));

//         try {
//             const response = await axios.post(`${API_URL}/likes/toggle`, { targetId, targetType });
//             setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
//             return response.data; // { message, liked, likesCount }
//         } catch (error) {
//             console.error('Error toggling like:', error.message);
//             // const message = error.response?.data?.message || error.message;
//             setErrorStates(prev => ({ ...prev, [operationKey]: 'message you need to login in first!!' }));
//             setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
//             throw new Error(message);
//         }
//     }, []);

//     const checkUserLikeStatus = useCallback(async (targetId, targetType) => {
//         const operationKey = `status-${targetType}-${targetId}`;
//         setLoadingStates(prev => ({ ...prev, [operationKey]: true }));
//         setErrorStates(prev => ({ ...prev, [operationKey]: null }));

//         try {
//             const response = await axios.get(`${API_URL}/likes/status/${targetType}/${targetId}`);
//             setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
//             return response.data; // { liked: boolean }
//         } catch (error) {
//             console.error('Error checking like status:', error.message);
//             const message = error.response?.data?.message || error.message;
//             setErrorStates(prev => ({ ...prev, [operationKey]: message }));
//             setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
//             throw new Error(message);
//         }
//     }, []);

//     const getLikesForTarget = useCallback(async (targetId, targetType) => {
//         const operationKey = `fetch-${targetType}-${targetId}`;
//         setLoadingStates(prev => ({ ...prev, [operationKey]: true }));
//         setErrorStates(prev => ({ ...prev, [operationKey]: null }));

//         try {
//             const response = await axios.get(`${API_URL}/likes/${targetType}/${targetId}`);
//             setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
//             return response.data; // { message, count, likes }
//         } catch (error) {
//             console.error('Error fetching likes:', error.message);
//             const message = error.response?.data?.message || error.message;
//             setErrorStates(prev => ({ ...prev, [operationKey]: message }));
//             setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
//             throw new Error(message);
//         }
//     }, []);

//     const value = {
//         toggleLike,
//         checkUserLikeStatus,
//         getLikesForTarget,
//         loadingStates,
//         errorStates,
//     };

//     return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
// };




import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from "./AuthContext";

const LikeContext = createContext();

export const useLikeContext = () => {
    const context = useContext(LikeContext);
    if (!context) {
        throw new Error('useLikeContext must be used within a LikeProvider');
    }
    return context;
};

export const LikeProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [loadingStates, setLoadingStates] = useState({});
    const [errorStates, setErrorStates] = useState({});
    const API_URL = import.meta.env.VITE_API_URL;

    const toggleLike = useCallback(async (targetId, targetType) => {
        const operationKey = `${targetType}-${targetId}`;
        setLoadingStates(prev => ({ ...prev, [operationKey]: true }));
        setErrorStates(prev => ({ ...prev, [operationKey]: null }));

        if (!user) {
            alert('You need to login first!');
            setErrorStates(prev => ({ ...prev, [operationKey]: 'You need to login first!' }));
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return; // Stop the function
        }

        try {
            const response = await axios.post(`${API_URL}/likes/toggle`, { targetId, targetType }, {
                withCredentials: true
            });
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return response.data;
        } catch (error) {
            console.error('Error toggling like:', error.message);
            const message = error.response?.data?.message || error.message;
            setErrorStates(prev => ({ ...prev, [operationKey]: message }));
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            throw new Error(message);
        }
    }, [user]);

    const checkUserLikeStatus = useCallback(async (targetId, targetType) => {
        const operationKey = `status-${targetType}-${targetId}`;
        setLoadingStates(prev => ({ ...prev, [operationKey]: true }));
        setErrorStates(prev => ({ ...prev, [operationKey]: null }));

        if (!user) {
            setErrorStates(prev => ({ ...prev, [operationKey]: 'You need to login first!' }));
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return { liked: false };
        }

        try {
            const response = await axios.get(`${API_URL}/likes/status/${targetType}/${targetId}`, {
                withCredentials: true
            });
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return response.data;
        } catch (error) {
            console.error('Error checking like status:', error.message);
            const message = error.response?.data?.message || error.message;
            setErrorStates(prev => ({ ...prev, [operationKey]: message }));
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            throw new Error(message);
        }
    }, [user]);

    const getLikesForTarget = useCallback(async (targetId, targetType) => {
        const operationKey = `fetch-${targetType}-${targetId}`;
        setLoadingStates(prev => ({ ...prev, [operationKey]: true }));
        setErrorStates(prev => ({ ...prev, [operationKey]: null }));

        try {
            const response = await axios.get(`${API_URL}/likes/${targetType}/${targetId}`);
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return response.data;
        } catch (error) {
            console.error('Error fetching likes:', error.message);
            const message = error.response?.data?.message || error.message;
            setErrorStates(prev => ({ ...prev, [operationKey]: message }));
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            throw new Error(message);
        }
    }, []);

    const value = {
        toggleLike,
        checkUserLikeStatus,
        getLikesForTarget,
        loadingStates,
        errorStates,
    };

    return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
};
