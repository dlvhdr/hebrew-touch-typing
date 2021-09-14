import React from 'react';
import {render, screen} from '@testing-library/react';
import SideBar from './SideBar';
import {letterLearningOrder} from '../../constants/practiceAndReviewLetterSets';

describe('SideBar', () => {
  it('should list all the letters review and practice exercises', () => {
    render(<SideBar />);
    expect(screen.getAllByTestId('exercise-menu-item')).toHaveLength(
      letterLearningOrder.length * 2,
    );
  });
});
