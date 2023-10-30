import styled, { css } from 'styled-components';
import { StyledSearchMenuProps } from './SearchMenu.types';

const StyledSearchMenu = styled.div<StyledSearchMenuProps>`
  max-width: ${(props) => props.maxWidth};
  width: ${(props) => props.width};
  max-width: 100%;
  .im-container {
    display: flex;
    width: 100%;
    height: 40px;

    ${(props) =>
      props.disabled &&
      css`
        cursor: not-allowed;
        input {
          cursor: not-allowed;
          color: var(--disabled-color);
          ::placeholder {
            color: var(--disabled-color);
          }
        }
      `}

    input {
      flex: 1;
      border: none;
      background-color: var(--transparent-color);
      height: 100%;
      padding-left: 10px;
      font-size: 14px;
    }

    .im-search-menu-options {
      width: ${(props) => `${props.displayWidth}px`};
      display: flex;
      overflow: auto;
      padding: 10px;
      border: 1px solid var(--border-color);
      border-radius: var(--container-border-radius);
      z-index: ${(props) => props.zIndex};
      background-color: var(--container-white-color);
      box-shadow: var(--container-box-shadow);
      height: ${(props) => props.optionsHeight};
      max-height: ${(props) => props.optionsMaxHeight};

      .im-search-menu-options-content {
        display: flex;
        flex-direction: column;
        gap: 14px;
        width: 100%;

        .im-search-menu-option {
          cursor: pointer;
          padding: 5px;
          font-size: 14px;
          line-height: 1.1;
          color: var(--typeface-dark-color);
          &:hover {
            background-color: var(--container-hover-color);
            border-radius: var(--container-border-radius);
          }
        }
      }
    }
  }
`;

export default StyledSearchMenu;
