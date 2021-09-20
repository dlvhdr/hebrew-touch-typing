import {render, screen, waitFor} from '@testing-library/react';
import React, {useState} from 'react';
import userEvent from '@testing-library/user-event';
import {useWPM} from '../useWPM';
import {AVERAGE_WORD_LENGTH} from '../generateLetterExercises';

const TestComponent = ({text}: {text: string}) => {
  const [inputValue, setInputValue] = useState('');
  const {wpm} = useWPM(inputValue, text);
  return (
    <div>
      <input
        data-testid="input"
        value={inputValue}
        onChange={e => {
          return setInputValue(e.target.value);
        }}
      />
      <span data-testid="wpm">{wpm}</span>
    </div>
  );
};

interface SlowTypedTextResult {
  timePassedMs: number;
  lettersTyped: number;
  finalWPM: number;
}

const typeSlowly = (input: HTMLElement, text: string): SlowTypedTextResult => {
  userEvent.click(input);
  const timeIntervalsMs = 1000;
  let timePassedMs = 0;
  Array.from(text).forEach(letter => {
    jest.advanceTimersByTime(timeIntervalsMs);
    timePassedMs += timeIntervalsMs;
    userEvent.keyboard(letter);
  });
  return {
    timePassedMs,
    lettersTyped: text.length,
    finalWPM: text.length / (timePassedMs / 1000 / 60) / AVERAGE_WORD_LENGTH,
  };
};

describe('WPM Tracker', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should track the WPM as you type', async () => {
    const text = 'word1word2';
    render(<TestComponent text={text} />);
    const input = screen.getByTestId('input');

    typeSlowly(input, text);

    await waitFor(() => expect(input).toHaveValue(text));
    expect(Number(screen.getByTestId('wpm').textContent)).toBeGreaterThan(12);
  });

  it('should adjust the WPM as time passes without any typing', async () => {
    const text = 'word1word2';
    render(<TestComponent text={text} />);

    const firstWord = text.substr(0, 5);
    typeSlowly(screen.getByTestId('input'), firstWord);
    jest.advanceTimersByTime(2 * 60 * 1000);

    await waitFor(() =>
      expect(Number(screen.getByTestId('wpm').textContent)).toBeLessThan(2),
    );
  });

  it('should provide the final wpm when exercise is complete', async () => {
    const text =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, repellendus consequatur fugiat suscipit aliquam tempore ipsam ipsa dolorum rem iste enim omnis sit qui excepturi voluptate minus perferendis quia velit.';
    render(<TestComponent text={text} />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    const {finalWPM, timePassedMs} = typeSlowly(input, text);
    await waitFor(() => expect(input.value).toContain(text), {
      timeout: timePassedMs,
    });
    expect(Number(screen.getByTestId('wpm').textContent)).toBeGreaterThan(0);
    const displayedWPM = Number(screen.getByTestId('wpm').textContent);
    expect(Math.round(finalWPM)).toBe(Math.round(displayedWPM));
  });
});
