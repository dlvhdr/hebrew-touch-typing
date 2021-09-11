import {ExerciseText} from '../../utils/generateLetterExercises';
import {
  generateLetterPracticeExercise,
  generateLetterReviewExercise,
  LessonNewLetters,
  Letter,
} from '../generateLetterExercises';

export type LetterExercisesGeneratorDriver = {
  given: {
    letters: (givenLetters: LessonNewLetters) => void;
  };
  get: {
    letterReviewExercise: () => ExerciseText;
    letterPracticeExercise: (exerciseNumber: number) => ExerciseText;
    lettersInExercise: (exercise: ExerciseText) => Set<Letter>;
  };
};

export const getDriver = (): LetterExercisesGeneratorDriver => {
  let letters: LessonNewLetters;

  return {
    given: {
      letters: (givenLetters: LessonNewLetters): void => {
        letters = givenLetters;
      },
    },
    get: {
      letterReviewExercise: (): ExerciseText => {
        return generateLetterReviewExercise(letters);
      },
      letterPracticeExercise: (exerciseNumber: number): ExerciseText => {
        return generateLetterPracticeExercise(exerciseNumber);
      },
      lettersInExercise: (exercise: ExerciseText): Set<Letter> => {
        return Array.from(exercise.join('')).reduce(
          (set: Set<Letter>, letter: Letter) => {
            return set.add(letter);
          },
          new Set<Letter>(),
        );
      },
    },
  };
};
