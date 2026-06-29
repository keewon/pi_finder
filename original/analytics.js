import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js';
import { getAnalytics, logEvent, setUserProperties } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js';

const config = {
  apiKey:            "AIzaSyBejoPv2KVYM8fzGpWwHfPgkm2zs9EgCBo",
  authDomain:        "pi-finder-566a5.firebaseapp.com",
  projectId:         "pi-finder-566a5",
  storageBucket:     "pi-finder-566a5.firebasestorage.app",
  messagingSenderId: "853342983644",
  appId:             "1:853342983644:web:4032568b7e3fc51901ab19",
  measurementId:     "G-QGRB0CWDCV",
};

let analytics = null;
try {
  const app = initializeApp(config);
  analytics = getAnalytics(app);
  setUserProperties(analytics, { app_source: 'original' });
} catch {}

window.logAnalyticsEvent = function (event, params) {
  if (!analytics) return;
  logEvent(analytics, event, params);
};
