import {cleanup, screen, waitFor} from '@testing-library/react';
import {ExerciseType} from '../../../constants/practiceAndReviewLetterSets';
import {
  getListOfTextExercises,
  LettersExercise,
} from '../../../utils/generateLetterExercises';
import {getDriver} from './HebrewTouchTyping.driver';

let driver: ReturnType<typeof getDriver>;

describe('text transform', () => {
  beforeEach(() => (driver = getDriver()));
  afterEach(cleanup);

  it('should render all the lines', () => {
    driver.when.render();
    expect(screen.getAllByTestId('line')).toHaveLength(2);
  });

  it('should display the text without any correct/incorrect classes', () => {
    driver.when.render();

    const letterElements = driver.get.statelessLetters();
    expect(letterElements).toHaveLength(driver.get.textLength() - 1);

    const currentLetterElement = driver.get.currentLetter();
    expect(currentLetterElement).toBeDefined();
  });

  it('should reset the input when selecting another exercise', async () => {
    driver.when.render();

    driver.when.textIsTyped('שורה');
    driver.when.exerciseIsSelected('3');

    const correctLetterElements = await driver.get
      .correctLetters()
      .catch(() => []);
    const incorrectLetterElements = driver.get.incorrectLetters();
    const statelessLetters = driver.get.statelessLetters();
    expect(statelessLetters.length).toBeGreaterThan(0);
    expect(correctLetterElements.length).toBe(0);
    expect(incorrectLetterElements.length).toBe(0);
    expect(driver.get.currentLetter()).toBeInTheDocument();
  });

  it('should apply correct letter class when typing a correct letter', async () => {
    driver.when.render();

    driver.when.textIsTyped('ש');

    const letterElements = driver.get.statelessLetters();
    expect(letterElements).toHaveLength(driver.get.textLength() - 2);

    const correctLetterElements = await driver.get.correctLetters();
    expect(correctLetterElements).toHaveLength(1);

    const incorrectLetterElements = driver.get.incorrectLetters();
    expect(incorrectLetterElements).toHaveLength(0);
  });

  it('should apply incorrect letter class when typing a incorrect letter', async () => {
    driver.when.render();

    driver.when.textIsTyped('ו');

    const letterElements = driver.get.statelessLetters();
    expect(letterElements).toHaveLength(driver.get.textLength() - 2);

    const correctLetterElements = await driver.get
      .correctLetters()
      .catch(() => []);
    expect(correctLetterElements).toHaveLength(0);

    const incorrectLetterelements = driver.get.incorrectLetters();
    expect(incorrectLetterelements).toHaveLength(1);
  });

  it("should apply correct letter class when typing ' in exercise expecting ' (Windows default)", async () => {
    const exercise: LettersExercise = {
      index: 0,
      type: ExerciseType.REVIEW,
      text: ["'", 'ם'],
      newLetters: ["'", 'ם'],
    };

    driver = getDriver(exercise);

    driver.when.render();

    driver.when.textIsTyped("'");

    const letterElements = driver.get.statelessLetters();
    expect(letterElements).toHaveLength(driver.get.textLength() - 2);

    const correctLetterElements = await driver.get.correctLetters();
    expect(correctLetterElements).toHaveLength(1);

    const incorrectLetterElements = driver.get.incorrectLetters();
    expect(incorrectLetterElements).toHaveLength(0);
  });

  it("should apply correct letter class when typing ׳ in exercise expecting ' (Mac default)", async () => {
    const exercise: LettersExercise = {
      index: 0,
      type: ExerciseType.REVIEW,
      text: ["'", 'ם'],
      newLetters: ["'", 'ם'],
    };

    driver = getDriver(exercise);

    driver.when.render();

    driver.when.textIsTyped('׳');

    const letterElements = driver.get.statelessLetters();
    expect(letterElements).toHaveLength(driver.get.textLength() - 2);

    const correctLetterElements = await driver.get.correctLetters();
    expect(correctLetterElements).toHaveLength(1);

    const incorrectLetterElements = driver.get.incorrectLetters();
    expect(incorrectLetterElements).toHaveLength(0);
  });

  it('should mark lesson as complete when all text has been typed', async () => {
    driver.when.render();
    expect(screen.queryByText(/exercise complete!/i)).not.toBeInTheDocument();

    driver.when.textIsTyped('שורה 1 שורה 2');

    const correctLetterElements = await driver.get.correctLetters();
    expect(correctLetterElements).toHaveLength(13);
    expect(
      await screen.findByTestId('exercise-completed-card'),
    ).toBeInTheDocument();
  });

  it('should remove the exercise completed card when switching exercises', async () => {
    driver.when.render();
    expect(screen.queryByText(/exercise complete!/i)).not.toBeInTheDocument();

    driver.when.textIsTyped('שורה 1 שורה 2');

    await waitFor(() => {
      expect(
        screen.queryByTestId('exercise-completed-card'),
      ).toBeInTheDocument();
    });

    driver.when.exerciseIsSelected('3');

    await waitFor(() => {
      expect(
        screen.queryByTestId('exercise-completed-card'),
      ).not.toBeInTheDocument();
    });
  });

  it('should allow selecting a text exercise', async () => {
    const textExercises = getListOfTextExercises();
    driver.when.render();

    driver.when.exerciseIsSelected(`${textExercises[0].index}`);

    expect(screen.getAllByText(textExercises[0].label)).toHaveLength(2);
  });
});
