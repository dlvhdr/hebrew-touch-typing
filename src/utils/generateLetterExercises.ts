import {
  ExerciseType,
  LessonNewLetters,
  Letter,
  LetterExerciseDescriptor,
  LetterExerciseDescriptors,
} from '../constants/practiceAndReviewLetterSets';

const LESSON_LINE_LENGTH = 25;
const LESSON_NUM_LINES = 3;
export const AVERAGE_WORD_LENGTH = 5;

export type ExerciseText = string[];

interface BaseExercise {
  index: number;
  text: ExerciseText;
  type: ExerciseType;
}

export interface LettersReviewExercise extends BaseExercise {
  newLetters: LessonNewLetters;
  type: ExerciseType.REVIEW;
}

export interface LettersPracticeExercise extends BaseExercise {
  newLetters: LessonNewLetters;
  type: ExerciseType.PRACTICE;
}

export type LettersExercise = LettersReviewExercise | LettersPracticeExercise;

const generateRandomWordLength = () => {
  return Math.max(2, Math.floor(Math.random() * AVERAGE_WORD_LENGTH + 1));
};

const generateRandomLetter = (lettersSet: Letter[]): Letter | ' ' => {
  const index = Math.round(Math.random() * (lettersSet.length - 1));
  return lettersSet[index];
};

const generateRandomLine = (lettersSet: Letter[], lineNumber: number) => {
  const numSpaces = LESSON_LINE_LENGTH / AVERAGE_WORD_LENGTH;
  const wordLengths = new Array(numSpaces)
    .fill(undefined)
    .map(generateRandomWordLength);
  const randomWords = wordLengths
    .map(length =>
      new Array(length)
        .fill(undefined)
        .map(() => generateRandomLetter(lettersSet))
        .join(''),
    )
    .flat();
  return (
    randomWords.join(' ') + (lineNumber !== LESSON_NUM_LINES - 1 ? ' ' : '')
  );
};

const getEmptyLinesArray = (): undefined[] => {
  return new Array(LESSON_NUM_LINES).fill(undefined);
};

export const generateLetterReviewExercise = (
  lessonLetters: LessonNewLetters,
): ExerciseText => {
  return getEmptyLinesArray().map((_line, lineNumber) =>
    generateRandomLine(lessonLetters, lineNumber),
  );
};

export const generateLetterPracticeExercise = (
  exerciseIndex: number,
): ExerciseText => {
  const letters = LetterExerciseDescriptors.slice(0, exerciseIndex + 1)
    .map(descriptor => descriptor.newLetters)
    .flat();
  return getEmptyLinesArray().map((_line, lineIndex) =>
    generateRandomLine(letters, lineIndex),
  );
};

export const getFullListOfPracticeAndReviewExercises =
  (): LettersExercise[] => {
    return LetterExerciseDescriptors.map(
      (exerciseDescriptor: LetterExerciseDescriptor, index: number) => {
        return {
          ...exerciseDescriptor,
          index,
          text:
            exerciseDescriptor.type === ExerciseType.PRACTICE
              ? generateLetterPracticeExercise(index)
              : generateLetterReviewExercise(exerciseDescriptor.newLetters),
        };
      },
    );
  };
