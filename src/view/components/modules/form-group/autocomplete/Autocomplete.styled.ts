import styled from 'styled-components';
import { StyledAutocompleteListProps, StyledAutocompleteProps } from './Autocomplete.types';

export const StyledAutocomplete = styled.div<StyledAutocompleteProps>`
  height: 100%;
  width: ${(props) => props.width ?? '100%'};
  max-width: ${(props) => props.maxWidth ?? '100%'};

  &.im-disabled {
    .im-autocomplete-display {
      .im-autocomplete-input {
        cursor: not-allowed;
        background-color: var(--container-white-color);
        color: var(--disabled-color);
        ::placeholder {
          color: var(--disabled-color);
        }
      }
    }
  }

  .im-autocomplete-display {
    display: flex;
    height: 42px;
    padding: 5px;
    width: 100%;
    max-width: 100%;

    .im-autocomplete-input {
      border: none;
      height: 100%;
      flex-grow: 1;
      padding-left: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      ::placeholder {
        font-size: var(--placeholder-size);
        color: var(--placeholder-color);
      }
    }

    .im-autocomplete-buttons {
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &.im-search-selected {
    .im-autocomplete-display {
      .im-autocomplete-input {
        color: var(--primary-color);
        text-shadow: var(--primary-text-shadow);
      }
    }
  }
`;

export const StyledAutocompleteList = styled.div<StyledAutocompleteListProps>`
  border: 1px solid var(--border-color);
  border-radius: var(--container-border-radius);
  padding: 5px;
  background-color: var(--container-medium-color);
  z-index: ${(props) => props.zIndex};
  width: ${(props) => `${props.displayWidth}px`};
  max-height: 500px;
  display: flex;

  .im-autocomplete-list-content {
    background-color: var(--container-white-color);
    border: 1px solid var(--border-color);
    border-radius: var(--container-border-radius);
    padding: 5px;
    overflow: auto;
    flex: 1;
  }
`;
