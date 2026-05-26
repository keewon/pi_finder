import { useState, useEffect, useCallback } from 'react';
import { partner, tdsEvent } from '@apps-in-toss/web-framework';
import { useSettings } from './hooks/useSettings';
import { useAd } from './hooks/useAd';
import { translate } from './i18n';
import { HomeView } from './views/HomeView';
import { MemorizeView } from './views/MemorizeView';
import { SearchView } from './views/SearchView';
import { RecordsView } from './views/RecordsView';
import { SettingsView } from './views/SettingsView';

type View = 'home' | 'memorize' | 'search' | 'records';

const API_URL = location.hostname === 'localhost' || location.protocol === 'file:'
  ? 'http://localhost:8787'
  : 'https://pi-finder-api.acidblob.com';

interface LocalRecord {
  id: number;
  name: string;
  digits: number;
  time: number;
  continues: number;
  mode: string;
  date: string;
  serverId: string | null;
}

function getLocalRecords(): LocalRecord[] {
  const raw = localStorage.getItem('piRecords');
  return raw ? JSON.parse(raw) : [];
}

function saveLocalRecord(rec: LocalRecord) {
  const records = getLocalRecords();
  records.push(rec);
  records.sort((a, b) => b.digits - a.digits || a.time - b.time);
  localStorage.setItem('piRecords', JSON.stringify(records));
}

function deleteLocalRecord(id: number) {
  const records = getLocalRecords();
  const rec = records.find(r => r.id === id);
  if (rec?.serverId) {
    const deviceUid = localStorage.getItem('deviceUid') || '';
    fetch(`${API_URL}/records/${rec.serverId}?uid=${encodeURIComponent(deviceUid)}`, { method: 'DELETE' }).catch(() => {});
  }
  localStorage.setItem('piRecords', JSON.stringify(records.filter(r => r.id !== id)));
}

export default function App() {
  const settings = useSettings();
  const { showAdThen } = useAd();
  const [view, setView] = useState<View>('home');
  const [showSettings, setShowSettings] = useState(false);
  const t = useCallback((key: string, vars?: Record<string, string | number>) => translate(settings.lang, key, vars), [settings.lang]);

  // Set up Toss nav bar
  useEffect(() => {
    partner.addAccessoryButton({
      id: 'settings',
      title: t('settings_title'),
      icon: { name: 'icon-setting-mono' },
    }).catch(() => {});

    const cleanup = tdsEvent.addEventListener('navigationAccessoryEvent', {
      onEvent: ({ id }) => {
        if (id === 'settings') setShowSettings(true);
      },
    });

    return () => {
      cleanup();
      partner.removeAccessoryButton().catch(() => {});
    };
  }, [t]);

  function goTo(v: View) {
    setView(v);
  }

  function saveRecord(name: string, digits: number, time: number, continues: number) {
    const localId = Date.now();
    const mode = settings.gameMode;
    const rec: LocalRecord = { id: localId, name, digits, time, continues, mode, date: new Date().toISOString(), serverId: null };
    saveLocalRecord(rec);

    fetch(`${API_URL}/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: settings.deviceUid, name, digits, time, continues, constKey: 'pi', mode }),
    })
      .then(res => res.ok ? res.json() : null)
      .then(result => {
        if (!result?.id) return;
        const records = getLocalRecords();
        const r = records.find(x => x.id === localId);
        if (r) { r.serverId = result.id; localStorage.setItem('piRecords', JSON.stringify(records)); }
      })
      .catch(() => {});
  }

  return (
    <div className="app">
      {view === 'home' && (
        <HomeView
          lang={settings.lang}
          userName={settings.userName}
          onMemorize={() => goTo('memorize')}
          onSearch={() => goTo('search')}
          onRecords={() => goTo('records')}
        />
      )}
      {view === 'memorize' && (
        <MemorizeView
          lang={settings.lang}
          gameMode={settings.gameMode}
          userName={settings.userName}
          onSaveRecord={saveRecord}
          onViewRecords={() => goTo('records')}
          onContinueWithAd={(cb) => showAdThen(cb)}
          onHome={() => goTo('home')}
        />
      )}
      {view === 'search' && (
        <SearchView lang={settings.lang} />
      )}
      {view === 'records' && (
        <RecordsView
          lang={settings.lang}
          deviceUid={settings.deviceUid}
          getLocalRecords={getLocalRecords}
          deleteLocalRecord={deleteLocalRecord}
          onDelete={() => {}}
        />
      )}

      {showSettings && (
        <SettingsView
          lang={settings.lang}
          startPos={settings.startPos}
          gameMode={settings.gameMode}
          theme={settings.theme}
          userName={settings.userName}
          onClose={() => setShowSettings(false)}
          onLangChange={settings.setLang}
          onStartPosChange={settings.setStartPos}
          onGameModeChange={settings.setGameMode}
          onThemeChange={settings.setTheme}
          onRandomName={settings.randomizeName}
        />
      )}
    </div>
  );
}
