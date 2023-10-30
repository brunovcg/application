import styled from 'styled-components';
import { StyledAddRemoveListProps } from './AddRemoveList.types';

const StyledAddRemoveList = styled.div<StyledAddRemoveListProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: ${(props) => props.width ?? '100%'};
  max-width: 100%;
  height: 100%;
  .im-add-remove-list-container {
    width: 50%;
    max-width: 440px;
    flex: 1;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    .im-add-remove-list-title {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .im-list-count {
        font-size: 13px;
        font-weight: bold;
        color: var(--primary-color);
      }
    }

    .im-list-filters {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .im-options-list {
      height: 400px;
      overflow-y: auto;
      padding: 5px;
      display: flex;
      flex-direction: column;
      gap: 2px;

      .im-add-remove-list-option {
        padding: 5px;
        display: flex;
        justify-content: space-between;
        white-space: nowrap;
        font-size: 13px;

        &.im-disabled {
          cursor: not-allowed;

          .im-add-remove-list-option-name {
            color: var(--disabled-color);
          }
        }

        .im-add-remove-list-option-suffix {
          font-size: 12px;
        }

        .im-add-remove-hover-suffix {
          font-size: 12px;
          height: 100%;
          display: flex;
          align-items: flex-end;
        }

        &:hover:not(.im-disabled) {
          color: var(--typeface-white-color);
          text-shadow: var(--white-text-shadow);
          border-radius: var(--container-border-radius);
          cursor: pointer;

          .im-add-remove-list-option-suffix {
            visibility: hidden;
          }
        }
      }

      .im-add-remove-list-option.im-add {
        .im-add-remove-list-option-added {
          color: var(--valid-color);
          text-shadow: var(--valid-text-shadow);
        }

        &:hover:not(.im-disabled) {
          background-color: var(--error-color);
          text-shadow: var(--white-text-shadow);
          .im-add-remove-list-option-added {
            color: var(--typeface-white-color);
            text-shadow: var(--white-text-shadow);
          }
        }
      }
      .im-add-remove-list-option.im-remove {
        .im-add-remove-list-option-removed {
          color: var(--error-color);
          text-shadow: var(--error-text-shadow);
        }
        &:hover:not(.im-disabled) {
          background-color: var(--valid-color);
          text-shadow: var(--white-text-shadow);
          .im-add-remove-list-option-removed {
            color: var(--typeface-white-color);
            text-shadow: var(--white-text-shadow);
          }
        }
      }
    }
  }
`;

export default StyledAddRemoveList;
