import {getFullListOfPracticeAndReviewExercises} from '../generateLetterExercises';
import {getDriver} from './generateLetterExercises.driver';
describe('generateLetterExercises', () => {
  it('should generate a concise text, using only the given two letters, for a review lesson', () => {
    const driver = getDriver();
    driver.given.letters(['ג', 'ל']);

    const text = driver.get.letterReviewExercise().join('');

    expect(text.includes('ל')).toBe(true);
    expect(text.includes('ג')).toBe(true);
    expect(text.includes(' ')).toBe(true);
    expect(text.replace(/[גל]/g, '').trim()).toBe('');
  });

  it('should output roughly 3 lines', () => {
    const driver = getDriver();
    driver.given.letters(['ח', 'כ']);

    const exercise = driver.get.letterReviewExercise();
    expect(exercise).toHaveLength(3);
  });

  it('should output each line with a space at the end, except for the last line', () => {
    const driver = getDriver();
    driver.given.letters(['ח', 'כ']);

    const exercise = driver.get.letterReviewExercise();
    exercise
      .slice(0, exercise.length - 1)
      .map(line => expect(line.endsWith(' ')).toBe(true));
    const lastLine = exercise[exercise.length - 1];
    expect(lastLine.charAt(lastLine.length - 1)).not.toBe(' ');
  });

  it('should generate a concise text, using the letters learned up until now, for a practice lesson', () => {
    const driver = getDriver();

    const exerciseLines = driver.get.letterPracticeExercise(3);
    expect(exerciseLines).toHaveLength(3);
    expect(driver.get.lettersInExercise(exerciseLines)).toEqual(
      new Set(['כ', 'ח', 'ג', 'ל', 'ד', 'ך', ' ']),
    );
  });

  it('should never start with a space', () => {
    const driver = getDriver();

    const exerciseLines = driver.get.letterPracticeExercise(2);
    exerciseLines.forEach(line => expect(line[0] !== '').toBe(true));
  });

  it('should never start with a space', () => {
    const driver = getDriver();

    const exerciseLines = driver.get.letterPracticeExercise(2);
    exerciseLines.forEach(line => expect(line[0] !== '').toBe(true));
  });

  it('should never generate one letter words', () => {
    const driver = getDriver();

    const exerciseLines = driver.get.letterPracticeExercise(3);
    exerciseLines.forEach(line =>
      expect(line.match(/\s\w\s|^\w\s|\s\w$/)).toBe(null),
    );
  });

  it('should output the full list of exercises - a review and a practice lesson for each 2 new letters', () => {
    const numOfLetterPairs = 30 / 2;
    const numOfExerciseTypes = 2;
    const numOfExpectedExercises = numOfLetterPairs * numOfExerciseTypes - 1;
    expect(getFullListOfPracticeAndReviewExercises()).toHaveLength(
      numOfExpectedExercises,
    );
  });
});
