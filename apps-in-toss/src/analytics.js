import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setUserProperties } from 'firebase/analytics';

const config = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let analytics = null;

if (config.apiKey && config.measurementId) {
  try {
    const app = initializeApp(config);
    analytics = getAnalytics(app);
    // window.__CONSTANT_HANDLER_MAP is set by the Toss native bridge before any JS runs,
    // so checking it here (before main.js polyfills it) reliably detects the real Toss environment.
    setUserProperties(analytics, {
      app_source: 'apps_in_toss',
      in_toss_app: window.__CONSTANT_HANDLER_MAP ? 'true' : 'false',
    });
  } catch {}
}

window.logAnalyticsEvent = function (event, params) {
  if (!analytics) return;
  logEvent(analytics, event, params);
};
