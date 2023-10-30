import styled, { css } from 'styled-components';
import { StyledSelectorProps, StyledListProps, StyledDisplayProps } from './Selector.types';
import Constants from '../../../../../utils/constants/Constants';

const { COLORS } = Constants;

export const StyledSelector = styled.div<StyledSelectorProps>`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth ?? '100%'};

  .im-selector-equalizer {
    margin-top: 5px;
  }

  .im-selector-container {
    height: ${(props) => props.height ?? '42px'};
    cursor: pointer;
  }
`;

export const StyledDisplay = styled.div<StyledDisplayProps>`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px 10px;
  width: 100%;
  height: 100%;

  &.im-disabled {
    cursor: not-allowed;

    .im-selector-placeholder {
      color: var(--disabled-color);
    }
  }

  .im-selector-placeholder {
    color: var(--placeholder-color);
    font-size: var(--placeholder-size);
  }

  .im-selector-display-value {
    flex: 1;
    display: flex;
    gap: 10px;
    align-items: center;
    overflow: hidden;
    justify-content: space-between;

    .im-selector-multiple-value-data {
      font-size: 13px;
      font-weight: bold;
      color: ${(props) => COLORS[props.variant ?? 'primary']};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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

export const StyledList = styled.div<StyledListProps>`
  .im-selector-option-list-container {
    z-index: ${(props) => props.zIndex};
    background-color: var(--container-medium-color);
    width: ${(props) => `${props.listWidth}px`};
    padding: 5px;
    border: 1px solid var(--border-color);
    border-radius: var(--container-border-radius);
    height: ${(props) => `${props.listHeight}px`};
    max-height: ${(props) => (props.listMaxHeight ? `${props.listMaxHeight}px` : '300px')};
    display: flex;
    flex-direction: column;
    gap: 10px;

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

      .im-selector-option {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 5px;
        font-size: 13px;
        color: var(--typeface-medium-color);
        user-select: none;
        border: 1px solid var(--transparent);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        min-height: 25px;

        &.im-disabled {
          cursor: not-allowed;
          color: var(--disabled-color);

          &:hover {
            background-color: var(--transparent);
          }
        }

        ${(props) =>
          !props.selectedBorder &&
          css`
            display: inline;
            height: 30px;
            border-bottom: 1px solid var(--border-light-color);
          `}

        &.im-selected {
          color: var(--primary-color);
          text-shadow: var(--primary-text-shadow);
          border: ${(props) => props.selectedBorder && '1px solid var(--primary-color)'};
          border-radius: var(--container-border-radius);
        }

        &:hover {
          background-color: var(--container-medium-color);
          border-radius: var(--container-border-radius);
        }
      }

      ${(props) =>
        props.optionsInRow &&
        css`
          gap: 5px;
          flex-direction: row;
          flex-wrap: wrap;
          .im-selector-option {
            font-family: var(--typeface-monospace);
            font-size: 14px;
            width: 30px;
            justify-content: center;
            padding: 5px;
          }
        `}
    }
  }
`;

export const StyledFilter = styled.div`
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .im-selector-checkboxes {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
