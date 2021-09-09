import React, { useCallback, useMemo } from 'react';
import { Exercise } from './HebrewTouchTyping';
import Letter, { LetterState } from './Letter';

interface ExerciseTextProps {
  exercise: Exercise;
  userInputText: string;
}

const ExerciseText: React.FC<ExerciseTextProps> = ({
  exercise,
  userInputText,
}: ExerciseTextProps) => {
  const { lines, text } = exercise;
  const lineIndexes = useMemo(
    () => [
      ...lines.map((line, lineIndex) => {
        return {
          start: lineIndex === 0 ? 0 : lines[lineIndex - 1],
          end: line,
        };
      }),
      {
        start: lines[lines.length - 1],
        end: text.length,
      },
    ],
    [lines, text]
  );

  const getLetterState = useCallback((letter: string, absoluteIndex: number): LetterState => {
   if (absoluteIndex === userInputText.length) {
     return LetterState.CURRENT_LETTER;
   }
   if (absoluteIndex > userInputText.length) {
     return LetterState.NOT_REACHED;
   }

   return userInputText[absoluteIndex] === letter
      ? LetterState.CORRECT
      : LetterState.INCORRECT;
  }, [userInputText]);

  return (
      <div className="text">
        {lineIndexes.map(({ start, end }) => (
          <div key={`line_${start}`} className="line" data-testid="line">
            {Array.from(text).slice(start, end).map((letter, i) => {
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

export default ExerciseText;
