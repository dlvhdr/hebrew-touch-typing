const LESSON_LINE_LENGTH = 25;
const LESSON_NUM_LINES = 3;

export type Letter = string;
export type LessonNewLetters = [Letter, Letter];
export type ExerciseText = string[];

const letterLearningOrder: LessonNewLetters[] = [
  ['כ', 'ח'],
  ['ג', 'ל'],
  ['ד', 'ך'],
  ['ש', 'ף'],
  ['ע', 'י'],
  ['ר', 'ו'],
  ['ק', 'ן'],
  ['ם', "'"],
  ['/', 'ט'],
  ['פ', 'א'],
  ['ה', 'צ'],
  ['ב', 'ת'],
  ['ס', 'ץ'],
  ['ז', '.'],
  ['נ', 'מ'],
];

const getRandomLetter = (lettersSet: Letter[]): Letter | ' ' => {
  const index = Math.floor(Math.random() * (lettersSet.length + 1));
  return [...lettersSet, ' '][index];
};

const getEmptyLinesArray = (): undefined[] => {
  return new Array(LESSON_NUM_LINES).fill(undefined);
};

const fillLinesWithRandomLetters = (letters: Letter[]): string => {
  return new Array(LESSON_LINE_LENGTH)
    .fill(undefined)
    .map(_letter => getRandomLetter(letters))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
};

export const generateLetterReviewExercise = (
  lessonLetters: LessonNewLetters,
): ExerciseText => {
  return getEmptyLinesArray().map(_line =>
    fillLinesWithRandomLetters(lessonLetters),
  );
};

// Practice lesson should contain all the letters you've learned so far
export const generateLetterPracticeExercise = (
  exerciseNumber: number,
): ExerciseText => {
  const letters = letterLearningOrder.slice(0, exerciseNumber + 1).flat();
  return getEmptyLinesArray().map(_line => fillLinesWithRandomLetters(letters));
};

enum ExerciseType {
  REVIEW = 'review',
  PRACTICE = 'practice',
}

type Exercise = {
  text: ExerciseText;
  type: ExerciseType;
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
