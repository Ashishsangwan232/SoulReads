import { useEffect } from 'react';
import { messaging, getToken, onMessage } from './firebase';

const VAPID_KEY = import.meta.env.FIRBASE_APPID; // From Firebase Console → Cloud Messaging tab

const useFCMNotifications = () => {

    useEffect(() => {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                getToken(messaging, { vapidKey: VAPID_KEY })
                    .then(currentToken => {
                        if (currentToken) {
                            console.log('FCM Token:', currentToken);
                            // 🔥 Send token to your server for future pushes
                        } else {
                            console.log('No registration token available.');
                        }
                    })
                    .catch(err => console.log('An error occurred while retrieving token.', err));
            }
        });

        onMessage(messaging, payload => {
            console.log('Foreground message:', payload);
            new Notification(payload.notification.title, {
                body: payload.notification.body,
                icon: '/images/logo SR.svg',
                // icon: '',
            });
        });
    }, []);
};

export default useFCMNotifications;
