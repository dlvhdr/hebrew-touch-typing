import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import {ExerciseProvider, useExerciseContext} from '../ExerciseContext';
import {
  ExerciseType,
  LettersExercise,
} from '../../../utils/generateLetterExercises';

const TestedComponent: React.FC<{fakeExercise?: LettersExercise}> = ({
  fakeExercise,
}): React.ReactElement => {
  const {selectedExercise, setSelectedExercise} = useExerciseContext();
  return (
    <div>
      <div>{JSON.stringify(selectedExercise)}</div>
      <button
        data-testid="click"
        onClick={() => fakeExercise && setSelectedExercise(fakeExercise)}
      />
    </div>
  );
};

describe('ExerciseContext', () => {
  it('should start without a selected exercise', async () => {
    render(
      <ExerciseProvider>
        <TestedComponent />
      </ExerciseProvider>,
    );

    expect(await screen.findByText('null')).toBeInTheDocument();
  });

  it('should allow selecting an exercise', async () => {
    const fakeExercise: LettersExercise = {
      newLetters: ['1', '2'],
      type: ExerciseType.REVIEW,
      text: ['111 222', '12121 121'],
      index: 0,
    };
    render(
      <ExerciseProvider>
        <TestedComponent fakeExercise={fakeExercise} />
      </ExerciseProvider>,
    );

    fireEvent.click(screen.getByTestId('click'));

    expect(
      await screen.findByText(JSON.stringify(fakeExercise)),
    ).toBeInTheDocument();
  });
});
