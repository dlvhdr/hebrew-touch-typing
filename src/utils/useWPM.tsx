import {useCallback, useMemo, useRef, useState} from 'react';
import {getNumOfCorrectCharacters} from './exerciseUtils';
import {useInterval} from './useInterval';

const WPM_REFRESH_RATE_MS = 800;
const WORD_LENGTH = 5;
const MS_IN_SECONDS = 1000;
const SECONDS_IN_MINUTE = 60;

interface WPMHook {
  wpm: number;
  elapsedTimeSeconds: number;
  resetWPM: () => void;
  isFinished: boolean;
}

export const useWPM = (input: string, text: string): WPMHook => {
  const [wpm, setWPM] = useState(0);
  const startTimeRef = useRef<number | null>();
  const isFinished = useMemo(
    () => input.length === text.length,
    [input.length, text.length],
  );

  const resetWPM = useCallback(() => {
    startTimeRef.current = null;
  }, []);

  const getElapsedTime = (): number => {
    if (!startTimeRef.current) {
      return 0;
    }
    return (performance.now() - startTimeRef.current) / MS_IN_SECONDS;
  };

  const calculateWPM = useCallback(() => {
    if (input === text || (startTimeRef.current == null && input === '')) {
      return null;
    }
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }
    const elapsedTimeSeconds = getElapsedTime();
    if (!elapsedTimeSeconds) {
      return;
    }

    const numCorrectCharacters = getNumOfCorrectCharacters(input, text);
    const numCorrectWords = numCorrectCharacters / WORD_LENGTH;
    setWPM(numCorrectWords / (elapsedTimeSeconds / SECONDS_IN_MINUTE));
  }, [input, text]);

  useInterval(calculateWPM, isFinished ? null : WPM_REFRESH_RATE_MS);

  return {
    wpm,
    elapsedTimeSeconds: getElapsedTime(),
    resetWPM,
    isFinished,
  };
};
