import { useRef, useEffect, useCallback } from 'react';
import { loadFullScreenAd, showFullScreenAd } from '@apps-in-toss/web-framework';

const AD_GROUP_ID = 'ait.dev.43daa14da3ae487b';

export function useAd() {
  const isAdLoaded = useRef(false);

  const loadAd = useCallback(() => {
    if (!loadFullScreenAd.isSupported()) return;
    loadFullScreenAd({
      options: { adGroupId: AD_GROUP_ID },
      onEvent: (event) => {
        if (event.type === 'loaded') isAdLoaded.current = true;
      },
      onError: () => {},
    });
  }, []);

  useEffect(() => { loadAd(); }, [loadAd]);

  const showAdThen = useCallback((callback: () => void) => {
    if (isAdLoaded.current && showFullScreenAd.isSupported()) {
      isAdLoaded.current = false;
      showFullScreenAd({
        options: { adGroupId: AD_GROUP_ID },
        onEvent: (event) => {
          if (event.type === 'dismissed' || event.type === 'failedToShow') {
            callback();
            loadAd();
          }
        },
        onError: () => { callback(); },
      });
    } else {
      callback();
    }
  }, [loadAd]);

  return { showAdThen };
}
