import styled from 'styled-components';
import { StyledProgressBarProps } from './ProgressBar.types';

const StyledProgressBar = styled.div<StyledProgressBarProps>`
  width: ${(props) => props.width};
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: help;

  .im-progress-tag {
    display: none;
  }

  .im-progress-bar-state-wrapper {
    border: 1px solid var(--border-color);
    border-radius: 20px;
    background-color: var(--container-white-color);
    display: flex;
    height: calc(100% - 2px);
    flex: 1;

    .im-progress-bar-state {
      margin: 1px;
      width: ${(props) => `calc(${props.value}% - 2px)`};
      border-radius: 10px;
      background-color: var(--typeface-light-color);
    }

    .im-progress-bar-state.im-completed {
      background-color: var(--valid-color);
    }
  }

  .im-progress-bar-label,
  .im-progress-bar-value {
    position: absolute;
    border: 1px solid var(--border-color);
    border-radius: var(--container-border-radius);
    width: fit-content;
    padding: 0 2px;
    font-size: 11px;
    color: var(--typeface-medium-color);
    background-color: var(--container-white-color);
  }

  .im-progress-bar-label-min,
  .im-progress-bar-label-max {
    top: 0;
  }

  .im-progress-bar-label-min {
    left: 0;
  }

  .im-progress-bar-label-max {
    right: 0;
  }

  .im-progress-bar-value {
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export default StyledProgressBar;
