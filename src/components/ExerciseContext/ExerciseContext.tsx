import React, {useCallback, useMemo, useState} from 'react';
import {
  Exercise,
  getFullListOfPracticeAndReviewExercises,
  getListOfTextExercises,
} from '../../utils/generateLetterExercises';

interface ExerciseContextType {
  selectedExercise: Exercise | null;
  setSelectedExercise: (exercise: Exercise | null) => void;
  setSelectedExerciseNumber: (exerciseIndex: number) => void;
}

const ExerciseContext = React.createContext<ExerciseContextType | undefined>(
  undefined,
);

interface ExerciseProviderProps {
  children: React.ReactNode;
  initialExercise?: Exercise | null;
}
const ExerciseProvider = ({
  children,
  initialExercise = null,
}: ExerciseProviderProps): JSX.Element => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    initialExercise,
  );

  const allExercises = useMemo(() => {
    return [
      ...getFullListOfPracticeAndReviewExercises(),
      ...getListOfTextExercises(),
    ];
  }, []);

  const setSelectedExerciseNumber = useCallback(
    (exerciseIndex: number) => {
      setSelectedExercise(allExercises[exerciseIndex]);
    },
    [allExercises],
  );

  return (
    <ExerciseContext.Provider
      value={{
        selectedExercise,
        setSelectedExercise,
        setSelectedExerciseNumber,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

const useExerciseContext = (): ExerciseContextType => {
  const context = React.useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error('useExerciseContext must be used within a ExerciseContext');
  }
  return context;
};

export {ExerciseProvider, useExerciseContext};
