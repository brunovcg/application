import styled, { css, keyframes } from 'styled-components';
import { StyledButtonProps } from './Button.types';
import Constants from '../../../../utils/constants/Constants';

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

const { COLORS, BACKGROUND_COLORS } = Constants;
const { disabled, white } = COLORS;
const { white: CONTAINER_WHITE, transparent } = BACKGROUND_COLORS;

const getColor = (props: StyledButtonProps) => {
  if (props.styling !== 'regular') {
    if (props.disabled) {
      return disabled;
    }

    return COLORS[props.variant];
  }
  return white;
};

const getBorder = (props: StyledButtonProps) => {
  if (props.styling === 'text') {
    return 'none';
  }
  if (props.disabled) {
    return `1px solid ${disabled}`;
  }
  return `1px solid ${COLORS[props.variant]}`;
};

const getBackground = (props: StyledButtonProps) => {
  if (props.styling === 'text') {
    return transparent;
  }
  if (props.styling === 'outlined') {
    return CONTAINER_WHITE;
  }
  if (props.disabled) {
    return disabled;
  }
  return COLORS[props.variant];
};

const StyledButton = styled.div<StyledButtonProps>`
  background: ${(props) => getBackground(props)};
  border-radius: var(--button-border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width ?? 'fit-content'};
  height: ${(props) => (props.small ? 'fit-content' : props.height ?? '40px')};
  flex: ${(props) => props.flexGrow && '1'};

  &:hover:not(.im-loading) {
    opacity: ${(props) => (!props.disabled ? '80%' : undefined)};
  }

  .im-button-element {
    border: ${(props) => getBorder(props)};
    width: 100%;
    height: 100%;
    padding: ${(props) => (props.small ? '0 5px' : '8px 15px')};
    border-radius: var(--button-border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    background-color: var(--transparent);
    color: ${(props) => getColor(props)};
    gap: 5px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    font-size: ${(props) => (props.small ? '12px' : '13px')};
    white-space: ${(props) => (props.small ? 'nowrap' : 'initial')};
  }

  .im-button-text {
    user-select: none;
    color: ${(props) => getColor(props)};
    a {
      color: ${(props) => getColor(props)};
    }
    ${(props) =>
      !!props.textNoWrap &&
      css`
        container_white-space: nowrap;
      `}
  }

  &.im-loading {
    background: var(--container-CONTAINER_WHITE-color);
    border: ${(props) => getBorder(props)};

    .im-button-loading {
      display: flex;
      align-items: center;
      gap: 15px;
      .im-button-loading-icon {
        margin-top: 3px;
      }
      .im-button-loading-text {
        color: var(--typeface-medium-color);
        font-size: 11px;
        animation: ${blink} infinite 1s linear;
      }
    }
  }
`;

export default StyledButton;
