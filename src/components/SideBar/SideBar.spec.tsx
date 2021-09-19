import React from 'react';
import {screen} from '@testing-library/react';
import SideBar from './SideBar';
import {LetterExerciseDescriptors} from '../../constants/practiceAndReviewLetterSets';
import {renderWithProviders} from '../../utils/renderWithProviders';

describe('SideBar', () => {
  it('should list all the letters review and practice exercises', () => {
    renderWithProviders(<SideBar />);
    expect(screen.getAllByTestId('exercise-menu-item')).toHaveLength(
      LetterExerciseDescriptors.length,
    );
  });
});
