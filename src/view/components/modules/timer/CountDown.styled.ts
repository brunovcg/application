import styled, { css, keyframes } from 'styled-components';
import { StyledCountDownProps } from './CountDown.types';
import Constants from '../../../../utils/constants/Constants';

const blink = keyframes`
  50% {
    opacity: 0;
  }`;

const StyledCountDown = styled.div<StyledCountDownProps>`
  color: ${(props) => Constants.COLORS[props.variant]};
  display: flex;
  align-items: center;

  &.im-count-down-small {
    font-size: 12px;
  }

  &.im-count-down-medium {
    font-size: 16px;
  }

  &.im-count-down-large {
    font-size: 20px;
  }

  ${(props) =>
    props.blink &&
    css`
      animation: ${blink} infinite 1s linear;
    `}
`;

export default StyledCountDown;
