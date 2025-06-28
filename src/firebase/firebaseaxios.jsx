import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const saveFcmToken = async (token) => {
    if (!token || !userId) {
        console.warn('Missing token or userId while saving FCM token.');
        return;
    }

    try {
        const response = await axios.post(
            `${API_URL}/save-token`,
            { token},
            { withCredentials: true }
        );

        console.log('✅ FCM token saved:', response.data.message);
    } catch (error) {
        console.error('❌ Failed to save FCM token:', error.response?.data?.message || error.message);
    }
};
