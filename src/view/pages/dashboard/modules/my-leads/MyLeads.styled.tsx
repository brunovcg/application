import styled from 'styled-components';

const StyledTakeOffLists = styled.div`
  .im-my-leads-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .im-my-leads-feedback-wrapper {
    margin-top: 20px;
  }

  .im-my-leads-table {
    margin-top: 20px;
  }

  .im-current-county-state-selection {
    padding: 20px;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    min-height: 60px;

    .im-current-state-selection {
      color: var(--typeface-medium-color);
      font-family: var(--typeface-monospace);
    }

    .im-current-county-selection-none {
      color: var(--error-color);
    }
  }
`;

export default StyledTakeOffLists;
