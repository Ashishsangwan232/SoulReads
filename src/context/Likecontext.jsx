import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import api, { getErrorMessage } from '../services/api';
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

    const toggleLike = useCallback(async (targetId, targetType) => {
        const operationKey = `${targetType}-${targetId}`;
        setLoadingStates(prev => ({ ...prev, [operationKey]: true }));
        setErrorStates(prev => ({ ...prev, [operationKey]: null }));

        if (!user) {
            const message = 'You need to log in first!';
            setErrorStates(prev => ({ ...prev, [operationKey]: message }));
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            throw new Error(message);
        }

        try {
            const response = await api.post('/likes/toggle', { targetId, targetType });
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, 'Error toggling like');
            console.error('Error toggling like:', message);
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
            setErrorStates(prev => ({ ...prev, [operationKey]: 'You need to log in first!' }));
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return { liked: false };
        }

        try {
            const response = await api.get(`/likes/status/${targetType}/${targetId}`);
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, 'Error checking like status');
            console.error('Error checking like status:', message);
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
            const response = await api.get(`/likes/${targetType}/${targetId}`);
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, 'Error fetching likes');
            console.error('Error fetching likes:', message);
            setErrorStates(prev => ({ ...prev, [operationKey]: message }));
            setLoadingStates(prev => ({ ...prev, [operationKey]: false }));
            throw new Error(message);
        }
    }, []);

    const value = useMemo(
        () => ({ toggleLike, checkUserLikeStatus, getLikesForTarget, loadingStates, errorStates }),
        [toggleLike, checkUserLikeStatus, getLikesForTarget, loadingStates, errorStates]
    );

    return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
};
