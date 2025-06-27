import { useEffect } from 'react';
import { messaging, getToken, onMessage } from './firebase';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

const useFCMNotifications = () => {
    useEffect(() => {
        Notification.requestPermission().then(permission => {
            console.log('Notification permission:', permission);
            if (permission === 'granted') {
                getToken(messaging, { vapidKey: VAPID_KEY })
                    .then(currentToken => {
                        if (currentToken) {
                            console.log('✅ FCM Token:', currentToken);
                            // Optional: Send token to your server
                        } else {
                            console.log('⚠️ No registration token available.');
                        }
                    })
                    .catch(err => console.error('❌ Token retrieval error:', err));
            } else {
                console.warn('🚫 Notifications permission denied.');
            }
        });

        onMessage(messaging, payload => {
            console.log('📢 Foreground message:', payload);
            new Notification(payload.notification.title, {
                body: payload.notification.body,
                icon: '/images/logo SR.svg',
            });
        });
    }, []);
};

export default useFCMNotifications;
