import styled, { css } from 'styled-components';
import { StyledInputProps } from './InputNumber.types';

const StyledInput = styled.div<StyledInputProps>`
  width: ${(props) => props.width ?? '100%'};
  max-width: ${(props) => props.maxWidth ?? '100%'};
  min-width: ${(props) => props.minWidth ?? undefined};
  max-height: 62px;

  &.im-disabled {
    .im-input-number-body {
      .im-input-number-field {
        color: var(--disabled-color);
      }
    }
  }

  &.im-percent {
    .im-input-number-body {
      .im-input-number-field {
        text-align: end;
        margin: 5px;
      }

      .im-input-number-percent-symbol {
        color: var(--typeface-medium-color);
        font-weight: bold;
        font-size: 14px;
        padding-right: 5px;
      }
    }
  }

  ${(props) =>
    props.flex &&
    css`
      flex: ${'1 1 ' + props.flex};
    `}

  &.im-valid {
    .im-input-number-body {
      .im-input-number-field {
        color: var(--valid-color);
      }
    }
  }

  .im-input-number-body {
    align-items: center;
    height: ${(props) => props.height ?? '42px'};
    display: flex;
    width: 100%;

    .im-input-number-field {
      height: 100%;
      font-size: 14px;
      border: none;
      width: 100%;
      padding-left: 10px;
      background: var(--transparent);
      color: var(--typeface-medium-color);

      ::placeholder {
        color: var(--placeholder-color);
        font-size: var(--placeholder-size);
      }
    }
  }

  .im-disabled {
    .im-input-number-field::placeholder,
    .im-input-number-info {
      color: var(--disabled-color);
    }

    .im-input-number-field {
      cursor: not-allowed;
    }
  }
`;

export default StyledInput;
