import {ExerciseType} from '../constants/practiceAndReviewLetterSets';
import {Exercise, LettersExercise} from './generateLetterExercises';

export const getNumOfCorrectCharacters = (
  input: string,
  text: string,
): number => {
  return Array.from(input).reduce((numCorrectCharacters, character, index) => {
    return numCorrectCharacters + (text.charAt(index) === character ? 1 : 0);
  }, 0);
};

export const isLettersExercise = (exercise: Exercise): boolean => {
  return (
    exercise.type === ExerciseType.PRACTICE ||
    exercise.type === ExerciseType.REVIEW
  );
};

export const assertLettersExercise = (
  exercise: Exercise,
): LettersExercise | never => {
  if (isLettersExercise(exercise)) {
    return exercise as LettersExercise;
  }

  throw new Error('Expected a LettersExercise');
};
