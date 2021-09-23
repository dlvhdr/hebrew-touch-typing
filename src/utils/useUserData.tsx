import {useCallback, useMemo} from 'react';
import {useStickyState} from './useStickyState';

const EXERCISES_KEY = 'exercises';

export interface UserData {
  exercises: {
    [exerciseIndex: number]: StoredExerciseData | undefined;
  };
}

export interface StoredExerciseData {
  exerciseIndex: number;
  wpmRecord: number;
}

export interface UseUserData {
  userData: UserData;
  persistExerciseIfNewRecord: (storedExerciseData: StoredExerciseData) => void;
}

export const useUserData = (): UseUserData => {
  const [storedExercises, setStoredExercises] = useStickyState<
    UserData['exercises']
  >({}, EXERCISES_KEY);

  const persistExerciseIfNewRecord = useCallback(
    (exerciseToPersist: StoredExerciseData) => {
      if (
        (storedExercises[exerciseToPersist.exerciseIndex]?.wpmRecord ?? 0) >
        exerciseToPersist.wpmRecord
      ) {
        return;
      }

      setStoredExercises({
        ...storedExercises,
        [exerciseToPersist.exerciseIndex]: exerciseToPersist,
      });
    },
    [setStoredExercises, storedExercises],
  );

  const userData = useMemo(() => {
    return {
      exercises: storedExercises,
    };
  }, [storedExercises]);

  return {
    persistExerciseIfNewRecord,
    userData,
  };
};
