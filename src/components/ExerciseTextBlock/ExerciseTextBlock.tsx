import React, {useCallback} from 'react';
import {useExerciseContext} from '../ExerciseContext/ExerciseContext';
import Letter, {LetterState} from '../Letter/Letter';

import * as styles from './exercise-text-block.scss';

interface ExerciseTextProps {
  userInputText: string;
}

interface LineMarker {
  start: number;
  end: number;
}

const ExerciseTextBlock: React.FC<ExerciseTextProps> = ({
  userInputText,
}: ExerciseTextProps) => {
  const {selectedExercise} = useExerciseContext();
  if (selectedExercise == null) {
    return null;
  }
  const text = selectedExercise.text.join('');
  const lineIndexes = selectedExercise.text.reduce<LineMarker[]>(
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
  );

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

  return (
    <div className={styles.text}>
      {lineIndexes.map(({start, end}) => (
        <div key={`line_${start}`} className={styles.line} data-testid="line">
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
  );
};

export default ExerciseTextBlock;
