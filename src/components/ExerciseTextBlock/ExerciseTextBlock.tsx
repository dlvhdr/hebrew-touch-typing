import classNames from 'classnames';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useExerciseContext} from '../ExerciseContext/ExerciseContext';
import Letter, {LetterState} from '../Letter/Letter';

import * as styles from './exercise-text-block.scss';

interface ExerciseTextProps {
  userInputText: string;
  className?: string;
}

interface LineMarker {
  start: number;
  end: number;
}

const ExerciseTextBlock: React.FC<ExerciseTextProps> = ({
  userInputText,
  className,
}: ExerciseTextProps) => {
  const {selectedExercise} = useExerciseContext();
  const text = selectedExercise?.text.join('') ?? '';
  const refs = useRef<Element[]>([]);

  const lineMarkers = useMemo(
    () =>
      selectedExercise?.text.reduce<LineMarker[]>(
        (soFar: LineMarker[], line: string) => {
          const start = soFar.length === 0 ? 0 : soFar[soFar.length - 1].end;
          return [
            ...soFar,
            {
              start,
              end: start + line.length,
            },
          ];
        },
        [],
      ),
    [selectedExercise?.text],
  );

  useEffect(() => {
    const userInputIndex = userInputText.length;
    const currentLineIndex = lineMarkers?.findIndex(
      lineMarker =>
        lineMarker.start <= userInputIndex && userInputIndex < lineMarker.end,
    );
    if (currentLineIndex == null || currentLineIndex < 0) {
      return;
    }

    refs.current[currentLineIndex + 1]?.scrollIntoView({
      block: 'end',
    });
  }, [lineMarkers, userInputText.length]);

  const getLetterState = useCallback(
    (letter: string, absoluteIndex: number): LetterState => {
      if (absoluteIndex === userInputText.length) {
        return LetterState.CURRENT_LETTER;
      }
      if (absoluteIndex > userInputText.length) {
        return LetterState.NOT_REACHED;
      }

      return userInputText[absoluteIndex] === letter
        ? LetterState.CORRECT
        : LetterState.INCORRECT;
    },
    [userInputText],
  );

  if (selectedExercise == null) {
    return null;
  }

  return (
    <>
      <div className={classNames(styles.text, className)}>
        {lineMarkers?.map(({start, end}, lineIndex) => (
          <div
            key={`line_${start}`}
            className={styles.line}
            data-testid="line"
            ref={el => {
              if (el == null) {
                return;
              }
              refs.current[lineIndex] = el;
            }}
          >
            {Array.from(text)
              .slice(start, end)
              .map((letter, i) => {
                const absoluteIndex = i + start;
                return (
                  <Letter
                    key={absoluteIndex}
                    letter={letter}
                    state={getLetterState(letter, absoluteIndex)}
                  />
                );
              })}
          </div>
        ))}
      </div>
      <div className={styles.divider} />
    </>
  );
};

export default ExerciseTextBlock;
