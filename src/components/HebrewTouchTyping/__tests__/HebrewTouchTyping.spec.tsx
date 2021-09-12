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

    const letterElements = screen.getAllByTestId('letter');
    letterElements.map(letter => expect(letter).toHaveClass('letter'));
    letterElements.map(letter =>
      expect(letter).not.toHaveClass('correct-letter'),
    );
    letterElements.map(letter =>
      expect(letter).not.toHaveClass('incorrect-letter'),
    );
  });

  it('should apply correct letter class when typing a correct letter', () => {
    driver.when.render();

    driver.when.textIsTyped('ש');

    const letterElements = screen.getAllByTestId('letter');
    expect(letterElements[0]).toHaveClass('correct-letter');
    letterElements
      .slice(1)
      .map(letter =>
        expect(letter).not.toHaveClass('correct-letter incorrect-letter'),
      );
  });

  it('should apply incorrect letter class when typing a incorrect letter', () => {
    driver.when.render();

    driver.when.textIsTyped('ו');

    const letterElements = screen.getAllByTestId('letter');
    expect(letterElements[0]).toHaveClass('incorrect-letter');
    letterElements
      .slice(1)
      .map(letter =>
        expect(letter).not.toHaveClass('correct-letter incorrect-letter'),
      );
  });
});
