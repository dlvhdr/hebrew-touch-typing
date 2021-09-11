import {letterLearningOrder} from '../constants/practiceAndReviewLetterSets';

const LESSON_LINE_LENGTH = 25;
const LESSON_NUM_LINES = 3;
const AVERAGE_WORD_LENGTH = 5;

export type Letter = string;
export type LessonNewLetters = [Letter, Letter];
export type ExerciseText = string[];

enum ExerciseType {
  REVIEW = 'review',
  PRACTICE = 'practice',
}

type Exercise = {
  text: ExerciseText;
  type: ExerciseType;
};

const generateRandomWordLength = () => {
  return Math.max(2, Math.floor(Math.random() * AVERAGE_WORD_LENGTH + 1));
};

const generateRandomLetter = (lettersSet: Letter[]): Letter | ' ' => {
  const index = Math.floor(Math.random() * (lettersSet.length + 1));
  return lettersSet[index];
};

const generateRandomLine = (lettersSet: Letter[]) => {
  const numSpaces = LESSON_LINE_LENGTH / AVERAGE_WORD_LENGTH;
  const wordLengths = new Array(numSpaces)
    .fill(undefined)
    .map(generateRandomWordLength);
  const randomWords = wordLengths
    .map(length =>
      new Array(length + 1)
        .fill(undefined)
        .map(() => generateRandomLetter(lettersSet))
        .join(''),
    )
    .flat();
  return randomWords.join(' ');
};

const getEmptyLinesArray = (): undefined[] => {
  return new Array(LESSON_NUM_LINES).fill(undefined);
};

export const generateLetterReviewExercise = (
  lessonLetters: LessonNewLetters,
): ExerciseText => {
  return getEmptyLinesArray().map(_line => generateRandomLine(lessonLetters));
};

export const generateLetterPracticeExercise = (
  exerciseNumber: number,
): ExerciseText => {
  const letters = letterLearningOrder.slice(0, exerciseNumber + 1).flat();
  return getEmptyLinesArray().map(_line => generateRandomLine(letters));
};

export const getFullListOfPracticeAndReviewExercises = (): Exercise[] => {
  return letterLearningOrder
    .map((newLetters: LessonNewLetters, exerciseNumber: number) => {
      return [
        {
          text: generateLetterReviewExercise(newLetters),
          type: ExerciseType.REVIEW,
        },
        {
          text: generateLetterPracticeExercise(exerciseNumber),
          type: ExerciseType.PRACTICE,
        },
      ];
    })
    .flat();
};
