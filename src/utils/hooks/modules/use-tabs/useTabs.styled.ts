import styled from 'styled-components';
import { StyledTabContainerRendererProps } from './useTabs.types';

export const StyledTabsRenderer = styled.nav`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  width: fit-content;
  max-width: 100%;
  padding: 0 5px;
  overflow-x: auto;
  gap: 20px;

  .im-tabs-renderer-container {
    display: flex;
  }

  .im-tabs-module-option {
    display: flex;
    align-items: end;
    font-weight: bold;
    font-size: 13px;
    color: var(--typeface-light-color);
    padding-bottom: 10px;
    margin: 0 10px;
    cursor: pointer;
    border-bottom: 1px solid var(--transparent);
    user-select: none;

    &:hover:not(.im-selected) {
      color: var(--typeface-medium-color);
      border-bottom: 1px solid var(--typeface-medium-color);
    }

    &.im-selected {
      border-bottom: 2px solid var(--primary-color);
      color: var(--primary-color);
    }
  }
`;

export const StyledTabContainerRenderer = styled.div<StyledTabContainerRendererProps>`
  width: ${(props) => props.width ?? '100%'};
  height: ${(props) => props.height};
`;
