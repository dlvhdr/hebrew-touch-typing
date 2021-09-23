import React from 'react';
import {render, screen} from '@testing-library/react';
import {StoredExerciseData, useUserData} from '../useUserData';
import userEvent from '@testing-library/user-event';

interface LocalStorageTesterProps {
  exerciseToPersist?: StoredExerciseData;
}

const LocalStorageTester = ({exerciseToPersist}: LocalStorageTesterProps) => {
  const {userData, persistExerciseIfNewRecord: persist} = useUserData();
  return (
    <>
      <div data-testid="container">{JSON.stringify(userData)}</div>
      <button onClick={() => exerciseToPersist && persist(exerciseToPersist)}>
        Persist
      </button>
    </>
  );
};

describe('useLocalStorage', () => {
  it('should start of blank', () => {
    render(<LocalStorageTester />);
    expect(screen.getByTestId('container')).toHaveTextContent(
      JSON.stringify({}),
    );
  });

  it('should allow persisting exercises', () => {
    render(<LocalStorageTester />);
    expect(screen.getByTestId('container')).toHaveTextContent(
      JSON.stringify({}),
    );
  });

  it('should allow saving to local storage', () => {
    const dataToPersist = {
      exerciseIndex: 0,
      wpmRecord: 50,
    };
    render(<LocalStorageTester exerciseToPersist={dataToPersist} />);

    userEvent.click(screen.getByRole('button', {name: /persist/i}));

    expect(localStorage.getItem('exercises')).toBe(
      JSON.stringify({
        0: dataToPersist,
      }),
    );
  });

  it('should allow fetching from local storage', async () => {
    const dataToPersist = {
      exerciseIndex: 0,
      wpmRecord: 50,
    };
    render(<LocalStorageTester exerciseToPersist={dataToPersist} />);
    userEvent.click(screen.getByRole('button', {name: /persist/i}));

    expect(await screen.findByTestId('container')).toHaveTextContent(
      JSON.stringify({
        0: dataToPersist,
      }),
    );
  });
});
