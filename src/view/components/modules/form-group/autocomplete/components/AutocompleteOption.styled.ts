import styled from 'styled-components';

export const StyledAutocompleteOption = styled.div`
  color: var(--typeface-medium-color);
  padding: 0 5px;
  height: 30px;
  border-bottom: 1px solid var(--border-light-color);
  display: flex;
  align-items: center;
  width: 100%;

  .im-autocomplete-option-text {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }

  &:hover {
    background-color: var(--container-medium-color);
    border-radius: var(--container-border-radius);
    cursor: pointer;
  }

  &.im-selected {
    color: var(--primary-color);
    text-shadow: var(--primary-text-shadow);
  }
`;
