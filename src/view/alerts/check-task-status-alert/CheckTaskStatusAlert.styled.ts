import styled from 'styled-components';

const StyledTaskStatusAlert = styled.div`
  .im-task-status-alert-success {
    display: flex;
    align-items: center;
    font-size: 13px;

    .im-task-status-alert-success-message {
      display: flex;
      gap: 5px;
      align-items: center;

      .im-task-status-alert-success-text {
        word-wrap: wrap;
      }
    }
  }
`;

export default StyledTaskStatusAlert;
