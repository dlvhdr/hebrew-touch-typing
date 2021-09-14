import {cleanup, screen} from '@testing-library/react';
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

  it('should apply correct letter class when typing a correct letter', () => {
    driver.when.render();

    driver.when.textIsTyped('ש');

    const letterElements = driver.get.statelessLetters();
    expect(letterElements).toHaveLength(driver.get.textLength() - 2);

    const correctLetterElements = driver.get.correctLetters();
    expect(correctLetterElements).toHaveLength(1);

    const incorrectLetterElements = driver.get.incorrectLetters();
    expect(incorrectLetterElements).toHaveLength(0);
  });

  it('should apply incorrect letter class when typing a incorrect letter', () => {
    driver.when.render();

    driver.when.textIsTyped('ו');

    const letterElements = driver.get.statelessLetters();
    expect(letterElements).toHaveLength(driver.get.textLength() - 2);

    const correctLetterElements = driver.get.correctLetters();
    expect(correctLetterElements).toHaveLength(0);

    const incorrectLetterelements = driver.get.incorrectLetters();
    expect(incorrectLetterelements).toHaveLength(1);
  });
});
