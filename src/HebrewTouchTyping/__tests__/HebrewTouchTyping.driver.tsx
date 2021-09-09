import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HebrewTouchTyping from '../HebrewTouchTyping';

export const getDriver = () => {
  return {
    when: {
      render: () => {
        render(
          <HebrewTouchTyping
            exercise={{
              text: 'שורה 1 שורה 2',
              lines: [7],
            }}
          />
        );
      },
      textIsTyped: (text: string) => {
        const input = screen.getByTestId('input');
        fireEvent.change(input, {
          target: { value: text },
        });
      },
    },
  };
};
