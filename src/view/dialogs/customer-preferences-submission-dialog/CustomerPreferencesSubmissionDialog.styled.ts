import styled from 'styled-components';

const StyledCustomerPreferencesSubmissionDialog = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .im-customer-preferences-dialog-content {
    padding: 20px;
    height: 100%;
    max-height: 420px;
    min-height: 250px;
    display: flex;
    width: 100%;
    overflow-x: auto;
    margin-bottom: 10px;
    min-width: 100%;
    .im-loading {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 15px;

      .im-loading-message {
        font-size: 20px;
        font-weight: bold;
        color: var(--typeface-medium-color);
      }
    }

    .im-changes-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      min-height: 300px;
    }

    .im-no-changes,
    .im-applied-changes {
      width: 100%;
      display: flex;
      gap: 40px;
      flex-direction: column;
      align-items: center;
    }

    .im-change-section {
      min-width: max-content;
      flex: 1;
      margin-top: 20px;

      .im-change-title {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: bold;
        color: var(--typeface-medium-color);
        display: flex;
        gap: 10px;
      }

      .im-change-content {
        width: 100%;
        min-width: max-content;
        border: 1px solid var(--border-color);
        padding: 10px;
        display: flex;
        flex-direction: column;
        border-radius: var(--container-border-radius);
        overflow-x: auto;
        gap: 15px;

        .im-grid-name {
          font-size: 12px;
          font-weight: bold;
        }

        .im-change-group {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 0 5px;
          font-size: 12px;
          .im-icon {
            font-size: 13px;
          }

          &:hover {
            background-color: var(--container-medium-color);
          }

          .im-label {
            font-weight: bold;
          }
          .im-change-comparison {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: bold;
            font-size: 12px;
            color: var(--typeface-light-color);
            .im-initial-value {
              color: var(--error-color);
              font-size: 12px;
            }

            .im-updated-value {
              color: var(--valid-color);
              font-size: 12px;
            }

            .im-unchanged-value {
              color: var(--typeface-medium-color);
              font-size: 12px;
            }
          }
        }
      }
    }
  }
`;

export default StyledCustomerPreferencesSubmissionDialog;
