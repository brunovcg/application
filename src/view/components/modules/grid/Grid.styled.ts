import styled, { css } from 'styled-components';
import { StyledGridHeadProps, StyledGripProps, StyledGridCellProps, Alignment } from './Grid.types';

const handleCellTemplateAlignment = (alignment?: Alignment) => {
  const alignments = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };

  return alignments[(alignment as keyof typeof alignments) ?? 'center'];
};

export const StyledGrid = styled.div<StyledGripProps>`
  width: ${(props) => props.width ?? '100%'};
  max-width: ${(props) => props.maxWidth ?? '100%'};
  max-height: ${(props) => props.maxHeight ?? '100%'};
  height: ${(props) => props.height ?? '100%'};
  overflow: auto;
  border-collapse: collapse;

  ${(props) =>
    props.loading
      ? css`
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 20px;
        `
      : null}

  table {
    width: 100%;
    border-collapse: collapse;

    tr:hover td {
      background: var(--table-hover-background-color);
      color: var(--table-hover-color);
      text-shadow: var(--white-text-shadow);
    }
  }
  thead {
    position: sticky;
    top: 0;
    z-index: ${(props) => props.zIndex ?? 'auto'};
    tr {
      background-color: var(--table-header-color);
    }
  }

  tbody {
    tr {
      height: ${(props) => props.rowHeight};
    }
  }

  .im-grid-search {
    padding: 10px 0;
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: flex-end;
  }

  .im-grid-no-data {
    color: var(--error-color);
    font-size: 24px;
    height: 60%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledHead = styled.th<StyledGridHeadProps>`
  padding: 10px;
  color: var(--typeface-medium-color);
  text-align: ${(props) => props.headerAlignment};
  font-size: 13px;
  vertical-align: middle;
`;

export const StyledCell = styled.td<StyledGridCellProps>`
  border-bottom: 1px solid var(--border-light-color);
  padding: 5px 3px;
  font-size: 12px;
  color: var(--typeface-medium-color);
  text-align: ${(props) => props.cellAlignment};
  vertical-align: middle;
  :hover {
    cursor: ${(props) => props?.clickable && 'pointer'};
  }

  .im-grid-cell-template {
    display: flex;
    justify-content: ${(props) => handleCellTemplateAlignment(props.cellAlignment)};
    height: 100%;
  }
`;
