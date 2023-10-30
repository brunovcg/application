import styled from 'styled-components';

const StyledAddressLookup = styled.div`
  .im-address-lookup-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 17px;
  }

  .im-address-lookup-feedback-wrapper {
    margin-top: 20px;
  }

  .im-current-county-state-section {
    margin-bottom: 20px;

    .im-current-county-state-section-content {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;

      .im-state-wrapper {
        display: flex;
        align-items: center;
        gap: 3px;
      }
    }

    .im-current-state-selection {
      color: var(--typeface-medium-color);
      font-family: var(--typeface-monospace);
      font-size: 18px;
    }

    .im-current-county-selection {
      color: var(--primary-color);
    }

    .im-current-county-selection-none {
      color: var(--error-color);
    }
  }
`;

export default StyledAddressLookup;
