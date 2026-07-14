import { useEffect, useContext } from 'react';
import { saveFcmToken } from './firebaseaxios';
import { AuthContext } from '../context/AuthContext';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

const useFCMNotifications = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.id) return;

        // Guard against browsers/contexts without the Notification API at all
        // (some in-app webviews, older browsers) -- calling requestPermission()
        // there would throw and was previously uncaught.
        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications.');
            return;
        }

        let unsubscribe;
        let cancelled = false;

        // The Firebase SDK is sizeable and previously loaded eagerly on every
        // page for every visitor (even logged-out ones) via a static import at
        // the top of this file. It's now only fetched once we know we actually
        // have a logged-in user to request notification permission for.
        import('./firebase').then(({ messaging, getToken, onMessage }) => {
            if (cancelled) return;

            const requestAndSaveToken = () => {
                getToken(messaging, { vapidKey: VAPID_KEY })
                    .then(currentToken => {
                        if (currentToken) {
                            saveFcmToken(currentToken);
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

            unsubscribe = onMessage(messaging, payload => {
                console.log('📢 Foreground message:', payload);
                new Notification(payload.notification.title, {
                    body: payload.notification.body,
                    icon: '/images/logo SR.svg',
                });
            });
        });

        return () => {
            cancelled = true;
            unsubscribe?.();
        };
    }, [user?.id]);
};

export default useFCMNotifications;
