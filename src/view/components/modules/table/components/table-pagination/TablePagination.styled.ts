import styled from 'styled-components';

const StyledTablePagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 5px;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  color: var(--typeface-light-color);
  font-style: italic;

  .im-table-pagination-total {
    font-size: 13px;
  }

  .im-table-pagination-pages,
  .im-table-pagination-size {
    font-size: 13px;
  }

  .im-table-pagination-buttons {
    display: flex;
    gap: 5px;

    .im-button {
      padding: 0;
    }
  }
`;

export default StyledTablePagination;
