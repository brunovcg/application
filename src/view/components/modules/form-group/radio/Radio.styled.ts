import styled from 'styled-components';
import { StyledRadioProps } from './Radio.types';
import Constants from '../../../../../utils/constants/Constants';

const { BACKGROUND_COLORS, COLORS } = Constants;

const StyledRadio = styled.div<StyledRadioProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  height: 20px;
  &.im-disabled {
    label {
      color: var(--disabled-color);
    }

    .im-radio-span {
      cursor: not-allowed;
      background-color: var(--disabled-color);
    }
  }

  label {
    font-weight: bold;
    color: var(--typeface-medium-color);
    font-size: 12px;
    cursor: pointer;
  }

  input {
    visibility: hidden;
  }

  .im-radio-span {
    width: 22px;
    height: 22px;
    border: 2px solid var(--border-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: ${(props) => (props.selected ? COLORS.primary : BACKGROUND_COLORS.white)};
    cursor: pointer;
    .im-radio-icon {
      visibility: ${(props) => (props.selected ? 'visible' : 'hidden')};
      margin-top: 1px;
      user-select: none;
    }
  }
`;

export default StyledRadio;
