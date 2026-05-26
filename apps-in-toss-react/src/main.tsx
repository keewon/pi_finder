import React from 'react';
import ReactDOM from 'react-dom/client';
import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';
import App from './App';
import './index.css';

// Polyfill Toss native bridge for browser (non-WebView) environment
declare global {
  interface Window {
    __CONSTANT_HANDLER_MAP?: Record<string, unknown>;
    __GRANITE_NATIVE_EMITTER?: { on: (event: string, handler: unknown) => () => void };
    ReactNativeWebView?: { postMessage: (msg: string) => void };
  }
}
if (!window.ReactNativeWebView) {
  window.ReactNativeWebView = { postMessage: () => {} };
}
if (!window.__GRANITE_NATIVE_EMITTER) {
  window.__GRANITE_NATIVE_EMITTER = { on: () => () => {} };
}
if (!window.__CONSTANT_HANDLER_MAP) window.__CONSTANT_HANDLER_MAP = {};
const cm = window.__CONSTANT_HANDLER_MAP;
if (!cm['getSafeAreaInsets']) cm['getSafeAreaInsets'] = { top: 0, right: 0, bottom: 0, left: 0 };
if (!cm['getStatusBarHeight']) cm['getStatusBarHeight'] = 0;
if (!cm['getBottomBarHeight']) cm['getBottomBarHeight'] = 0;
if (!cm['loadFullScreenAd_isSupported']) cm['loadFullScreenAd_isSupported'] = false;
if (!cm['showFullScreenAd_isSupported']) cm['showFullScreenAd_isSupported'] = false;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TDSMobileAITProvider>
      <App />
    </TDSMobileAITProvider>
  </React.StrictMode>
);
