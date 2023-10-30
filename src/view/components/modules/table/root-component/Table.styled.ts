import styled, { css } from 'styled-components';
import { StyledTableTypes, StyledColumnHeaderTypes, StyledColumnDataTypes } from './Table.types';
import { DOMHelper } from '../../../../../utils/helpers';

const zIndex = DOMHelper.windowNextZIndex();

export const StyledTable = styled.div<StyledTableTypes>`
  width: ${(props) => props.tableWidth ?? '100%'};
  max-width: ${(props) => props.tableMaxWidth};

  .im-table-info {
    color: var(--primary-color);
    font-size: 13px;
    padding-left: 5px;
    padding-bottom: 3px;
    min-height: 14px;
    display: flex;
    justify-content: flex-start;
  }

  .im-table-wrapper {
    width: 100%;
    height: ${(props) => props.tableHeight};
    overflow-x: auto;
    /* transform:rotateX(180deg); */
    border: 1px solid var(--table-border-color);
    border-radius: var(--container-border-radius);
  }

  table {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    /* transform:rotateX(180deg); */
    /* table-layout: ${(props) => (!props.manualWidth ? 'auto' : 'fixed')}; */
    table-layout: fixed;
  }

  table thead {
    ${(props) =>
      props.stickHeader &&
      css`
        z-index: ${zIndex};
        position: sticky;
        top: 0;
      `}
  }

  table td,
  table th {
    border: 2px solid var(--table-border-color);
    padding: 5px 8px;
    vertical-align: middle;
    color: var(--typeface-medium-color);
  }

  table th {
    border-top: none;
  }

  table tbody tr td {
    font-size: 12px;
    ${(props) =>
      css`
        ${props.rowStyles?.row}
      `}
  }

  table tr:nth-child(even) td {
    background: var(--table-even-color);
    ${(props) =>
      css`
        ${props.rowStyles?.even}
      `}
  }

  table tr:nth-child(odd) td {
    background: var(--table-odd-color);
    ${(props) =>
      css`
        ${props.rowStyles?.odd}
      `}
  }

  table tr:hover td {
    background: var(--table-hover-background-color);
    color: var(--table-hover-color);
    text-shadow: var(--white-text-shadow);
    ${(props) =>
      css`
        ${props.rowStyles?.hover}
      `}
    cursor: ${(props) => props.clickableRow && 'pointer'};
  }

  table tr td.im-table-sticky-column {
    border-right-width: 6px;
    border-right-color: var(--table-sticky-border-color);
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    overflow: hidden;
    vertical-align: middle;
    background-color: var(--table-header-color);
    ${(props) =>
      css`
        ${props.headerStyles}
      `}
  }

  table tr th {
    position: relative;
    height: 60px;
    display: table-cell;
  }

  table tr th.im-table-sticky-column {
    border-right-width: 6px;
    border-right-color: var(--table-sticky-border-color);
  }

  .im-table-th {
    .im-table-th-container {
      display: flex;
      align-items: center;
      justify-content: center;

      .im-table-th-title {
        font-size: 12px;
      }

      .im-table-sort-button {
        cursor: pointer;
        position: relative;

        .im-notification-bubble {
          margin-right: -10px;
          margin-top: -8px;
        }
      }
    }
  }

  .im-table-no-data {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    border: 2px solid var(--border-light-color);
    font-size: 20px;
    font-weight: bold;
    color: var(--error-color);
    border-radius: var(--container-border-radius);
  }

  .im-table-loading {
    border: 2px solid var(--border-light-color);
    border-radius: var(--container-border-radius);
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .im-table-no-data,
  .im-table-loading {
    height: 240px;
  }
`;

export const StyledColumnHeader = styled.th<StyledColumnHeaderTypes>`
  width: ${(props) => props.width ?? `${props.width}px`};
  .im-table-th-container {
  }
`;

export const StyledColumnData = styled.td<StyledColumnDataTypes>`
  width: ${(props) => props.width ?? `${props.width}px`};
  text-align: ${(props) => props.alignment};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
