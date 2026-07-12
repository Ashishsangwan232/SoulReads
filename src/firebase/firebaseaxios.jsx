import api from '../services/api';

export const saveFcmToken = async (token) => {
    if (!token) {
        console.warn('Missing token while saving FCM token.');
        return;
    }

    try {
        // Server always uses the authenticated session's identity for this --
        // it never needed (or should trust) a client-supplied userId.
        const response = await api.post('/notifications/save-token', { token });
        console.log('✅ FCM token saved:', response.data.message);
    } catch (error) {
        console.error('❌ Failed to save FCM token:', error.response?.data?.message || error.message);
    }
};
