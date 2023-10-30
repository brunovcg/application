import styled from 'styled-components';
import { StyledSliderProps } from './Slider.types';

const StyledSlider = styled.div<StyledSliderProps>`
  width: ${(props) => props.width};
  min-width: 181px;

  .im-slider-thumb {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 10px;
    cursor: pointer;
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
  }

  &.im-max-limit {
    .im-slider-root {
      .im-slider-thumb {
        background: var(--primary-color);
        border: 1px solid var(--primary-color);
      }
    }
  }

  &.im-error {
    .im-slider-root {
      .im-slider-thumb {
        background: var(--error-color);
        border: 1px solid var(--error-color);
      }
    }
  }

  &.im-valid {
    .im-slider-root {
      .im-slider-thumb {
        background: var(--valid-color);
        border: 1px solid var(--valid-color);
      }
    }
  }

  &.im-disabled {
    .im-slider-container {
      input[type='number'] {
        color: var(--disabled-color);
      }
    }

    .im-slider-root {
      .im-slider-thumb {
        background: var(--disabled-color);
        border: 1px solid var(--disabled-color);
      }
    }

    .im-slider-footer {
      .im-slider-max-min {
        color: var(--disabled-color);
      }
    }
  }

  .im-slider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 5px 5px 10px;
    height: 40px;

    input[type='number'] {
      border: 1px solid var(--border-color);
      width: ${(props) => props.valueDisplaySize};
      min-width: 50px;
      border-radius: 15px;
      padding: 5px 8px;
      display: flex;
      justify-content: center;
      margin-right: 3px;
      color: var(--border);
    }

    .im-slider-root {
      position: relative;
      display: flex;
      align-items: center;
      user-select: none;
      touch-action: none;
      flex: 1;
      height: 20px;
      margin-right: 10px;
    }

    .im-slider-track {
      border: 1px solid var(--container-grey-color);
      background: var(--container-grey-color);
      position: relative;
      flex-grow: 1;
      border-radius: 9999px;
      height: 4px;
    }

    .im-slider-range {
      position: absolute;
      background-color: var(--container-grey-color);
      border-radius: 9999px;
      height: 100%;
    }
  }
`;

export default StyledSlider;
