import { type Lang, translate, LANG_NAMES } from '../i18n';
import { getMathematicians } from '../i18n';
import { Button } from '@toss/tds-mobile';
import type { GameMode, StartPos, Theme } from '../hooks/useSettings';

const MODE_OPTIONS: { value: GameMode; n: number }[] = [
  { value: 'multiple2', n: 2 }, { value: 'multiple3', n: 3 }, { value: 'multiple4', n: 4 },
  { value: 'multiple5', n: 5 }, { value: 'multiple6', n: 6 }, { value: 'multiple7', n: 7 },
  { value: 'multiple8', n: 8 }, { value: 'multiple9', n: 9 }, { value: 'multiple10', n: 10 },
];

interface Props {
  lang: Lang;
  startPos: StartPos;
  gameMode: GameMode;
  theme: Theme;
  userName: string;
  onClose: () => void;
  onLangChange: (v: Lang) => void;
  onStartPosChange: (v: StartPos) => void;
  onGameModeChange: (v: GameMode) => void;
  onThemeChange: (v: Theme) => void;
  onRandomName: () => void;
}

export function SettingsView({
  lang, startPos, gameMode, theme, userName, onClose,
  onLangChange, onStartPosChange, onGameModeChange, onThemeChange, onRandomName,
}: Props) {
  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);

  const maths = getMathematicians(lang);
  const mathDesc = maths.find(m => userName.endsWith(m.name))?.desc ?? null;

  return (
    <div className="modal-overlay show" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <h3>{t('settings_title')}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="setting-group">
          <div className="setting-label">{t('settings_username')}</div>
          <div className="setting-value">
            <span>
              {userName}
              {mathDesc && <sup className="footnote-star">*</sup>}
            </span>
            <Button color="dark" variant="weak" size="small" onClick={onRandomName}>
              {t('btn_random')}
            </Button>
          </div>
          {mathDesc && <div className="setting-user-desc">* {mathDesc}</div>}
        </div>

        <div className="setting-group">
          <div className="setting-label">{t('settings_startpos')}</div>
          <select
            className="setting-select"
            value={startPos}
            onChange={e => onStartPosChange(e.target.value as StartPos)}
          >
            <option value="decimal">{t('opt_decimal')}</option>
            <option value="intpart">{t('intpart_opt', { n: '3' })}</option>
          </select>
        </div>

        <div className="setting-group">
          <div className="setting-label">{t('settings_mode')}</div>
          <select
            className="setting-select"
            value={gameMode}
            onChange={e => onGameModeChange(e.target.value as GameMode)}
          >
            <option value="keypad">{t('mode_keypad')}</option>
            {MODE_OPTIONS.map(({ value, n }) => (
              <option key={value} value={value}>{t('mode_multiple', { n })}</option>
            ))}
          </select>
        </div>

        <div className="setting-group">
          <div className="setting-label">{t('settings_theme')}</div>
          <select
            className="setting-select"
            value={theme}
            onChange={e => onThemeChange(e.target.value as Theme)}
          >
            <option value="system">{t('theme_system')}</option>
            <option value="light">{t('theme_light')}</option>
            <option value="dark">{t('theme_dark')}</option>
          </select>
        </div>

        <div className="setting-group">
          <div className="setting-label">{t('settings_lang')}</div>
          <select
            className="setting-select"
            value={lang}
            onChange={e => onLangChange(e.target.value as Lang)}
          >
            {(Object.entries(LANG_NAMES) as [Lang, string][]).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
