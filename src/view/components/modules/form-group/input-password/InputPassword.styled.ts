import styled, { css } from 'styled-components';
import { StyledInputProps } from './InputPassword.types';

const StyledInput = styled.div<StyledInputProps>`
  width: ${(props) => props.width ?? '100%'};
  max-width: ${(props) => props.maxWidth ?? '100%'};

  ${(props) =>
    props.flex &&
    css`
      flex: ${'1 1 ' + props.flex};
    `}

  &.im-valid {
    .im-input-password-body {
      .im-input-password-field {
        color: var(--valid-color);
      }
    }
  }

  .im-input-password-body {
    display: flex;
    width: 100%;
  }

  .im-input-password-body {
    align-items: center;
    height: 42px;
    display: flex;

    .im-input-password-field {
      height: 100%;
      font-size: 14px;
      border: none;
      width: 100%;
      padding-left: 10px;
      background: var(--transparent);

      :read-only {
        cursor: not-allowed;
        color: var(--typeface-light-color);
      }

      ::placeholder {
        color: var(--placeholder-color);
        font-size: var(--placeholder-size);
      }
    }
  }

  .im-disabled {
    .im-input-password-remaining-characters,
    .im-input-password-field::placeholder {
      color: var(--disabled-color);
      font-size: var(--placeholder-size);
    }

    .im-input-password-field {
      cursor: not-allowed;
    }
  }
`;

export default StyledInput;
