import styled from 'styled-components';

const StyledUpdateVerificationStatusMinerSubmissionDialog = styled.div`
  width: 100%;

  .im-dialog-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: var(--typeface-medium-color);
    font-size: 14px;
    line-height: 1.3;

    .im-caption {
      font-weight: bold;
    }

    .im-dialog-changes {
      display: flex;
      gap: 10px;
      align-items: center;
      .im-dialog-row-status-current {
        color: var(--error-color);
      }

      .im-dialog-row-status-new {
        color: var(--valid-color);
      }

      .im-dialog-row-status-current,
      .im-dialog-row-status-new {
        font-weight: bold;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 5px;
        line-height: 0;
      }
    }

    .im-dialog-text-area {
      margin-top: 20px;
    }
  }
`;

export default StyledUpdateVerificationStatusMinerSubmissionDialog;
