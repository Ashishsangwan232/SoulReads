import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Already in your environment config

export const saveFcmToken = async (token) => {
    try {
        const response = await axios.post(
            `${API_URL}/save-token`,
            { token },
            { withCredentials: true } // Ensures cookies (auth) sent
        );

        console.log('✅ FCM token saved:', response.data.message);
    } catch (error) {
        console.error('❌ Failed to save FCM token:', error.response?.data?.message || error.message);
    }
};
