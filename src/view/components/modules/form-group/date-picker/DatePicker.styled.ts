import styled from 'styled-components';
import { StyledDatePickerProps } from './DatePicker.types';

export const StyledDatePicker = styled.div<StyledDatePickerProps>`
  position: relative;
  width: 260px;

  &:not(.im-disabled) {
    .p-inputtext {
      cursor: pointer;
    }
  }

  .im-disabled {
    .p-inputtext {
      cursor: not-allowed;
      color: var(--typeface-disabled-color);
    }
  }

  .im-date-picker-wrapper {
    height: ${(props) => props.height ?? '40px'};
    width: 100%;
    display: flex;
    align-items: center;

    .p-calendar {
      height: 100%;
      width: 100%;

      .p-inputtext {
        height: 100%;
        border: none;
        border-radius: var(--container-border-radius);
        padding-left: 15px;
        font-size: 14px;
        background: var(--container-white-color);

        &::placeholder {
          color: var(--placeholder-color);
          font-size: var(--placeholder-size);
        }
      }
    }
  }
`;

export const StyledCalendarWrapper = styled.div`
  width: 100%;
  position: relative;

  .im-date-picker-calendar {
    width: 100%;
  }

  .im-date-picker-buttons {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    gap: 5px;
  }
`;
