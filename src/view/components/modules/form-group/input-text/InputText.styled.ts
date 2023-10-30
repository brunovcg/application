import styled from 'styled-components';
import { StyledInputTextProps } from './InputText.types';

const StyledInput = styled.div<StyledInputTextProps>`
  width: ${(props) => props.width ?? '100%'};
  max-width: ${(props) => props.maxWidth ?? '100%'};

  &.im-valid {
    .im-input-text-body {
      .im-input-text-field {
        color: var(--valid-color);
      }
    }
  }

  .im-input-text-header,
  .im-input-text-body {
    display: flex;
    width: 100%;
  }

  .im-input-text-header {
    height: 25px;
    width: 100%;
    justify-content: end;
    margin-bottom: 5px;
    padding: 0 15px;

    .im-input-text-remaining-characters {
      display: flex;
      align-items: flex-end;
    }
  }

  .im-input-text-body {
    align-items: center;
    height: ${(props) => props.height ?? '42px'};
    display: flex;

    .im-input-text-field {
      height: 100%;
      font-size: 14px;
      border: none;
      width: 100%;
      padding-left: 10px;
      background: var(--transparent);

      ::placeholder {
        color: var(--placeholder-color);
        font-size: var(--placeholder-size);
      }
    }

    .im-input-text-search {
      width: 35px;
    }
  }

  .im-disabled {
    .im-input-text-remaining-characters,
    .im-input-text-field::placeholder {
      color: var(--disabled-color);
    }

    .im-input-text-field {
      cursor: not-allowed;
    }
  }
`;

export default StyledInput;
