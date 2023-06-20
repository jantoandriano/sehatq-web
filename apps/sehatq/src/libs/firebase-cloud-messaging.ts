import { ENV } from "@sehatq/constants";

export async function getFCMToken(mustGrant?: boolean) {
  if (!("Notification" in window)) {
    return {
      data: null,
      error: "Browser tidak mendukung pengingat." as const,
    };
  } else if (Notification.permission === "granted") {
    return await retrieveFCMToken();
  } else if (Notification.permission !== (mustGrant ? "granted" : "denied")) {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        return await retrieveFCMToken();
      }
      return {
        data: null,
        error:
          "Terjadi kesalahan saat mengaktifkan pengingat. Pengingat tidak mendapatkan izin dari browser." as const,
      };
    } catch {
      return {
        data: null,
        error: "Terjadi kesalahan saat mengaktifkan pengingat." as const,
      };
    }
  }
}

export async function retrieveFCMToken() {
  let app;
  const { initializeApp, getApps } = await import("firebase/app");
  const { getMessaging, getToken } = await import("firebase/messaging");
  if (getApps().length === 0) {
    const clientCredentials = {
      apiKey: ENV.FIREBASE.API_KEY,
      authDomain: ENV.FIREBASE.AUTH_DOMAIN,
      databaseURL: ENV.FIREBASE.DATABASE_URL,
      projectId: ENV.FIREBASE.PROJECT_ID,
      storageBucket: ENV.FIREBASE.STORAGE_BUCKET,
      messagingSenderId: ENV.FIREBASE.MESSAGING_SENDER_ID,
      appId: ENV.FIREBASE.APP_ID,
      measurementId: ENV.FIREBASE.MEASUREMENT_ID,
    };
    app = initializeApp(clientCredentials);
  }
  const messaging = getMessaging(app);
  try {
    const fcmToken = await getToken(messaging, {
      vapidKey: ENV.FIREBASE.VAPID_KEY,
    });
    return {
      data: fcmToken,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: "Terjadi kesalahan saat mengaktifkan pengingat." as const,
    };
  }
}
