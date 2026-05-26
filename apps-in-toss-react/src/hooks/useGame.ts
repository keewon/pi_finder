import { useState, useRef, useEffect, useCallback } from 'react';
import { PI_DIGITS } from '../data/piDigits';
import type { GameMode } from './useSettings';

const PI_1000 = PI_DIGITS.substring(0, 1002); // "3." + 1000 decimal digits

function digitsPerQ(mode: GameMode): number {
  return mode === 'keypad' ? 1 : parseInt(mode.replace('multiple', ''));
}

function makeChoices(answer: string, n: number): string[] {
  const list = [answer];
  while (list.length < 4) {
    let wrong = '';
    for (let i = 0; i < n; i++) wrong += Math.floor(Math.random() * 10);
    if (!list.includes(wrong)) list.push(wrong);
  }
  return list.sort(() => Math.random() - 0.5);
}

export type ChoiceState = 'idle' | 'correct' | 'wrong' | 'disabled';
export type GamePhase = 'playing' | 'animating' | 'gameover';

export interface WrongFeedback { answer: string }

export function useGame(gameMode: GameMode) {
  const [phase, setPhase] = useState<GamePhase>('playing');
  const [position, setPosition] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [continueCount, setContinueCount] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [choiceStates, setChoiceStates] = useState<Record<string, ChoiceState>>({});
  const [wrongFeedback, setWrongFeedback] = useState<WrongFeedback | null>(null);

  const posRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const lastElapsedRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gameModeRef = useRef(gameMode);
  gameModeRef.current = gameMode;

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback((fromSecs: number) => {
    stopTimer();
    startTimeRef.current = Date.now() - fromSecs * 1000;
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 200);
  }, [stopTimer]);

  const genQuestion = useCallback((pos: number, mode: GameMode) => {
    const n = digitsPerQ(mode);
    const answer = PI_1000.substring(2 + pos, 2 + pos + n);
    const newChoices = makeChoices(answer, n);
    setChoices(newChoices);
    setCorrectAnswer(answer);
    setChoiceStates(Object.fromEntries(newChoices.map(c => [c, 'idle' as ChoiceState])));
  }, []);

  const doEndGame = useCallback(() => {
    stopTimer();
    lastElapsedRef.current = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setElapsed(lastElapsedRef.current);
    setPhase('gameover');
  }, [stopTimer]);

  const init = useCallback((fromPos: number, fromSecs: number, fromContinues: number) => {
    stopTimer();
    posRef.current = fromPos;
    setPosition(fromPos);
    setElapsed(fromSecs);
    setContinueCount(fromContinues);
    setWrongFeedback(null);
    setChoices([]);
    setCorrectAnswer('');
    setChoiceStates({});
    setPhase('playing');
    startTimer(fromSecs);
    const mode = gameModeRef.current;
    if (mode !== 'keypad') genQuestion(fromPos, mode);
  }, [stopTimer, startTimer, genQuestion]);

  const startNew = useCallback(() => init(0, 0, 0), [init]);

  const answerChoice = useCallback((selected: string) => {
    const correct = correctAnswer;
    const pos = posRef.current;
    const mode = gameModeRef.current;
    const n = digitsPerQ(mode);

    setChoiceStates(prev => {
      const next = { ...prev };
      for (const c in next) {
        next[c] = c === correct ? 'correct' : (c === selected && selected !== correct ? 'wrong' : 'disabled');
      }
      return next;
    });

    if (selected === correct) {
      const newPos = pos + n;
      posRef.current = newPos;
      setPosition(newPos);
      if (newPos >= 1000) {
        setPhase('animating');
        setTimeout(doEndGame, 300);
      } else {
        setTimeout(() => genQuestion(newPos, mode), 220);
      }
    } else {
      setWrongFeedback({ answer: correct });
      setPhase('animating');
      setTimeout(doEndGame, 700);
    }
  }, [correctAnswer, genQuestion, doEndGame]);

  const answerKeypad = useCallback((digit: string) => {
    const pos = posRef.current;
    if (pos >= 1000) { doEndGame(); return; }
    const expected = PI_1000[2 + pos];
    if (digit === expected) {
      const newPos = pos + 1;
      posRef.current = newPos;
      setPosition(newPos);
      if (newPos >= 1000) doEndGame();
    } else {
      setWrongFeedback({ answer: expected });
      doEndGame();
    }
  }, [doEndGame]);

  const deleteKeypad = useCallback(() => {
    const pos = posRef.current;
    if (pos > 0) {
      const newPos = pos - 1;
      posRef.current = newPos;
      setPosition(newPos);
    }
  }, []);

  const retry = useCallback(() => startNew(), [startNew]);

  const continueGame = useCallback(() => {
    const pos = posRef.current;
    const prevContinues = continueCount;
    init(pos, lastElapsedRef.current, prevContinues + 1);
  }, [continueCount, init]);

  useEffect(() => {
    startNew();
    return () => stopTimer();
  }, []);

  useEffect(() => {
    if (phase === 'playing' && gameMode !== 'keypad') {
      const pos = posRef.current;
      genQuestion(pos, gameMode);
    }
  }, [gameMode]);

  const piDisplay = PI_1000.substring(0, 2 + position);
  const intPartDisplay = '3.';

  return {
    phase, position, elapsed, continueCount,
    lastElapsed: lastElapsedRef.current,
    choices, correctAnswer, choiceStates, wrongFeedback,
    piDisplay, intPartDisplay, PI_1000,
    answerChoice, answerKeypad, deleteKeypad,
    retry, continueGame,
  };
}
