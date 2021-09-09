import React, { useMemo } from 'react';
import { Exercise } from './HebrewTouchTyping';
import Letter from './Letter';

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

  return (
    <div>
      <div className="text">
        {lineIndexes.map(({ start, end }) => (
          <div key={`line_${start}`} className="line" data-testid="line">
            {Array.from(text).slice(start, end).map((letter, i) => {
              const absoluteIndex = i + start;
              return (
                <Letter
                  key={absoluteIndex}
                  letter={letter}
                  state={
                    absoluteIndex >= userInputText.length
                      ? 'not-reached'
                      : userInputText[absoluteIndex] === letter
                      ? 'correct'
                      : 'incorrect'
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseText;
