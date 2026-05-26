import { useRef, useEffect } from 'react';
import { Button } from '@toss/tds-mobile';
import { type Lang, translate } from '../i18n';
import { useGame, type ChoiceState } from '../hooks/useGame';
import type { GameMode } from '../hooks/useSettings';

const CHAR_IMAGES: Record<string, string[]> = {
  success: ['02_congrat.png', '11_heart.png', '15_surprise.png', '18_okay.png', '21_exciting.png'],
  failure: ['03_tears.png', '04_no_battery.png', '08_volcano.png', '16_dizzy.png', '23_annoying.png', '25_depressed.png', '28_cheer_up.png'],
};

function randomImage(cat: string): string {
  const list = CHAR_IMAGES[cat] || CHAR_IMAGES.failure;
  return `images/${cat}/${list[Math.floor(Math.random() * list.length)]}`;
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

interface Props {
  lang: Lang;
  gameMode: GameMode;
  userName: string;
  onSaveRecord: (name: string, digits: number, time: number, continues: number) => void;
  onViewRecords: () => void;
  onContinueWithAd: (callback: () => void) => void;
  onHome: () => void;
}

export function MemorizeView({ lang, gameMode, userName, onSaveRecord, onViewRecords, onContinueWithAd, onHome }: Props) {
  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
  const game = useGame(gameMode);
  const displayRef = useRef<HTMLDivElement>(null);
  const recordNameRef = useRef<HTMLInputElement>(null);
  const savedRef = useRef(false);

  const isKeypad = gameMode === 'keypad';
  const digitsPerQ = isKeypad ? 1 : parseInt(gameMode.replace('multiple', ''));

  useEffect(() => {
    savedRef.current = false;
  }, [game.phase === 'playing']);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollTop = displayRef.current.scrollHeight;
    }
  }, [game.piDisplay]);

  function handleSave() {
    if (savedRef.current) return;
    const name = recordNameRef.current?.value.trim() || userName;
    onSaveRecord(name, game.position, game.lastElapsed, game.continueCount);
    savedRef.current = true;
    if (recordNameRef.current) {
      recordNameRef.current.readOnly = true;
    }
  }

  function handleContinue() {
    onContinueWithAd(() => game.continueGame());
  }

  const progressPct = Math.min(100, (game.position / 1000) * 100);

  if (game.phase === 'gameover') {
    const isSuccess = game.position >= 1000;
    const scoreHtml = t('gameover_score', { n: game.position, t: formatTime(game.lastElapsed) });
    return (
      <div className="view active memorize-view">
        <div className="gameover-panel show">
          <div className="gameover-score">
            {isSuccess && (
              <img src={randomImage('success')} alt="" />
            )}
            {game.wrongFeedback && !isSuccess && (
              <img src={randomImage('failure')} alt="" />
            )}
            <div dangerouslySetInnerHTML={{ __html: scoreHtml }} />
          </div>
          <div className="gameover-actions">
            <Button color="primary" variant="fill" display="full" size="xlarge" onClick={game.retry}>
              {t('gameover_retry')}
            </Button>
            <Button color="primary" variant="weak" display="full" size="xlarge" onClick={handleContinue}>
              {t('gameover_continue')}
            </Button>
            <Button color="primary" variant="weak" display="full" size="large" onClick={onHome}>
              {t('btn_home')}
            </Button>
          </div>
          <div className="gameover-save">
            <input
              ref={recordNameRef}
              type="text"
              className="record-name-input"
              defaultValue={userName}
              placeholder={t('name_placeholder')}
            />
            <Button color="primary" variant="weak" size="medium" onClick={handleSave}>
              {t('save_record')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="view active memorize-view">
      <div className="progress-section">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="stats">
          <span>{game.position}<span className="stats-of">{t('stats_of_1000')}</span></span>
          <span>{formatTime(game.elapsed)}</span>
        </div>
      </div>

      <div className="digits-display" ref={displayRef}>
        {game.piDisplay}
      </div>

      {!isKeypad && (
        <>
          <div className="question-text">{t('question', { n: digitsPerQ })}</div>
          {game.wrongFeedback && (
            <div className="result-msg show wrong">
              <img src={randomImage('failure')} alt="" />
              <div>{t('wrong_msg', { ans: game.wrongFeedback.answer })}</div>
            </div>
          )}
          <div className="choices-grid">
            {game.choices.map(choice => (
              <button
                key={choice}
                className={`choice ${game.choiceStates[choice] || 'idle'}`}
                onClick={() => game.answerChoice(choice)}
                disabled={game.phase !== 'playing'}
              >
                {choice}
              </button>
            ))}
          </div>
        </>
      )}

      {isKeypad && (
        <>
          {game.wrongFeedback && (
            <div className="result-msg show wrong">
              <img src={randomImage('failure')} alt="" />
              <div>{t('wrong_msg', { ans: game.wrongFeedback.answer })}</div>
            </div>
          )}
          <div className="keypad-grid">
            {['1','2','3','4','5','6','7','8','9'].map(d => (
              <button key={d} className="keypad-key" onClick={() => game.answerKeypad(d)}>{d}</button>
            ))}
            <button className="keypad-key delete" onClick={game.deleteKeypad}>⌫</button>
            <button className="keypad-key" onClick={() => game.answerKeypad('0')}>0</button>
          </div>
        </>
      )}
    </div>
  );
}
