import styled, { css } from 'styled-components';
import { StyledTextAreaProps } from './TextArea.types';

const StyledTextArea = styled.div<StyledTextAreaProps>`
  width: ${(props) => props.width ?? '100%'};
  max-width: ${(props) => props.maxWidth ?? '100%'};

  .im-textarea-header,
  .im-textarea-body,
  .im-textarea-footer {
    display: flex;
    width: 100%;
  }

  .im-textarea-header,
  .im-textarea-footer {
    padding: 0 15px;
  }

  .im-textarea-header {
    height: 25px;
    width: 100%;
    justify-content: end;
    margin-bottom: 5px;

    .im-textarea-remaining-characters {
      display: flex;
      align-items: flex-end;
    }
  }

  .im-textarea-body {
    align-items: center;
    display: flex;
    padding-top: 10px;
    position: relative;
    background-color: var(--container-white-color);

    .im-text-area-buttons {
      margin-top: 5px;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .im-textarea-field {
      height: 100%;
      font-size: 14px;
      border: none;
      min-height: 58px;
      height: ${(props) => (props.height ? css`calc(${props.height} - 12px)` : '58px')};
      flex-grow: 1;
      flex-shrink: 1;
      padding: 0 30px 0 10px;
      background: var(--transparent);

      ::placeholder {
        color: var(--placeholder-color);
        font-size: var(--placeholder-size);
      }
    }
  }

  .im-textarea-footer {
    flex-direction: column;
    gap: 5px;
    margin-top: 5px;
    height: 25px;
  }

  .im-disabled {
    .im-textarea-remaining-characters,
    .im-textarea-field::placeholder,
    .im-textarea-info {
      color: var(--disabled-color);
      font-size: var(--placeholder-size);
    }

    .im-textarea-field {
      cursor: not-allowed;
    }
  }
`;

export default StyledTextArea;
