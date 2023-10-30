import styled from 'styled-components';
import { StyledInputFileProps } from './InputFile.types';

const StyledInputFile = styled.div<StyledInputFileProps>`
  width: ${(props) => props.width ?? '100%'};
  min-width: 200px;
  max-width: ${(props) => props.maxWidth ?? '100%'};
  .im-input-file-wrapper {
    width: 100%;
    min-height: 42px;
    display: flex;
    align-items: stretch;
    padding: 10px;
    gap: 10px;

    .im-input-file-label {
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
      }
    }

    .im-input-file {
      display: none;
    }

    .im-input-file-files {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      flex: 1;

      .im-tooltip {
        display: flex;
        align-items: center;
      }

      .im-input-file-chip {
        display: flex;
        gap: 5px;
        max-width: 140px;

        .im-input-file-chip-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .im-input-file-chip-size {
          width: fit-content;
        }
      }

      .im-input-file-placeholder {
        font-size: var(--placeholder-size);
        color: var(--typeface-medium-color);
        user-select: none;
        display: flex;
        align-items: center;
      }
    }

    .im-input-file-clear {
      height: 28px;
      width: 28px;
      position: relative;

      .im-button-icon {
        position: absolute;
        top: 0;
      }
    }
  }
`;

export default StyledInputFile;
