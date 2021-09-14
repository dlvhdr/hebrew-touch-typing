import {getFullListOfPracticeAndReviewExercises} from '../generateLetterExercises';
import {getDriver} from './generateLetterExercises.driver';
describe('generateLetterExercises', () => {
  it('should generate a consise text, using only the given two letters, for a review lesson', () => {
    const driver = getDriver();
    driver.given.letters(['ח', 'כ']);

    const text = driver.get.letterReviewExercise().join('');

    expect(text.includes('ח')).toBe(true);
    expect(text.includes('כ')).toBe(true);
    expect(text.includes(' ')).toBe(true);
    expect(text.replace(/[חכ]/g, '').trim()).toBe('');
  });

  it('should output roughly 3 lines', () => {
    const driver = getDriver();
    driver.given.letters(['ח', 'כ']);

    const exercise = driver.get.letterReviewExercise();
    expect(exercise).toHaveLength(3);
  });

  it('should output each line with a space at the end', () => {
    const driver = getDriver();
    driver.given.letters(['ח', 'כ']);

    const exercise = driver.get.letterReviewExercise();
    exercise.map(line => expect(line.endsWith(' ')).toBe(true));
  });

  it('should generate a concise text, using the letters learned up until now, for a practice lesson', () => {
    const driver = getDriver();

    const exercise = driver.get.letterPracticeExercise(2);
    expect(exercise).toHaveLength(3);
    expect(driver.get.lettersInExercise(exercise)).toEqual(
      new Set(['כ', 'ח', 'ג', 'ל', 'ד', 'ך', ' ']),
    );
  });

  it('should output the full list of exercises - a review and a practice lesson for each 2 new letters', () => {
    const numOfLetterPairs = 15;
    const numOfExerciseTypes = 2;
    const numOfExpectedExercises = numOfLetterPairs * numOfExerciseTypes;
    expect(getFullListOfPracticeAndReviewExercises()).toHaveLength(
      numOfExpectedExercises,
    );
  });
});
