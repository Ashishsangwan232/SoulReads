import { initializeApp } from 'firebase/app';
import { getMessaging, getToken as fcmGetToken, onMessage as fcmOnMessage, isSupported } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain:import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);

// getMessaging() throws in browsers/contexts that don't support FCM (Safari,
// insecure/non-HTTPS origins, some in-app webviews). Previously this ran
// unconditionally at module-import time, which could crash the entire app
// before it even mounted in those environments.
let messaging = null;
isSupported()
    .then((supported) => {
        if (supported) {
            messaging = getMessaging(app);
        } else {
            console.warn('Firebase Cloud Messaging is not supported in this browser.');
        }
    })
    .catch((err) => console.warn('FCM support check failed:', err));

// Thin wrappers so callers don't need to know `messaging` might not be ready yet.
// Callers still pass `messaging` positionally (for API-shape compatibility with
// firebase/messaging) but it's ignored in favor of the internally-tracked instance,
// since it may not have been ready yet when the caller imported it.
export const getToken = (_messagingArg, options) => {
    if (!messaging) return Promise.resolve(null);
    return fcmGetToken(messaging, options);
};

export const onMessage = (_messagingArg, callback) => {
    if (!messaging) return () => {};
    return fcmOnMessage(messaging, callback);
};

export { messaging };