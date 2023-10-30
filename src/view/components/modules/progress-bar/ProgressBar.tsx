import { useState } from 'react';
import StyledProgressBar from './ProgressBar.styled';
import { ProgressBarProps } from './ProgressBar.types';
import { ClassNameHelper } from '../../../../utils/helpers';

export default function ProgressBar({ min, max, value, width = '100%', unit, decimal = 0, showLabel = true }: ProgressBarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const proportion = Number(((value / max) * 100).toFixed(decimal));

  const classesState = ClassNameHelper.conditional({ ['im-progress-bar-state']: true, ['im-completed']: value === max });

  return (
    <StyledProgressBar
      className="im-progress-bar"
      width={width}
      value={proportion}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <progress max={max} value={proportion} className="im-progress-tag" />

      {showLabel && isHovered && (
        <div className="im-progress-bar-label im-progress-bar-label-min">
          {min}
          {unit}
        </div>
      )}

      <div className="im-progress-bar-state-wrapper">
        <div className={classesState} />
      </div>
      {showLabel && isHovered && (
        <div className="im-progress-bar-label im-progress-bar-label-max">
          {max}
          {unit}
        </div>
      )}

      {isHovered && (
        <div className="im-progress-bar-value">
          {value}
          {unit}
        </div>
      )}
    </StyledProgressBar>
  );
}
