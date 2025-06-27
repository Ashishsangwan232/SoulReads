importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: 'AIzaSyCQ3I9WBXcgXiGTPe57TJm7P3V09TGth6o',
    authDomain:'soulreads-eta.vercel.app',
    projectId:'soulreads-d5049',
    storageBucket: 'soulreads-d5049.firebasestorage.app',
    messagingSenderId:'814495369647',
    appId:'1:814495369647:web:621cd6aaceb559a770875a',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Background message:', payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/images/logo SR.svg',
    });
});
