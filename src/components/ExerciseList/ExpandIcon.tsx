import React from 'react';
import * as styles from './exercise-list.scss';

interface ExpandIconProps {
  isExpanded: boolean;
}

const ExpandIcon: React.FC<ExpandIconProps> = ({isExpanded}) => {
  return (
    <div className={isExpanded ? styles.expandedIcon : styles.collapsedIcon}>
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path d="M1 1L7 7L13 1" stroke="#410B13" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default ExpandIcon;
