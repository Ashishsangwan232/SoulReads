// src/contexts/likeContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const LikeContext = createContext();

export const useLikeContext = () => {
    const context = useContext(LikeContext);
    if (!context) {
        throw new Error('useLikeContext must be used within a LikeProvider');
    }
    return context;
};

export const LikeProvider = ({ children }) => {
    const [loadingStates, setLoadingStates] = useState({});
    const [errorStates, setErrorStates] = useState({});

    // Axios instance with credentials enabled
    const axiosInstance = axios.create({
        baseURL: '/api/likes',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const toggleLike = useCallback(async (targetId, targetType) => {
        const operationKey = `${targetType}-${targetId}`;
        setLoadingStates(prev => ({ ...prev, [operationKey]: true }));
        setErrorStates(prev => ({ ...prev, [operationKey]: null }));

        try {
            const response = await axiosInstance.post('/toggle', { targetId, targetType });
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return response.data; // { message, liked, likesCount }
        } catch (error) {
            console.error('Error toggling like:', error.message);
            // const message = error.response?.data?.message || error.message;
            setErrorStates(prev => ({ ...prev, [operationKey]: 'message you need to login in first!!' }));
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            throw new Error(message);
        }
    }, []);

    const checkUserLikeStatus = useCallback(async (targetId, targetType) => {
        const operationKey = `status-${targetType}-${targetId}`;
        setLoadingStates(prev => ({ ...prev, [operationKey]: true }));
        setErrorStates(prev => ({ ...prev, [operationKey]: null }));

        try {
            const response = await axiosInstance.get(`/status/${targetType}/${targetId}`);
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return response.data; // { liked: boolean }
        } catch (error) {
            console.error('Error checking like status:', error.message);
            const message = error.response?.data?.message || error.message;
            setErrorStates(prev => ({ ...prev, [operationKey]: message }));
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            throw new Error(message);
        }
    }, []);

    const getLikesForTarget = useCallback(async (targetId, targetType) => {
        const operationKey = `fetch-${targetType}-${targetId}`;
        setLoadingStates(prev => ({ ...prev, [operationKey]: true }));
        setErrorStates(prev => ({ ...prev, [operationKey]: null }));

        try {
            const response = await axiosInstance.get(`/${targetType}/${targetId}`);
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return response.data; // { message, count, likes }
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
