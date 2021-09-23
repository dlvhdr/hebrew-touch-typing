export type Letter = string;
export type LessonNewLetters = [Letter, Letter];

export enum ExerciseType {
  REVIEW = 'review',
  PRACTICE = 'practice',
  TEXT = 'text',
}

export interface LetterExerciseDescriptor {
  newLetters: LessonNewLetters;
  type: ExerciseType.PRACTICE | ExerciseType.REVIEW;
}

export const LetterExerciseDescriptors: LetterExerciseDescriptor[] = [
  {newLetters: ['כ', 'ח'], type: ExerciseType.REVIEW},
  {newLetters: ['ג', 'ל'], type: ExerciseType.REVIEW},
  {newLetters: ['ג', 'ל'], type: ExerciseType.PRACTICE},
  {newLetters: ['ד', 'ך'], type: ExerciseType.REVIEW},
  {newLetters: ['ד', 'ך'], type: ExerciseType.PRACTICE},
  {newLetters: ['ש', 'ף'], type: ExerciseType.REVIEW},
  {newLetters: ['ש', 'ף'], type: ExerciseType.PRACTICE},
  {newLetters: ['ע', 'י'], type: ExerciseType.REVIEW},
  {newLetters: ['ע', 'י'], type: ExerciseType.PRACTICE},
  {newLetters: ['ר', 'ו'], type: ExerciseType.REVIEW},
  {newLetters: ['ר', 'ו'], type: ExerciseType.PRACTICE},
  {newLetters: ['ק', 'ן'], type: ExerciseType.REVIEW},
  {newLetters: ['ק', 'ן'], type: ExerciseType.PRACTICE},
  {newLetters: ['ם', "'"], type: ExerciseType.REVIEW},
  {newLetters: ['ם', "'"], type: ExerciseType.PRACTICE},
  {newLetters: ['/', 'ט'], type: ExerciseType.REVIEW},
  {newLetters: ['/', 'ט'], type: ExerciseType.PRACTICE},
  {newLetters: ['פ', 'א'], type: ExerciseType.REVIEW},
  {newLetters: ['פ', 'א'], type: ExerciseType.PRACTICE},
  {newLetters: ['ה', 'צ'], type: ExerciseType.REVIEW},
  {newLetters: ['ה', 'צ'], type: ExerciseType.PRACTICE},
  {newLetters: ['ב', 'ת'], type: ExerciseType.REVIEW},
  {newLetters: ['ב', 'ת'], type: ExerciseType.PRACTICE},
  {newLetters: ['ס', 'ץ'], type: ExerciseType.REVIEW},
  {newLetters: ['ס', 'ץ'], type: ExerciseType.PRACTICE},
  {newLetters: ['ז', '.'], type: ExerciseType.REVIEW},
  {newLetters: ['ז', '.'], type: ExerciseType.PRACTICE},
  {newLetters: ['נ', 'מ'], type: ExerciseType.REVIEW},
  {newLetters: ['נ', 'מ'], type: ExerciseType.PRACTICE},
];
