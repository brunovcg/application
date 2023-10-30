import styled, { css } from 'styled-components';
import { StyledSelectorCustomersProps, StyledCustomerListProps, StyledOptionRendererProps } from './SelectorCustomer.types';

export const StyledSelectorCustomer = styled.div<StyledSelectorCustomersProps>`
  width: ${(props) => props.width ?? '250px'};
  max-width: ${(props) => props.maxWidth ?? '100%'};
  height: 42px;
  display: ${(props) => (props.show ? 'inline-table' : 'none')};

  .im-selector-equalizer {
    margin-top: 5px;
  }

  .im-selector-customer-container {
    height: 42px;
    cursor: pointer;
  }
`;

export const StyledCustomerDisplay = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px 10px;
  width: 100%;
  height: 100%;

  .im-selector-customer-placeholder {
    color: var(--placeholder-color);
    font-size: var(--placeholder-size);
  }

  .im-selector-customer-display-value {
    flex: 1;
    display: flex;
    gap: 10px;
    align-items: center;
    overflow: hidden;
    justify-content: space-between;

    .im-selector-multiple-value-data {
      flex: 1;
      width: 40px;
    }

    .im-selector-multiple-value-extra-count {
      font-size: 14px;
      color: var(--primary-color);
      width: 30px;
      display: flex;
      justify-content: flex-end;
    }
  }

  .im-selector-display-icons {
    display: flex;
    align-items: center;
    .im-selector-icon {
      color: var(--typeface-medium-color);
    }
  }
`;

export const StyledOptionRenderer = styled.div<StyledOptionRendererProps>`
  max-width: 100%;
  .im-select-customer-option-renderer-name {
    font-size: 13px;
    font-weight: bold;
    color: var(--typeface-medium-color);

    ${(props) =>
      props.selected &&
      css`
        color: var(--primary-color);
      `}
  }

  .im-select-customer-option-renderer-username {
    font-size: 11px;
    color: var(--typeface-light-color);
  }

  .im-select-customer-option-renderer-name,
  .im-select-customer-option-renderer-username {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyledCustomerList = styled.div<StyledCustomerListProps>`
  .im-selector-option-list-container {
    z-index: ${(props) => props.zIndex};
    background-color: var(--container-medium-color);
    width: ${(props) => `${props.listWidth}px`};
    padding: 5px;
    border: 1px solid var(--border-color);
    border-radius: var(--container-border-radius);
    height: ${(props) => props.listHeight};
    max-height: ${(props) => (props.listMaxHeight ? props.listMaxHeight : '300px')};
    display: flex;
    flex-direction: column;
    gap: 5px;

    .im-selector-option-list {
      background-color: var(--container-white-color);
      width: 100%;
      border: 1px solid var(--border-color);
      border-radius: var(--container-border-radius);
      overflow-y: auto;
      padding: 5px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 5px 0 0 0;

      .im-selector-customer-option-container {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 5px;
        font-size: 13px;
        color: var(--typeface-medium-color);
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
        text-overflow: ellipsis;
        min-height: 40px;

        border-bottom: 1px solid var(--border-light-color);

        &:hover {
          background-color: var(--container-medium-color);
        }
      }
    }
  }
`;

export const StyledCustomerFilter = styled.div`
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
