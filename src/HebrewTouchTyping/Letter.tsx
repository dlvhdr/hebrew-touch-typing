import classNames from 'classnames';
import React from 'react';

interface LetterProps {
  letter: string;
  state: 'correct' | 'incorrect' | 'not-reached';
}

const Letter: React.FC<LetterProps> = ({ letter, state }: LetterProps) => {
  return (
    <span
      data-testid="letter"
      className={classNames(
        'letter',
        state === 'not-reached'
          ? undefined
          : state === 'correct'
          ? 'correct-letter'
          : 'incorrect-letter'
      )}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </span>
  );
};

export default Letter;
