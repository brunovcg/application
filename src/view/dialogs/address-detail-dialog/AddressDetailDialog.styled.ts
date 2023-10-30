import styled from 'styled-components';

export const StyledAddressDetailDialog = styled.div`
  width: 100%;

  .im-address-detail-dialog-container {
    padding: 20px;
    max-height: 500px;
    overflow-y: auto;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    gap: 30px 20px;

    .im-fields-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px 10px;
    }

    .row {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: space-between;
    }

    .im-motivations {
      color: var(--primary-color);
      display: flex;
      gap: 10px;
    }
    .im-no-motivations,
    .im-no-text {
      color: var(--error-color);
    }
  }
`;
