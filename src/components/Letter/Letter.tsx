import classNames from 'classnames';
import React, {useMemo} from 'react';

import * as styles from './letter.scss';

export enum LetterState {
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  NOT_REACHED = 'not-reached',
  CURRENT_LETTER = 'current-letter',
}

interface LetterProps {
  letter: string;
  state: LetterState;
}

const Letter: React.FC<LetterProps> = ({letter, state}: LetterProps) => {
  const activeClassName = useMemo(() => {
    switch (state) {
      case LetterState.CURRENT_LETTER:
        return 'current-letter';
      case LetterState.CORRECT:
        return 'correct-letter';
      case LetterState.INCORRECT:
        return 'incorrect-letter';
      default:
        return undefined;
    }
  }, [state]);
  return (
    <span
      data-testid="letter"
      className={classNames(
        styles.letter,
        activeClassName && styles[activeClassName],
      )}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </span>
  );
};

export default Letter;
