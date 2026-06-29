import './analytics.js';
import { partner, tdsEvent, graniteEvent, closeView } from '@apps-in-toss/web-framework';

// import는 항상 먼저 평가되지만, SDK는 __CONSTANT_HANDLER_MAP을 직접 생성하지 않으므로
// 이 시점에서 체크하면 토스 앱 환경 여부를 정확히 감지할 수 있다
const isInToss = !!window.__CONSTANT_HANDLER_MAP;
if (isInToss) document.documentElement.classList.add('in-toss');

// Browser polyfills for Toss native bridge
if (!window.ReactNativeWebView) window.ReactNativeWebView = { postMessage: () => {} };
if (!window.__GRANITE_NATIVE_EMITTER) window.__GRANITE_NATIVE_EMITTER = { on: () => () => {} };
if (!window.__CONSTANT_HANDLER_MAP) window.__CONSTANT_HANDLER_MAP = {};
const cm = window.__CONSTANT_HANDLER_MAP;
if (!cm['getSafeAreaInsets'])            cm['getSafeAreaInsets']            = { top: 0, right: 0, bottom: 0, left: 0 };
if (!cm['getStatusBarHeight'])           cm['getStatusBarHeight']           = 0;
if (!cm['getBottomBarHeight'])           cm['getBottomBarHeight']           = 0;
if (!cm['loadFullScreenAd_isSupported']) cm['loadFullScreenAd_isSupported'] = false;
if (!cm['showFullScreenAd_isSupported']) cm['showFullScreenAd_isSupported'] = false;

// 토스 앱에서만 네이티브 네비게이션 설정 버튼 등록
if (isInToss) {
  partner.addAccessoryButton({
    id: 'settings',
    title: '설정',
    icon: { name: 'icon-setting-mono' },
  }).catch(() => {});

  tdsEvent.addEventListener('navigationAccessoryEvent', {
    onEvent: ({ id }) => {
      if (id === 'settings' && typeof window.openSettings === 'function') {
        window.openSettings();
      }
    },
  });

}

// Home button event — always navigates to home screen
graniteEvent.addEventListener('homeEvent', {
  onEvent: () => {
    if (typeof window.switchView === 'function') window.switchView('home');
  },
  onError: () => {},
});

// Back event management — called from app.js switchView()
let _backUnsub = null;
window.registerBackEvent = function(handler) {
  if (_backUnsub) _backUnsub();
  _backUnsub = graniteEvent.addEventListener('backEvent', {
    onEvent: handler,
    onError: () => {},
  });
};
window.registerCloseBackEvent = function() {
  window.registerBackEvent(() => closeView().catch(() => {}));
};
