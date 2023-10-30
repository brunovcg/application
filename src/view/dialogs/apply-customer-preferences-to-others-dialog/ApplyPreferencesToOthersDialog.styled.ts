import styled from 'styled-components';

const StyledApplyPreferencesToOthersDialog = styled.div`
  overflow-y: auto;
  max-height: 50vh;
  width: 100%;
  .im-apply-county-preferences-to-others-content {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .im-counties-to-update {
    padding: 15px;
    min-height: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    .im-none-to-update {
      color: var(--error-color);
    }
  }
`;

export default StyledApplyPreferencesToOthersDialog;
