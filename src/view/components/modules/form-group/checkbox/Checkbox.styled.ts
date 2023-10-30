import styled, { css } from 'styled-components';
import { StyledCheckboxProps } from './Checkbox.types';
import Constants from '../../../../../utils/constants/Constants';

const { BACKGROUND_COLORS, COLORS } = Constants;

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: flex;
  align-items: center;
  gap: 11px;

  position: relative;
  height: 20px;

  ${(props) =>
    !props.hasLabel &&
    css`
      justify-content: center;
    `}

  &.im-disabled {
    label {
      color: var(--disabled-color);
    }

    .im-checkbox-span {
      cursor: not-allowed;
      background-color: var(--disabled-color);
    }
  }

  label {
    font-weight: bold;
    color: var(--typeface-medium-color);
    font-size: 12px;
    cursor: pointer;
    white-space: nowrap;
  }

  input {
    visibility: hidden;
  }

  .im-checkbox-span {
    width: 20px;
    height: 20px;
    border: 2px solid var(--border-color);
    border-radius: var(--container-border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: ${(props) => (props.selected ? COLORS.primary : BACKGROUND_COLORS.white)};
    cursor: pointer;
    .im-checkbox-icon {
      visibility: ${(props) => (props.selected ? 'visible' : 'hidden')};
      margin-top: 1px;
      user-select: none;
    }
  }
`;

export default StyledCheckbox;
