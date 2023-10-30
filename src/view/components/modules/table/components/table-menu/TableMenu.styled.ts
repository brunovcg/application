import styled from 'styled-components';

export const StyledTableMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  padding-bottom: 15px;
  flex-wrap: wrap;

  .im-table-custom-header {
    display: flex;
  }

  .im-table-download-files {
    display: flex;
    justify-content: flex-end;
  }
  .im-csv-download {
    text-decoration: none;
    color: var(--text-color);
  }

  .im-csv-download,
  button {
    font-size: 14px;
  }
`;

export const StyledTableMenuSelection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
