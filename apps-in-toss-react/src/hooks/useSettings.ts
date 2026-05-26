import { useState, useEffect } from 'react';
import { type Lang, detectLang, getAdjectives, getMathematicians } from '../i18n';

export type { Lang };
export type GameMode = 'keypad' | 'multiple2' | 'multiple3' | 'multiple4' | 'multiple5' | 'multiple6' | 'multiple7' | 'multiple8' | 'multiple9' | 'multiple10';
export type StartPos = 'decimal' | 'intpart';
export type Theme = 'system' | 'light' | 'dark';

function ls(key: string): string | null { return localStorage.getItem(key); }
function lsSet(key: string, v: string): void { localStorage.setItem(key, v); }

function generateRandomName(lang: Lang): string {
  const adjs = getAdjectives(lang);
  const maths = getMathematicians(lang);
  const adj = adjs[Math.floor(Math.random() * adjs.length)];
  const m = maths[Math.floor(Math.random() * maths.length)];
  const capAdj = adj.charAt(0).toUpperCase() + adj.slice(1);
  return `${capAdj} ${m.name}`;
}

function getOrInitUserName(lang: Lang): string {
  const saved = ls('piUserName');
  if (saved) return saved;
  const name = generateRandomName(lang);
  lsSet('piUserName', name);
  return name;
}

function getOrInitDeviceUid(): string {
  const uid = ls('deviceUid');
  if (uid) return uid;
  const newUid = crypto.randomUUID();
  lsSet('deviceUid', newUid);
  return newUid;
}

export function useSettings() {
  const [lang, setLangState] = useState<Lang>(() => detectLang());
  const [startPos, setStartPosState] = useState<StartPos>(
    () => (ls('piStartOption') as StartPos) || 'decimal'
  );
  const [gameMode, setGameModeState] = useState<GameMode>(
    () => (ls('piModeOption') as GameMode) || 'multiple4'
  );
  const [theme, setThemeState] = useState<Theme>(
    () => (ls('piThemeOption') as Theme) || 'light'
  );
  const [userName, setUserNameState] = useState<string>(() => getOrInitUserName(detectLang()));
  const [deviceUid] = useState<string>(() => getOrInitDeviceUid());

  function setLang(v: Lang) { lsSet('piLang', v); setLangState(v); }
  function setStartPos(v: StartPos) { lsSet('piStartOption', v); setStartPosState(v); }
  function setGameMode(v: GameMode) { lsSet('piModeOption', v); setGameModeState(v); }
  function setTheme(v: Theme) { lsSet('piThemeOption', v); setThemeState(v); }
  function setUserName(v: string) { lsSet('piUserName', v); setUserNameState(v); }
  function randomizeName() { setUserName(generateRandomName(lang)); }

  useEffect(() => {
    function apply() {
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.dataset.theme =
        theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : (dark ? 'dark' : 'light');
    }
    apply();
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);

  return { lang, setLang, startPos, setStartPos, gameMode, setGameMode, theme, setTheme, userName, setUserName, randomizeName, deviceUid };
}
