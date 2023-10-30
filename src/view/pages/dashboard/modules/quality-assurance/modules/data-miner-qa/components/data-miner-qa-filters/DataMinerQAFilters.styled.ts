import styled from 'styled-components';

const StyledDataMinerQAFilters = styled.div`
  .im-data-miner-qa-filters {
    display: flex;
    flex-direction: column;
    gap: 40px;

    .im-data-miner-qa-filters-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .im-data-miner-qa-assessed-menu {
      display: flex;
      flex-direction: column;
      gap: 5x;

      .im-data-miner-qa-assessed-content {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;

        .im-data-miner-qa-assessed-counter {
          border: 1px solid var(--border-color);
          height: 42px;
          border-radius: var(--container-border-radius);
          padding: 5px 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 150px;

          .im-data-miner-qa-assessed-data {
            font-size: 13px;
            color: var(--typeface-light-color);
            font-weight: bold;
            display: flex;
            gap: 4px;
          }
        }
      }
    }
  }
`;

export default StyledDataMinerQAFilters;
