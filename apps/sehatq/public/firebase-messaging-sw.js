/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js"
);

self.onnotificationclick = (event) => {
  event.notification.close();

  if (event.notification?.data?.FCM_MSG?.data?.id) {
    const doctorId = event.notification.data.FCM_MSG.data.id;
    const url = `/telemed/dokter/${doctorId}`;
    event.waitUntil(
      self.clients.matchAll({ type: "window" }).then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];
          // If so, just focus it.
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        // If not, then open the target URL in a new window/tab.
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
    );
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyBR47LJTQK818bgGsTa7QoHi4MQ_y6mwys",
  authDomain: "sehatq-revamp.firebaseapp.com",
  databaseURL: "https://sehatq-revamp.firebaseio.com",
  projectId: "sehatq-revamp",
  storageBucket: "sehatq-revamp.appspot.com",
  messagingSenderId: "662016403610",
  appId: "1:662016403610:web:2a30ae7f8ddb4a4ac99723",
  measurementId: "G-48Q0791L3G",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(messaging, (payload) => {
  if (!payload && !payload.data) {
    return;
  }

  const notificationTitle = payload.data.title || "Notif";
  const notificationOptions = {
    body: payload.data.body || "Body Notification",
    icon: payload.data.icon || "/favicon.ico",
    badge: payload.data.badge || "/favicon.ico",
    tag: payload.data.tag || "main",
    sound: payload.data.sound || "default",
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
