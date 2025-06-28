import { useEffect, useContext } from 'react';
import { messaging, getToken, onMessage } from './firebase';
import { saveFcmToken } from './firebaseaxios';
import { AuthContext } from '../context/AuthContext';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

const useFCMNotifications = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.id) return;

        const requestAndSaveToken = () => {
            getToken(messaging, { vapidKey: VAPID_KEY })
                .then(currentToken => {
                    if (currentToken) {
                        console.log('✅ FCM Token:', currentToken);
                        saveFcmToken(currentToken, user.id);
                    } else {
                        console.warn('⚠️ No registration token available.');
                    }
                })
                .catch(err => console.error('❌ Token retrieval error:', err));
        };

        Notification.requestPermission().then(permission => {
            console.log('🔔 Notification permission:', permission);
            if (permission === 'granted') {
                requestAndSaveToken();
            } else {
                console.warn('🚫 Notifications permission denied.');
            }
        });

        const unsubscribe = onMessage(messaging, payload => {
            console.log('📢 Foreground message:', payload);
            new Notification(payload.notification.title, {
                body: payload.notification.body,
                icon: '/images/logo SR.svg',
            });
        });

        return unsubscribe;
    }, [user?.id]);
};

export default useFCMNotifications;
