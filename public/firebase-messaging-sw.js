importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

try {
    console.log('[Service Worker] Initializing Firebase...');

    firebase.initializeApp({
        apiKey: 'AIzaSyCQ3I9WBXcgXiGTPe57TJm7P3V09TGth6o',
        authDomain: 'soulreads-eta.vercel.app',
        projectId: 'soulreads-d5049',
        storageBucket: 'soulreads-d5049.firebasestorage.app',
        messagingSenderId: '814495369647',
        appId: '1:814495369647:web:621cd6aaceb559a770875a',
    });

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
        console.log('[Service Worker] Received background message:', payload);

        if (payload && payload.notification) {
            const { title, body, icon } = payload.notification;

            self.registration.showNotification(title || 'Notification', {
                body: body || '',
                icon: icon || '/images/logo SR.svg',
            });
        } else {
            console.warn('[Service Worker] Payload missing notification object:', payload);
        }
    });

    console.log('[Service Worker] Firebase Messaging initialized successfully.');
} catch (err) {
    console.error('[Service Worker] Error initializing Firebase Messaging:', err);
}
