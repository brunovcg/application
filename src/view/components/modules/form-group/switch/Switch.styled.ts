import styled, { css } from 'styled-components';
import { StyledSwitchProps } from './Switch.types';

const StyledSwitch = styled.div<StyledSwitchProps>`
  display: flex;
  gap: 5px;
  align-items: center;
  position: relative;
  width: fit-content;

  .im-switch-container {
    background: var(--transparent-color);
  }

  ${(props) =>
    props.hasLabel &&
    css`
      .im-switch-container {
        padding: 9px 20px;
      }
    `}

  &.im-disabled {
    .im-switch-label,
    .im-switch-box {
      cursor: not-allowed;
    }

    &:not(.im-mode-on-off) {
      .im-switch-button {
        background-color: var(--disabled-primary-color);
      }
    }
  }

  &.im-mode-on-off {
    .im-switch-box {
      border: 1px solid var(--container-white-color);
      .im-switch-button {
        background-color: var(--container-white-color);
      }
    }
    .im-switch-box-state-right {
      background-color: var(--primary-color);
    }
    .im-switch-box-state-left {
      background-color: var(--container-dark-color);
    }
    &.im-disabled {
      .im-switch-box-state-right {
        background-color: var(--disabled-primary-color);
      }
      .im-switch-box-state-left {
        background-color: var(--disabled-color);
      }
    }
  }

  .im-switch-option-label {
    font-size: 12px;
    color: var(--typeface-light-color);
    cursor: pointer;
    user-select: none;
  }

  .im-switch-box {
    border: 1px solid var(--border-color);
    border-radius: 30px;
    height: 22px;
    width: 37px;
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 2px;
    cursor: pointer;
    background-color: var(--container-medium-color);
    .im-switch-button {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background-color: var(--primary-color);
    }
  }

  .im-switch-box.im-switch-box-state-left {
    justify-content: flex-start;
  }

  .im-switch-box.im-switch-box-state-right {
    justify-content: flex-end;
  }
`;

export default StyledSwitch;
