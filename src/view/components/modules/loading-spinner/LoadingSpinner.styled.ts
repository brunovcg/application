import styled, { css, keyframes } from 'styled-components';
import { StyledLoadingSpinnerProps } from './LoadingSpinner.types';

const fontSizeMap = {
  tiny: '14px',
  small: '16px',
  medium: '20px',
  large: '25px',
} as const;

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

const StyledLoadingSpinner = styled.div<StyledLoadingSpinnerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .im-loading-spinner-message {
    font-size: ${(props) => fontSizeMap[props.size]};
    color: var(--typeface-medium-color);
    animation: ${blink} infinite 1s linear;
  }

  ${(props) =>
    props.size === 'tiny' &&
    css`
      flex-direction: row;
      gap: 10px;
    `}
`;

export default StyledLoadingSpinner;
