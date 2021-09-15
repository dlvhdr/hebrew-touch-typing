import React, {useState} from 'react';
import {LettersExercise} from '../../utils/generateLetterExercises';

interface ExerciseContextType {
  selectedExercise: LettersExercise | null;
  setSelectedExercise: (exercise: LettersExercise | null) => void;
}

const ExerciseContext = React.createContext<ExerciseContextType | undefined>(
  undefined,
);

interface ExerciseProviderProps {
  children: React.ReactNode;
  initialExercise?: LettersExercise | null;
}

const ExerciseProvider = ({
  children,
  initialExercise = null,
}: ExerciseProviderProps): JSX.Element => {
  const [selectedExercise, setSelectedExercise] =
    useState<LettersExercise | null>(initialExercise);

  return (
    <ExerciseContext.Provider
      value={{
        selectedExercise,
        setSelectedExercise,
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
